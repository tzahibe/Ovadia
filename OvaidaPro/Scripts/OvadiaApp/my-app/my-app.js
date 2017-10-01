OvadiaApp.controller('myAppCtrl', ['$scope', 'appServices', 'UserAccount','$rootScope','$interval',
    function ($scope, appServices, UserAccount, $rootScope, $interval) {
        var self = this;
        var currentDialog = null;
        $scope.currentEvent = null;
        $scope.isMobile = false;
        $scope.Comment = {};
        $scope.categoriesData = [];

        self.init = function () {
            $scope.isMobileDevice();
            $rootScope.GetComment();
            //$interval(function () {
            //    marquee($('#display'), $('#text'));  //Enter name of container element & marquee element
            //},1000);
        }

        $scope.DateToClient = function (date) {
            try {
                var temp = new Date(parseInt(date.split('/Date(')[1].split(')/')[0]));
                var nday, nmonth;
                var day = temp.getDate();
                var month = (temp.getMonth() * 1 + 1);
                var year = temp.getFullYear();
                nday = temp.getDate();
                nmonth = (temp.getMonth() * 1 + 1);

                if (day * 1 < 10) {
                    nday = '0' + day;
                }
                if (month * 1 < 10) {
                    nmonth = '0' + month;
                }

                return nday + '.' + nmonth + '.' + year;
            }
            catch (e) {
                return null;
            }
        };

        $scope.FullDateToClient = function (date) {
            try {
                var temp = new Date(parseInt(date.split('/Date(')[1].split(')/')[0]));
                return temp;
            }
            catch (e) {
                return null;
            }
        }

        $rootScope.GetComment = function () {
            appServices.GetComment().then(function (data) {
                if (data.ErrorCode == 0) {
                    $scope.Comment = data.Data;
                }
                else {
                    alert("error");
                }
                $scope.loaderSend = false;
            })
        }

        $scope.isMobileDevice = function () {
                if (navigator.userAgent.match(/Android/i)
                    || navigator.userAgent.match(/webOS/i)
                    || navigator.userAgent.match(/iPhone/i)
                    || navigator.userAgent.match(/iPod/i)
                    || navigator.userAgent.match(/BlackBerry/i)
                    || navigator.userAgent.match(/Windows Phone/i)
                ) {
                    $scope.isMobile = true;
                    return true;
                }
                else {
                    $scope.isMobile = false;
                    return false;
                }
            }

        $scope.DateToClient = function (date) {
            try {

                var temp = new Date(parseInt(date.split('/Date(')[1].split(')/')[0]));

                var nday, nmonth;
                var day = temp.getDate();
                var month = (temp.getMonth() * 1 + 1);
                var year = temp.getFullYear();
                nday = temp.getDate();
                nmonth = (temp.getMonth() * 1 + 1);

                if (day * 1 < 10) {
                    nday = '0' + day;
                }
                if (month * 1 < 10) {
                    nmonth = '0' + month;
                }

                return nday + '/' + nmonth + '/' + year;


            }
            catch (e) {
                return null;
            }
        }

        $(window).scroll(function () {
            if (!$scope.isMobile) {
                return;
            }

            if (window.scrollY > 10) {
                $('.logo1').hide(200); //.attr("style", "padding-top: 10px;")
                $('header-component .amburger');//.attr("style","padding-top:14px")
            }
            else {
                $('.logo1').show(200).attr("padding-top", "0");
                $('header-component .amburger');//.attr("style", "padding-top:0")
            }
            
        });

  

        self.init();
     
    }]);

OvadiaApp.directive('myApp', function () {
    return {
        restrict: 'E',
        bindToController: true,
        controller: 'myAppCtrl',
        templateUrl:'/Scripts/OvadiaApp/my-app/my-app.html'
    }
});


//function marquee(a, b) {
//    var width = b.width();
//    var start_pos = a.width();
//    var end_pos = -width;

//    function scroll() {
//        if (b.position().left <= -width) {
//            b.css('left', start_pos);
//            scroll();
//        }
//        else {
//            time = (parseInt(b.position().left, 10) - end_pos) *
//                (10000 / (start_pos - end_pos)); // Increase or decrease speed by changing value 10000
//            b.animate({
//                'left': -width
//            }, time, 'linear', function () {
//                scroll();
//            });
//        }
//    }

//    b.css({
//        'width': width,
//        'left': start_pos
//    });
//    scroll(a, b);

//    b.mouseenter(function () {     // Remove these lines
//        b.stop();                 //
//        b.clearQueue();           // if you don't want
//    });                           //
//    b.mouseleave(function () {     // marquee to pause
//        scroll(a, b);             //
//    });                           // on mouse over

//}
