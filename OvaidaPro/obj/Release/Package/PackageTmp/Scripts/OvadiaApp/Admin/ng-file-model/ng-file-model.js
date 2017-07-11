OvadiaApp.controller('ImagesCntrl', ['$scope', '$http', '$timeout', 'Upload','ngDialog',
    function ($scope, $http, $timeout, Upload, ngDialog) {
        var self = this;
        $scope.results = [];

        self.init = function () {
            $scope.ShowFiles();
        }

        $scope.ShowFiles = function () {
            $scope.loader = true;
            $http.get("/Uploads/ShowFiles").then(function (response) {
                var ErrorCode;
                try {
                    ErrorCode = response.data.ErrorCode;
                }
                catch (e) {
                    ErrorCode = 1;
                }
                if (ErrorCode == 0) {
                    $scope.results = response.data.Data;
                    angular.forEach($scope.results, function (value, key) {
                        value.Name = value.Name.split("sm_")[1];
                    });
                }
                else if (ErrorCode == 5) {
                    $scope.isAllow = false;
                }
                $scope.loader = false;
            });
        }

        $scope.DeleteFile = function (fname) {
            $scope.loader = true;
            $http.get("/Uploads/DeleteFile?fname=" + fname).then(function (response) {
                if (response.data.Data.length > 0) {
                    self.RemoveFromArray(fname);
                }
                $scope.loader = false;
            });
        }

        $scope.uploadFiles = function (files, errFiles) {
            $scope.files = files;
            $scope.errFiles = errFiles;
            angular.forEach(files, function (file) {
                $scope.file_loader = true;
                file.upload = Upload.upload({
                    url: '/Uploads/AddFile?fileName=' + file.name,
                    data: { file: file },
                    dataType: "json",
                });

                file.upload.then(function (response) {
                    if (response.data.ErrorCode == 1) {
                        $scope.file_loader = false;
                        $scope.ErrorMsg = response.data.ErrorMsg;
                        return;
                    }
                    $timeout(function () {
                        var addFlag = true;
                        angular.forEach($scope.results, function (value, key) {
                            if (value.Name == response.data.Data) {
                                addFlag = false;
                            }
                        });
                        if (addFlag == true) {
                            $scope.file_loader = false;
                            $scope.results.push({ Name: response.data.Data });
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

        $scope.CoppyImageUrl = function (imgName) {
            $scope.OpenPopup("http://" + window.location.host + "/Uploads/lg_" + imgName, "כתובת תמונה");
            return "http://" + window.location.host + "/Uploads/lg_" + imgName;
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
            if ($scope.results.length == 1) {
                if ($scope.results[0].Name == fname) {
                    $scope.results.splice(0, 1);
                }
            }

            angular.forEach($scope.results, function (value, index) {
                if (value.Name == fname) {
                    $scope.results.splice(index, 1);
                }
            });
        }

        self.init();

    }]);

OvadiaApp.directive('ngFileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var model = $parse(attrs.ngFileModel);
            var isMultiple = attrs.multiple;
            var modelSetter = model.assign;
            element.bind('change', function () {
                var values = [];
                angular.forEach(element[0].files, function (item) {
                    var value = {
                        // File Name 
                        name: item.name,
                        //File Size 
                        size: item.size,
                        //File URL to view 
                        url: URL.createObjectURL(item),
                        // File Input Value 
                        _file: item
                    };
                    values.push(value);
                });
                scope.$apply(function () {
                    if (isMultiple) {
                        modelSetter(scope, values);
                    } else {
                        modelSetter(scope, values[0]);
                    }
                });
            });
        }
    };
}]);