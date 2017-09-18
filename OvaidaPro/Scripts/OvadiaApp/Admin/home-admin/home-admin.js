OvadiaApp.controller('homeAdminCtrl', ['$scope', '$rootScope', 'ngDialog', 'appServices', 'UserAccount',
    '$state','$cookies',
    function ($scope, $rootScope, ngDialog, appServices, UserAccount, $state, $cookies) {
        $rootScope.admin_menu = 'תכנים שבועיים';
        $scope.admin_menuItems = [
            { name: 'עדכוני מערכת', state: 'admin.home', url: '/admin/home' },
            { name: 'זמני תפילות', state: 'admin.tfila', url: '/admin/tfila' },
            { name: 'עריכת אודות', state: 'admin.odot', url: '/admin/odot-admin' },
            { name: 'הפצת הודעות במייל', state: 'admin.sendmail', url: '/admin/sendmail' },
            { name: 'תכנים שבועיים', state: 'admin.lesson', url: '/admin/lesson' },
            { name: 'גלריית תמונות', state: 'admin.upload', url: '/admin/upload' },
            { name: 'ניהול קטגוריות', state: 'admin.categories', url: '/admin/categories' },
            { name: 'ניהול מאמרים\\סרטים', state: 'admin.home-movies', url: '/admin/home-movies' },
            { name: 'הודעות לציבור', state: 'admin.comment-info', url: '/admin/comment-info' },
            { name: 'ניהול המלצות', state: 'admin.home-recommen', url: '/admin/home-recommen' },
            { name: 'ניהול קרוסלה', state: 'admin.carusel', url: '/admin/carusel' },
            { name: 'ניהול תרומות', state: 'admin.donation-home', url: '/admin/donation-home' }
        ];

        $scope.plusIcon = true;

        var self = this;

        self.init = function () {
            var url = window.location.href.substr(window.location.host.length + 7, window.location.href.length);
            
            angular.forEach($scope.admin_menuItems, function (value, key) {
                if (value.url == url) {
                    $rootScope.admin_menu = value.name;
                }
            });
        }

        $rootScope.LogOut = function () {
            appServices.Logout().then(function (response) {
                if (response.data.ErrorCode == 0) {
                    UserAccount.Role = 'Guest';
                    UserAccount.User = null;
                    $cookies.remove('UserRole');
                    window.location.href = '/index';
                   // $state.go('index');
                }
            })
        }

        $scope.closePopup = function () {
            $('.ngdialog-closing').hide(400, function () {
                $(this).remove();
            })
            //$('.ngdialog').remove(200);
        }

        $scope.DestoryDialogs = function () {
            $('.ngdialog').remove(); 
        }
        $scope.openCloseAdminMenu = function () {
            if ($scope.plusIcon){
                $('.sidebar-right').removeClass('col-sm-4').addClass('marginbottom10');
                $('.homeadminRoute').removeClass('col-sm-8');
                $scope.plusIcon = false;
            }
            else {
                $('.sidebar-right').addClass('col-sm-4').removeClass('marginbottom10');
                $('.homeadminRoute').addClass('col-sm-8');

                $scope.plusIcon = true;
            }
            $('#adminMenu').slideToggle(500);
        }

        $scope.headerClick = function (name) {
            $rootScope.admin_menu = name;
            $scope.DestoryDialogs();
        }

        self.init();
    }]);

OvadiaApp.directive('homeAdmin', function () {
    return {
        restrict: 'E',
        bindToController: true,
        controller: 'homeAdminCtrl',
        templateUrl:'/Scripts/OvadiaApp/Admin/home-admin/home-admin.html'
    }
});