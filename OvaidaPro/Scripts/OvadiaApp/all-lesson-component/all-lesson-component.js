OvadiaApp.controller('allLessonComponentCtrl', ['$scope', 'appServices', 'ngDialog', '$timeout',
    "$rootScope",
    function ($scope, appServices, ngDialog, $timeout, $rootScope) {
        var self = this;
        $scope.events = {};
        $scope.fixedEvents = [];
        $scope.days = [];
        $scope.Tfilot = {};
        $scope.radio = 1;
        $scope.fixedEventsCal = [];
        $scope.status = [{ value: "0", text: "מבוטל", id: 0 }, { value: "1", text: "פעיל", id: 1 }];
        var daysToNumber = [];

        self.init = function () {
            daysToNumber["ראשון"] = 0;
            daysToNumber["שני"] = 1;
            daysToNumber["שלישי"] = 2;
            daysToNumber["רביעי"] = 3;
            daysToNumber["חמישי"] = 4;
            daysToNumber["שישי"] = 5;
            daysToNumber["שבת"] = 6;
            self.initCalendar();
            $scope.initDays();
            $scope.initTfilot();
            self.getAllFixedEvents();
            self.RenderEvents();
        }
        $scope.OpenEditFixedEvent = function () {
            currentDialog = ngDialog.open({
                template: 'Scripts/OvadiaApp/Admin/events-dialog/customer/show-fixed-events.html',
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

        $scope.OpenNewEvent = function () {
            currentDialog = ngDialog.open({
                template: 'Scripts/OvadiaApp/Admin/events-dialog/add-event.html',
                scope: $scope
            })
        }

        $scope.OpenNewFixedEvent = function () {
            $scope.currentFixedEvent = {};
            currentDialog = ngDialog.open({
                template: 'Scripts/OvadiaApp/Admin/events-dialog/add-fixed-event.html',
                scope: $scope
            })
        }

        $scope.showEvent = function (id) {
            $scope.edit = false;
            for (var i = 0; i < $scope.events.length; i++) {
                if ($scope.events[i].ID == id) {
                    $scope.currentEvent = $scope.events[i];
                }
            }
            $scope.OpenEvent();
        }

        $scope.textToIndex = function (text) {
            for (var i = 0; i < $scope.days.length; i++) {

                if ($scope.days[i].value == text) {
                    return i;
                }
            }
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

        self.getAllFixedEvents = function () {
            var i = 0;
            $scope.loader = true;
            appServices.GetActiveFixedEvents().then(function (response) {
                if (response.data.ErrorCode == 0) {
                    if (response.data.Data.length == 0) {
                        $scope.loader = false;
                        return;
                    }
                    $scope.fixedEvents = response.data.Data;
                    for (var i = 0; i < $scope.fixedEvents.length; i++) {
                        // debugger;
                        $scope.fixedEvents[i].dayNum = daysToNumber[$scope.fixedEvents[i].Date];
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

        self.RenderEvents = function () {
            var i = 0;
            $scope.loader = true;
            appServices.GetActiveEvents().then(function (response) {
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
                    console.log($scope.events);
                    $scope.loader = false;
                }
            },
                function (err) {
                    debugger;
                    console.log(err);
                }
            );
        }

        $scope.initDays = function () {
            $scope.days[0] = { value: "ראשון" };
            $scope.days[1] = { value: "שני" };
            $scope.days[2] = { value: "שלישי" };
            $scope.days[3] = { value: "רביעי" };
            $scope.days[4] = { value: "חמישי" };
            $scope.days[5] = { value: "שישי" };
            $scope.days[6] = { value: "שבת" };
        }

        $scope.OpenEvent = function () {
            currentDialog = ngDialog.open({
                template: 'Scripts/OvadiaApp/Admin/events-dialog/customer/show-event.html',
                scope: $scope
            })
        }

        self.initCalendar = function () {
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
                //dayClick: function (date, jsEvent, view) {
                //    if ($('.choosenDay').length > 0)
                //        $('.choosenDay').removeClass('choosenDay');
                //    $scope.currentEvent = {};
                //    $(this).addClass('choosenDay');
                //    $scope.full_date = date.format('DD') + " " + date.format('MMMM') + " יום " + date.format('dddd');
                //    $scope.currentEvent.Date = date.format('YYYY-MM-DD');
                //    $scope.currentEvent.Full_Date = $scope.full_date;
                //    $scope.fixed = 0;
                //    $scope.OpenNewEvent();
                //},
            });
        }

        $scope.initTfilot = function() {
            $scope.loader1 = true;
            appServices.getAllTfilot().then(function (response) {
                if (response.data.ErrorCode == 0) {
                    $scope.Tfilot.data = response.data.Data;
                    $scope.loader1 = false;
                    $scope.ErrorMsg = false;
                }
                else {
                    $scope.loader1 = false;
                    $scope.ErrorMsg = true;
                }
            });
        }

        self.init();
    }]);

OvadiaApp.directive('allLessonComponent', function () {
    return {
        restrict: 'E',
        bindToController: true,
        controller: 'allLessonComponentCtrl',
        templateUrl: '/Scripts/OvadiaApp/all-lesson-component/all-lesson-component.html'
    }
});