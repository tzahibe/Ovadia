OvadiaApp.controller('lessonAdminCtrl', ['$scope', 'appServices', 'ngDialog', '$timeout','$rootScope',
    function ($scope, appServices, ngDialog, $timeout, $rootScope) {
        $scope.events = []; $scope.fixedEvents = [], $scope.fixedEventsCal = [];
        $scope.currentFixedEvent = {};
        $scope.eventDetailsForm;
        var self = this;
        $scope.eventDetails;
        $scope.full_date;
        $scope.edit = false;
        $scope.loader = false;
        $scope.radio = 1;
        var day = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];
        $scope.minutes = $.map($(Array(60)), function (val, i) {
            if (i < 9) {
                return { value: "0" + (i), id: i };
            }
            else {
                return { value: i, id: i };
            }
        });
        $scope.hours = $.map($(Array(25)), function (val, i) {
            if (i < 9) {
                return { value: "0" + (i), id: i };
            }
            else {
                return { value: i, id: i };
            }
        });
        $scope.status = [{ value: "0", text: "מבוטל", id: 0 }, { value: "1", text: "פעיל", id: 1 }];
        $scope.days = [];
        $scope.curDay = [];

        $scope.initDays = function () {
            $scope.days[0] = { value: "ראשון" };
            $scope.days[1] = { value: "שני" };
            $scope.days[2] = { value: "שלישי" };
            $scope.days[3] = { value: "רביעי" };
            $scope.days[4] = { value: "חמישי" };
            $scope.days[5] = { value: "שישי" };
            $scope.days[6] = { value: "שבת" };
        }

        $scope.textToIndex = function (text) {
            for (var i = 0; i < $scope.days.length; i++) {

                if ($scope.days[i].value == text) {
                    return i;
                }
            }
        }

        $scope.OpenEditEvent = function () {
            currentDialog = ngDialog.open({
                template: 'Scripts/OvadiaApp/Admin/events-dialog/edit-event.html',
                scope: $scope
            })
        }

        $scope.OpenNewEvent = function () {
            currentDialog = ngDialog.open({
                template: 'Scripts/OvadiaApp/Admin/events-dialog/add-event.html',
                scope: $scope
            })
        }

        $scope.OpenSuccessPopup = function () {
            currentDialog = ngDialog.open({
                template: 'Scripts/OvadiaApp/Admin/events-dialog/success-message.html',
                scope: $scope
            });

            $timeout(function () {
                $scope.closePopup();
            }, 1000);
        }

        $scope.OpenErrorPopup = function () {
            currentDialog = ngDialog.open({
                template: 'Scripts/OvadiaApp/Admin/events-dialog/fail-message.html',
                scope: $scope
            });

            $timeout(function () {
                $scope.closePopup();
            }, 1000);
        }

        $scope.OpenNewFixedEvent = function () {
            $scope.currentFixedEvent = {};
            currentDialog = ngDialog.open({
                template: 'Scripts/OvadiaApp/Admin/events-dialog/add-fixed-event.html',
                scope: $scope
            })
        }

        $scope.OpenEditFixedEvent = function () {
            currentDialog = ngDialog.open({
                template: 'Scripts/OvadiaApp/Admin/events-dialog/update-fixed-event.html',
                scope: $scope
            });
        }

        $scope.closePopup = function () {
            ngDialog.close(currentDialog);
            $('.ngdialog-closing').hide(400, function () {
                $(this).remove();
            })
            //$('.ngdialog').remove(200);
        }

        self.init = function () {///
            $scope.initDays();

            $('#calendar').fullCalendar({
                locale: 'he',
                isRTL: false,
                firstDay: 0,
                eventClick: function (calEvent, jsEvent, view) {
                    if (calEvent.dow == null)
                        $scope.showEvent(calEvent.id, calEvent.dow);
                    else
                        $scope.showFixedEvent(calEvent.id);
                },
                dayClick: function (date, jsEvent, view) {
                    if ($('.choosenDay').length > 0)
                        $('.choosenDay').removeClass('choosenDay');
                    $scope.currentEvent = {};
                    $(this).addClass('choosenDay');
                    $scope.full_date = date.format('DD') + " " + date.format('MMMM') + " יום " + date.format('dddd');
                    $scope.currentEvent.Date = date.format('YYYY-MM-DD');
                    $scope.currentEvent.Full_Date = $scope.full_date;
                    $scope.fixed = 0;
                    $scope.OpenNewEvent();
                },
            });

            self.getAllFixedEvents();
            self.RenderEvents();
        }

        self.RenderEvents = function () {
            var i = 0;
            $scope.loader = true;
            appServices.getAllEvents().then(function (response) {
                $scope.events = response.data.Data;
                //console.log(response.data.Data);
                for (i = 0; i < $scope.events.length; i++) {
                    var event1 = {
                        id: $scope.events[i].ID,
                        title: $scope.events[i].Event_Name,
                        start: $scope.events[i].Date + 'T' + $scope.events[i].From_Hour + ':' + $scope.events[i].From_Minutes,
                        end: $scope.events[i].Date + 'T' + $scope.events[i].To_Hour + ':' + $scope.events[i].To_Minutes
                    };
                    $('#calendar').fullCalendar('renderEvent', event1, true);

                    $scope.loader = false;
                }
            },
                function (err) {
                    debugger;
                    console.log(err);
                }
            );
        }

        $scope.showEvent = function (id) {
            $scope.edit = false;
            for (var i = 0; i < $scope.events.length; i++) {
                if ($scope.events[i].ID == id) {
                    $scope.currentEvent = $scope.events[i];
                }
            }
            $scope.OpenEditEvent();
        }

        $scope.showFixedEvent = function (id) {
            $scope.edit = false;
            for (var i = 0; i < $scope.fixedEvents.length; i++) {
                if ($scope.fixedEvents[i].ID == id) {
                    $scope.currentFixedEvent = $scope.fixedEvents[i];
                    $scope.curDay = $scope.textToIndex($scope.currentFixedEvent.Date);
                }
            }
            $scope.OpenEditFixedEvent();
        }

        self.FormVadlidation = function () {
            if (eventDetailsForm != null)
                return eventDetailsForm.checkValidity();
            return false;
        }

        self.updateEventCalendar = function () {
            var eventO = {
                id: $scope.currentEvent.ID,
                title: $scope.currentEvent.Event_Name,
                start: $scope.currentEvent.Date + 'T' + $scope.currentEvent.From_Hour + ':' + $scope.currentEvent.From_Minutes,
                end: $scope.currentEvent.Date + 'T' + $scope.currentEvent.To_Hour + ':' + $scope.currentEvent.To_Minutes
            };
            $('#calendar').fullCalendar('removeEvents', eventO.id);
            $('#calendar').fullCalendar('renderEvent', eventO, true);
        }

        self.addFixedEventCalendar = function () {
            var eventO = {
                id: $scope.currentFixedEvent.ID,
                title: $scope.currentFixedEvent.Event_Name,
                start: $scope.currentFixedEvent.From_Hour + ':' + $scope.currentFixedEvent.From_Minutes, // a start time (10am in this example)
                end: $scope.currentFixedEvent.To_Hour + ':' + $scope.currentFixedEvent.To_Minutes, // an end time (2pm in this example)
                dow: [$scope.textToIndex($scope.currentFixedEvent.Date)],
                className: 'repeatClass'// Repeat monday and thursday
            };
            $('#calendar').fullCalendar('renderEvent', eventO, true);
        }

        self.updateFixedEventCalendar = function () {
            var eventO = {
                id: $scope.currentFixedEvent.ID,
                title: $scope.currentFixedEvent.Event_Name,
                start: $scope.currentFixedEvent.From_Hour + ':' + $scope.currentFixedEvent.From_Minutes, // a start time (10am in this example)
                end: $scope.currentFixedEvent.To_Hour + ':' + $scope.currentFixedEvent.To_Minutes, // an end time (2pm in this example)
                dow: [$scope.textToIndex($scope.currentFixedEvent.Date)],
                className: 'repeatClass'// Repeat monday and thursday
            };
            $('#calendar').fullCalendar('removeEvents', eventO.id);
            $('#calendar').fullCalendar('renderEvent', eventO, true);
        }

        self.addEventCalendar = function () {
            var eventO = {
                id: $scope.currentEvent.ID,
                title: $scope.currentEvent.Event_Name,
                start: $scope.currentEvent.Date + 'T' + $scope.currentEvent.From_Hour + ':' + $scope.currentEvent.From_Minutes,
                end: $scope.currentEvent.Date + 'T' + $scope.currentEvent.To_Hour + ':' + $scope.currentEvent.To_Minutes
            };
            $('#calendar').fullCalendar('renderEvent', eventO, true);
        }

        /* --Services -- */

        $scope.updateEvent = function () {
            if (!self.FormVadlidation()) {
                return;
            }
            $scope.loader = true;

            appServices.updateEvent($scope.currentEvent).then(function (response) {
                $scope.edit = false;

                if (response.data.ErrorCode == 0) {
                    $scope.currentEvent = response.data.Data;
                    $scope.events.splice({ ID: $scope.currentEvent.ID }, 1);
                    $scope.events.push($scope.currentEvent);
                    $scope.loader = false;
                    $scope.closePopup();
                    $scope.OpenSuccessPopup();
                }
                else if (data.ErrorCode == 5) {
                    $rootScope.LogOut();
                }
                else {
                    $scope.closePopup();
                    $scope.loader = false;
                    $scope.OpenErrorPopup();
                }

            });
        }

        $scope.deleteEvent = function (fixed) {
            var obj = fixed == 1 ? obj = $scope.currentFixedEvent : obj = $scope.currentEvent;
            $scope.loader = true;

            appServices.removeEvent(obj.ID).then(function (response) {
                if (response.data.ErrorCode == 0) {
                    $scope.loader = false;
                    if (fixed == 1) {
                        $('#calendar').fullCalendar('removeEvents', $scope.currentFixedEvent.ID);
                        $scope.fixedEvents.splice({ ID: $scope.currentFixedEvent.ID }, 1);
                    }
                    else {
                        $('#calendar').fullCalendar('removeEvents', $scope.currentEvent.ID);
                        $scope.events.splice({ ID: $scope.currentEvent.ID }, 1);
                    }
                    $scope.closePopup();
                    $scope.OpenSuccessPopup();
                }

                else {
                    $scope.closePopup();
                    $scope.OpenErrorPopup();
                    $scope.loader = false;
                }
            });
        }

        $scope.addEvent = function (fixed) {
            debugger;
            var obj = fixed == 1 ? obj = $scope.currentFixedEvent : obj = $scope.currentEvent;
            if (!self.FormVadlidation()) {
                return;
            }
            $scope.loader = true;

            appServices.addEvent(obj).then(function (response) {
                if (response.data.ErrorCode == 0) {
                    //console.log(response.data.Data);
                    if (fixed == 1) {
                        $scope.currentFixedEvent = response.data.Data;
                        $scope.fixedEvents.push($scope.currentFixedEvent);
                        self.addFixedEventCalendar();
                    }
                    else if (response.data.ErrorCode == 5) {
                        $rootScope.LogOut();
                    }
                    else {
                        $scope.currentEvent = response.data.Data;
                        self.addEventCalendar();
                        $scope.events.push($scope.currentEvent);
                    }

                    $scope.closePopup();
                    $scope.loader = false;
                    $scope.OpenSuccessPopup();
                }

                else {
                    $scope.closePopup();
                    $scope.loader = false;
                    $scope.OpenErrorPopup();
                }
            });
        }

        $scope.deleteFixedEvent = function () {
            $scope.deleteEvent(1);
        }

        $scope.addFixedEvent = function () {
            $scope.currentFixedEvent.fixed = 1;
            $scope.addEvent(1);
        }

        $scope.updateFixedEvent = function () {
            $scope.Fixed = 1;
            if (!self.FormVadlidation()) {
                return;
            }
            $scope.loader = true;
            appServices.updateEvent($scope.currentFixedEvent).then(function (response) {
                $scope.edit = false;

                if (response.data.ErrorCode == 0) {
                    $scope.loader = false;
                    self.updateFixedEventCalendar();
                    $scope.fixedEvents.splice({ ID: $scope.currentFixedEvent.ID }, 1);
                    $scope.fixedEvents.push($scope.currentFixedEvent);
                    $scope.closePopup();
                    $scope.OpenSuccessPopup();
                }
                else if (data.ErrorCode == 5) {
                    $rootScope.LogOut();
                }
                else {
                    $scope.closePopup();
                    $scope.loader = false;
                    $scope.OpenErrorPopup();
                }
            });
        }

        self.getAllFixedEvents = function () {
            var i = 0;
            $scope.loader = true;
            appServices.getAllFixedEvents().then(function (response) {
                if (response.data.ErrorCode == 0) {
                    if (response.data.Data.length == 0) {
                        $scope.loader = false;
                        return;
                    }
                    $scope.fixedEvents = response.data.Data;
                    for (var i = 0; i < $scope.fixedEvents.length; i++) {
                        // debugger;
                        var repeatEvent = {
                            id: $scope.fixedEvents[i].ID,
                            title: $scope.fixedEvents[i].Event_Name,
                            start: $scope.fixedEvents[i].From_Hour + ':' + $scope.fixedEvents[i].From_Minutes, // a start time (10am in this example)
                            end: $scope.fixedEvents[i].To_Hour + ':' + $scope.fixedEvents[i].To_Minutes, // an end time (2pm in this example)
                            dow: [$scope.textToIndex($scope.fixedEvents[i].Date)],
                            className: 'repeatClass'// Repeat monday and thursday
                        };
                        $scope.fixedEventsCal.push(repeatEvent);
                        
                    }
                    //$('#calendar').fullCalendar({
                    //    events: $scope.fixedEventsCal
                    //});
                    $('#calendar').fullCalendar('addEventSource', $scope.fixedEventsCal);
                    $scope.loader = false;
                }
            });
        }

        self.init();
    }]);

OvadiaApp.directive('lessonAdmin', function () {
    return {
        restrict: 'E',
        bindToController: true,
        controller: 'lessonAdminCtrl',
        templateUrl: '/Scripts/OvadiaApp/Admin/lesson-admin/lesson-admin.html'
    }
});