OvadiaApp.controller('headerComponentCtrl', ['$scope','$rootScope',
    function ($scope, $rootScope) {
        var self = this;
        $rootScope.menu = 'ראשי';
        $scope.menuItems = [
            { name: 'ראשי', state: 'index', url:'/index' },
            { name: 'ניהול', state: 'admin.lesson', url:'/admin/lesson' },
            { name: 'אודות', state: 'profile',  url: '/profile' },
            { name: 'מפת הגעה', state: 'map', url: '/map' },
            { name: 'גלריית תמונות', state: 'image-gallery', url: '/image-gallery' },
            { name: 'שיעורים', state: 'movie-category', url: '/movie-category' },
            { name: 'זמני שיעורים ותפילות', state: 'all-lesson', url: '/all-lesson' },
            { name: 'המלצות', state: 'recommendation', url: '/recommendation' },

        ];

        self.init = function () {
            //if (isMobile()) {
            //   // $('#menuBar').hide();
            //}

            var url = window.location.href.substr(window.location.host.length + 7, window.location.href.length);
            
            angular.forEach($scope.menuItems, function (value, key) {
                if (url.indexOf('movie-details') > 0) {
                    $scope.menu = "שיעורים";
                }
                if (value.url == url) {
                    $scope.menu = value.name;
                }
            });
        }


        $scope.alert = function () {
            alert('hi');
        }

        $scope.toggleMenu = function () {
            if (!isMobile()) {
                return;
            }

          //  $('#menuBar').slideUp();
        }

        $scope.DestoryDialogs = function () {
            $('.ngdialog').remove();
        }

        $scope.headerClicked = function (name) {
            $rootScope.menu = name;
            $scope.DestoryDialogs();
        }

        self.init();
    }]);

OvadiaApp.directive('headerComponent', function () {
    return {
        restrict: 'E',
        bindToController: true,
        controller: 'headerComponentCtrl',
        templateUrl:'/Scripts/OvadiaApp/header-component/header-component.html'
    }
});