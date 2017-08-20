OvadiaApp.controller('addRecommenCtrl', ['$scope', 'appServices', 'ngDialog', '$timeout', '$http', '$stateParams',
    '$state','$rootScope',
    function ($scope, appServices, ngDialog, $timeout, $http, $stateParams, $state, $rootScope) {
        var self = this;
        $scope.isNewArticle = true;
        $scope.Article = {};

        self.init = function () {

            if ($stateParams.Recomm != null) {
                $scope.Article = $stateParams.Recomm;
                $scope.isNewArticle = false;
                //$scope.GetArticle();
            }
            //else if (window.location.href.indexOf("id") > 0) {
            //    $scope.articleId = window.location.href.substr(35, 4);
            //    $scope.GetArticle();
            //}
        }

        $scope.AddArticle = function () {
            if (!movieForm.checkValidity()) {
                $scope.OpenPopup("שדות חובה לא מולאו!", "אנא מלא את השדות המסומנות באדום בערכים מתאימים");
                return;
            }

            $scope.loader = true;
            appServices.AddRecomm($scope.Article)
                .then(function (data) {
                    var ErrorCode;
                    try {
                        ErrorCode = data.ErrorCode;
                    }
                    catch (e) {
                        ErrorCode = 1;
                    }
                    if (ErrorCode == 0) {
                        $scope.OpenPopup("המלצה נשמרה בהצלחה!", "תוכל להמשיך לערוך את המלצה");
                        $scope.Article = data.Data;
                        $scope.isNewArticle = false;
                    }
                    else if (ErrorCode == 2) {
                        $scope.OpenPopup("שגיאה!", "המלצה עם כותרת זהה כבר קיימת במערכת.");

                    }
                    else if (data.ErrorCode == 5) {
                        $rootScope.LogOut();
                    }
                    else {
                        $scope.OpenPopup("שגיאה בלתי צפויה!", "נסה להתחבר מחדש, ואם הבעיה איננה נפתרת פנה למנהל האתר");
                    }
                    $scope.loader = false;
                });
        }

        $scope.GetArticle = function () {
            $scope.loader = true;
            appServices.GetRecommById($scope.articleId)
                .then(function (data) {
                    var ErrorCode;
                    try {
                        ErrorCode = data.ErrorCode;
                    }
                    catch (e) {
                        ErrorCode = 1;
                    }
                    if (ErrorCode == 0) {
                        $scope.Article = data.Data;
                        $scope.isNewArticle = false;
                    }
                    else {
                        $scope.OpenPopup("שגיאה בלתי צפויה!", "נסה להתחבר מחדש, ואם הבעיה איננה נפתרת פנה למנהל האתר");
                    }
                    $scope.loader = false;
                });
        }

        $scope.backToCategory = function () {
            $state.go('admin.edit-recommen');
        }

        $scope.EditArticle = function () {
            if (!movieForm.checkValidity()) {
                $scope.OpenPopup("שדות חובה לא מולאו!", "אנא מלא את השדות המסומנות באדום בערכים מתאימים");
                return;
            }
            $scope.loader = true;

            appServices.EditRecomm($scope.Article).then(function (data) {
                var ErrorCode;
                try {
                    ErrorCode = data.ErrorCode;
                }
                catch (e) {
                    ErrorCode = 1;
                }
                if (ErrorCode == 0) {
                    $scope.OpenPopup("המלצה עודכנה בהצלחה!", "תוכל להמשיך לערוך את ההמלצה");
                    $scope.isNewArticle = false;
                }
                else if (data.ErrorCode == 5) {
                    $rootScope.LogOut();
                }
                else {
                    $scope.OpenPopup("שגיאה בלתי צפויה!", "נסה להתחבר מחדש, ואם הבעיה איננה נפתרת פנה למנהל האתר");
                }
                $scope.loader = false;
            });
        }

        $scope.NewArticle = function () {
            $scope.isNewArticle = true;
            $scope.articleId = null;
            $scope.Article = {};
        }

        $scope.RemoveArticleById = function () {
            $scope.loader = true;
            appServices.RemoveRecommById($scope.Article.ArticleId)
                .then(function (data) {
                    debugger;
                    var ErrorCode;
                    try {
                        ErrorCode = data.ErrorCode;
                    }
                    catch (e) {
                        ErrorCode = 1;
                    }
                    if (ErrorCode == 0) {
                        $scope.OpenPopup("המלצה הוסרה בהצלחה!", "תוכל ליצור המלצה חדשה");
                        $scope.Article = {};
                        $scope.isNewArticle = true;
                    }
                    else if (data.ErrorCode == 5) {
                        $rootScope.LogOut();
                    }
                    else {
                        $scope.OpenPopup("שגיאה בלתי צפויה!", "נסה להתחבר מחדש, ואם הבעיה איננה נפתרת פנה למנהל האתר");
                    }
                    $scope.loader = false;
                });
        }

        $scope.OpenPopup = function (title, msg) {
            $scope.Title = title;
            $scope.Msg = msg;
            ngDialog.open({
                template: '/Scripts/OvadiaApp/Admin/events-dialog/Movies/Movie-change.html',
                //className: 'ngdialog-theme-default',
                scope: $scope
            });
        }

        self.init();
    }]);

OvadiaApp.directive('addRecommen', function () {
    return {
        restrict: 'E',
        bindToController: true,
        controller: 'addRecommenCtrl',
        templateUrl: '/Scripts/OvadiaApp/Admin/recommen/add-recommen/add-recommen.html'
    }
});