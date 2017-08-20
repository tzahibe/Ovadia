OvadiaApp.controller('ImagesRecommCntrl', ['$scope', '$http', '$timeout', 'Upload', 'ngDialog','$rootScope',
    function ($scope, $http, $timeout, Upload, ngDialog, $rootScope) {
        var self = this;
        $scope.results2 = [];
        $scope.ver = Math.random() * 99999;

        self.init = function () {
            $scope.ShowFiles();
        }

        $scope.ShowFiles = function () {
            $scope.loader = true;
            $http.get("/Uploads/ShowRecomFiles").then(function (response) {
                var ErrorCode;
                try {
                    ErrorCode = response.data.ErrorCode;
                }
                catch (e) {
                    ErrorCode = 1;
                }
                if (ErrorCode == 0) {
                    $scope.results2 = response.data.Data;
                    angular.forEach($scope.results2, function (value, key) {
                        value.Name = value.Name.split("sm_")[1];
                    });
                }
                else if (ErrorCode == 5) {
                    $scope.isAllow = false;
                    $rootScope.LogOut();
                }
                $scope.loader = false;
            });
        }

        $scope.DeleteFile = function (fname) {
            $scope.loader = true;
            $http.get("/Uploads/DeleteRecomFile?fname=" + fname).then(function (response) {
                if (response.data.ErrorCode == 0) {
                    if (response.data.Data.length > 0) {
                        self.RemoveFromArray(fname);
                    }
                }
                else if (data.ErrorCode == 5) {
                    $rootScope.LogOut();
                }
                else {
                    alert("ארעה שגיאה בלתי צפויה");
                }
                $scope.loader = false;
            });
        }

        $scope.getImage1Url = function (file) {
            file.imageUrl = "/Recom/sm_" + file.Name + "?ver=" + $scope.ver;
            return file.imageUrl;
        }

        $scope.Rotate90 = function (f) {
            $scope.ver++;
            //$scope.loader = true;
            $http.get("/Uploads/RotateRecom90?fname=" + f.Name).then(function (response) {
                if (response.data.ErrorCode == 0) {
                    if (f.degree == null) {
                        f.degree = 0;
                    }
                    f.degree += 90;
                    if (f.degree == 360) {
                        f.degree == 0;
                    }
                    f.style = '-webkit-transform:rotate(' + f.degree + 'deg);-moz-transform:rotate(' + f.degree + 'deg);-ms-transform:rotate(' + f.degree + 'deg);-o-transform:rotate(' + f.degree + 'deg);transform:rotate(' + f.degree + 'deg);';
                    //$('#' + f.Name).attr("style",'-webkit-transform:rotate(' + f.degree + 'deg);-moz-transform:rotate(' + f.degree + 'deg);-ms-transform:rotate(' + f.degree + 'deg);-o-transform:rotate(' + f.degree + 'deg);transform:rotate(' + f.degree + 'deg);');
                }
                else if (data.ErrorCode == 5) {
                    $rootScope.LogOut();
                }
                else {
                    //
                }
                //$scope.loader = false;
            });
        }

        $scope.uploadFiles = function (files, errFiles) {
            $scope.files = files;
            $scope.errFiles = errFiles;
            angular.forEach(files, function (file) {
                $scope.file_loader = true;
                file.upload = Upload.upload({
                    url: '/Uploads/AddRecomFile?fileName=' + file.name,
                    data: { file: file },
                    dataType: "json",
                });

                file.upload.then(function (response) {
                    if (response.data.ErrorCode == 1) {
                        $scope.file_loader = false;
                        $scope.ErrorMsg = response.data.ErrorMsg;
                        return;
                    }
                    else if (response.data.ErrorCode == 5){
                        $rootScope.LogOut();
                    }
                    $timeout(function () {
                        var addFlag = true;
                        angular.forEach($scope.results2, function (value, key) {
                            if (value.Name == response.data.Data) {
                                addFlag = false;
                            }
                        });
                        if (addFlag == true) {
                            $scope.file_loader = false;
                            $scope.results2.push({ Name: response.data.Data });
                        }
                        file.result = +response.data.Data;
                    });
                }, function (response) {
                    if (response.status > 0) {
                        $scope.errorMsg = response.status + ': ' + response.data;
                    }
                }, function (evt) {
                    file.progress = Math.min(100, parseInt(100.0 *
                        evt.loaded / evt.total));
                });
            });
        }

        $scope.CoppyImage1Url = function (imgName) {
           // $scope.OpenPopup("http://" + window.location.host + "/Uploads/lg_" + imgName, "כתובת תמונה");
            return "http://" + window.location.host + "/Recom/lg_" + imgName;
        }

        $scope.OpenPopup = function (title, msg) {
            $scope.Title = title;
            $scope.Msg = msg;
            ngDialog.open({
                template: '/Scripts/OvadiaApp/Admin/events-dialog/popup-screen.html',
                className: 'ngdialog-theme-default',
                scope: $scope
            });
        }

        self.RemoveFromArray = function (fname) {
            if ($scope.results2.length == 1) {
                if ($scope.results2[0].Name == fname) {
                    $scope.results2.splice(0, 1);
                }
            }

            angular.forEach($scope.results2, function (value, index) {
                if (value.Name == fname) {
                    $scope.results2.splice(index, 1);
                }
            });
        }
       
        self.init();

    }]);

OvadiaApp.directive('uploadRecom', function () {
    return {
        restrict: 'E',
        bindToController: true,
        controller: 'ImagesRecommCntrl',
        templateUrl: '/Scripts/OvadiaApp/Admin/upload-recom/upload-recom.html'
    }
});