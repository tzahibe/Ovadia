OvadiaApp.controller('loginContainerCtrl', ['$scope', 'appServices', 'UserAccount', '$state',
    '$cookies',
    function ($scope, appServices, UserAccount, $state, $cookies) {
        var self = this;

        self.init = function () {
          
        }
        $scope.login = function () {
            $scope.loader = true;
            $scope.faildLoginMsg = false;
            if ($scope.UserName == null || $scope.UserName == '' || 
                $scope.Password == null || $scope.Password == '') {
                $scope.faildLoginMsg = true;
                $scope.loader = false;
                return;
            }
            appServices.Login($scope.UserName, $scope.Password).then(function (response) {
                if (response.data.ErrorCode == 0) {
                    UserAccount.User = response.data.Data;
                    UserAccount.User.LastLogin = $scope.DateToClient(UserAccount.User.LastLogin);
                    UserAccount.User.AccountCreate = $scope.DateToClient(UserAccount.User.AccountCreate);
                    UserAccount.Role = UserAccount.User.UserRole;
                    $scope.loader = false;
                    //$cookies.put('UserRole', UserAccount.Role);
                    $state.go('admin.lesson');
                }
                else {
                    $scope.loader = false;
                    $scope.faildLoginMsg = true;
                }
            })
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

        self.init();
    }]);

OvadiaApp.directive('loginContainer', function () {
    return {
        restrict: 'E',
        bindToController: true,
        controller: 'loginContainerCtrl',
        templateUrl: '/Scripts/OvadiaApp/login-container/login-container.html'
    }
});