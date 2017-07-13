OvadiaApp.controller('CategoryAdminCtrl', ['$scope', '$http', '$timeout', 'ngDialog',
    function ($scope, $http, $timeout, ngDialog ) {
    var self = this;
    $scope.lastChosenCat = null;
    $scope.ParentCategories = [];
    $scope.radio = 1;
    $scope.childrens = [], $scope.subchildrens = [];
    self.init = function () {
        $scope.InitCategories();
    }

    $scope.isActiveHelper = function (isActive) {
        if (isActive == null) {
            return true;
        } else {
            if (isActive) { return true; }
            else { return false; }
        }
    }

    /*-------------------Parent Category ----------------------------*/

    $scope.AddCategory = function (catName, isActive) {
        if (catName == null || catName.trim() == "") return;
        isActive = $scope.isActiveHelper(isActive);

        $http.get("/CategorySer/AddCategory?catName=" + catName + "&isActive=" + isActive)
            .then(function (response) {
            var errorCode;
            try {
                errorCode = response.data.ErrorCode;
            }
            catch (e) {
                errorCode = 1;
            }
            if (errorCode == 0) {
                $scope.parentCatInput = "";
                $scope.ParentCategories = response.data.Data;
                $scope.ParentCatSuccTxt = catName;
                $scope.ParentCatSuccKey = "נוספה";
                $('#ParentCatSucc').slideToggle(100);
                $timeout(function () {
                    $('#ParentCatSucc').slideToggle(1200);
                }, 1000);

            }
        
            else {
                $scope.OpenPopup("אירעה שגיאה כללית", "אנא נסה שוב, מאוחר יותר.");
            }
        });
    }

    $scope.InitCategories = function () {
        $scope.loader = true;
        $http.get("/CategorySer/GetAllParentCategories").then(function (response) {
            var errorCode;
            try {
                errorCode = response.data.ErrorCode;
            }
            catch (e) {
                errorCode = 1;
            }
            if (errorCode == 0) {
                console.log(response.data.Data);
                $scope.ParentCategories = response.data.Data;
                $scope.loader = false;
            }
            else {
                $scope.OpenPopup("אירעה שגיאה כללית", "אנא נסה שוב, מאוחר יותר.");
                $scope.loader = false;
            }
        });
    }

    $scope.DeleteCategory = function (catId) {
        if (catId == null) return;
        $scope.loader = true;
        $http.get("/CategorySer/RemoveCategoryById?catId=" + catId).then(function (response) {
            var errorCode;
            try {
                errorCode = response.data.ErrorCode;
            }
            catch (e) {
                errorCode = 1;
            }
            if (errorCode == 0) {
                $scope.parentCatInput = "";
                $scope.ParentCategories = response.data.Data;

                $scope.ParentCatSuccKey = "הוסרה";
                $('#ParentCatSucc').slideToggle(100);
                $timeout(function () {
                    $('#ParentCatSucc').slideToggle(1200);
                }, 1000);
            }
            else {
                $scope.OpenPopup("אירעה שגיאה במחיקת הקטגוריה", "אנא בדוק שאין שום מאמר שמשתמש בקטגוריה זו (או בתת קטגוריה שלה) ואם יש עליך לשנות את הקטגוריה במאמר, או להסיר את המאמר.");
            }
            $scope.loader = false;
        });
    }

    $scope.RenameCategory = function (catId, newName, isActive,order) {
        if (catId == null || newName == null || newName == "") return;
        isActive = $scope.isActiveHelper(isActive);
        $scope.loader = true;
        $http.get("/CategorySer/RenameCategoryName?catId=" + catId + "&newName=" + newName + "&isActive=" + isActive + "&order=" + order)
            .then(function (response) {
            var errorCode;
            try {
                errorCode = response.data.ErrorCode;
            }
            catch (e) {
                errorCode = 1;
            }
            if (errorCode == 0) {
                $scope.parentCatInput = "";
                $scope.ParentCategories = response.data.Data;

                $scope.ParentCatSuccKey = "שונתה";
                $('#ParentCatSucc').slideToggle(100);
                $timeout(function () {
                    $('#ParentCatSucc').slideToggle(1200);
                }, 1000);
            }
            $scope.loader = false;
        });
    }

    $scope.SelectedParentCat = function (item) {
        $scope.parentCat = item;
        if (item == null) return;
        $scope.loader = true;
        $http.get("/CategorySer/GetAllChildrensCategoriesById?catId=" + item.Id).then(function (response) {
            var errorCode;
            try {
                errorCode = response.data.ErrorCode;
            }
            catch (e) {
                errorCode = 1;
            }
            if (errorCode == 0) {
                $scope.parentCatInput = "";
                $scope.parentCat.Children = response.data.Data;
            }
        });
        if (item == null) {
            $scope.parentCatInput = "";
            return;
        }
        $scope.lastChosenCat = item.Name;
        $scope.parentCatInput = item.Name;
        $scope.loader = false;
    }

    /*-------------------SubParent Category ----------------------------*/

    $scope.AddSubCategory = function (parentId, catName, isActive) {
        if (catName == null || catName.trim() == "") return;
        isActive = $scope.isActiveHelper(isActive);
        $scope.loader = true;
        $http.get("/CategorySer/AddSubCategory?&catName=" + catName + "&parentId=" + parentId + "&isActive=" + isActive )
            .then(function (response) {
            var errorCode;
            try {
                errorCode = response.data.ErrorCode;
            }
            catch (e) {
                errorCode = 1;
            }
            if (errorCode == 0) {
                $scope.subParentCatInput = "";
                $scope.parentCat.Children = response.data.Data;

                angular.forEach($scope.ParentCategories, function (value, index) {
                    if (value.Name == $scope.parentCat.Name) {
                        $scope.parentCat = value;
                        return;
                    }
                });
                $scope.SubCatSuccTxtKey = "נוספה";
                $scope.SubCatSuccTxt = catName;
                $('#SubCatSucc').slideToggle(100);
                $timeout(function () {
                    $('#SubCatSucc').slideToggle(1200);
                }, 1000);
            }
            $scope.loader = false;
        });
    }

    $scope.RenameSubCategory = function (parentId, catId, newName, isActive, order) {
        debugger;
        if (catId == null || newName == null || newName == "") return;
        isActive = $scope.isActiveHelper(isActive);
        $scope.loader = true;
        $http.get("/CategorySer/RenameSubCategoryName?parentId=" + parentId + "&catId=" + catId + "&newName=" + newName + "&isActive=" + isActive + "&order=" + order)
            .then(function (response) {
            var errorCode;
            try {
                errorCode = response.data.ErrorCode;
            }
            catch (e) {
                errorCode = 1;
            }
            if (errorCode == 0) {
                $scope.parentCatInput = "";
                $scope.parentCat.Children = response.data.Data;

                $scope.SubCatSuccKey = "שונתה";
                $scope.SubCatSuccTxt = newName;
                $('#ParentCatSucc').slideToggle(100);
                $timeout(function () {
                    $('#ParentCatSucc').slideToggle(1200);
                }, 1000);
            }
            $scope.loader = false;
        });
    }

    $scope.DeleteSubCategory = function (parentId, catId, catName) {
        if (catId == null) return;
        $scope.loader = true;
        $http.get("/CategorySer/RemoveSubCategoryById?catId=" + catId + "&parentId=" + parentId)
            .then(function (response) {
                var errorCode;
                try {
                    errorCode = response.data.ErrorCode;
                }
                catch (e) {
                    errorCode = 1;
                }
                if (errorCode == 0) {
                    $scope.subParentCatInput = "";
                    $scope.parentCat.Children = response.data.Data;

                    angular.forEach($scope.ParentCategories, function (value, index) {
                        if (value.Name == $scope.parentCat.Name) {
                            $scope.parentCat = value;
                            return;
                        }
                    });

                    $scope.SubCatSuccTxtKey = "הוסרה";
                    $scope.SubCatSuccTxt = catName;
                    $('#SubCatSucc').slideToggle(100);
                    $timeout(function () {
                        $('#SubCatSucc').slideToggle(1200);
                    }, 1000);
                }
                else {
                    $scope.OpenPopup("אירעה שגיאה במחיקת הקטגוריה", "אנא בדוק שאין שום מאמר שמשתמש בקטגוריה זו (או בתת קטגוריה שלה) ואם יש עליך לשנות את הקטגוריה במאמר, או להסיר את המאמר.");
                }
                $scope.loader = false;
            });
    }

    $scope.SelectedSubParentCat = function (item) {
        if (item == null) return;
        $scope.loader = true;
        $http.get("/CategorySer/GetAllChildrensCategoriesById?catId=" + item.Id).then(function (response) {
            var errorCode;
            try {
                errorCode = response.data.ErrorCode;
            }
            catch (e) {
                errorCode = 1;
            }
            if (errorCode == 0) {
                $scope.subParentCatInput = "";
                $scope.subParentCat = item;
                $scope.subParentCat.Children = response.data.Data;
            }
        });
        if (item == null) {
            $scope.subParentCatInput = "";
            return;
        }
        $scope.subParentCatInput = item.Name;
        $scope.loader = false;
    }

    /*-------------------Sub3Parent Category ----------------------------*/

    $scope.AddSub3Category = function (parentId, catName, isActive) {
        debugger;
        if (catName == null || catName.trim() == "") return;
        isActive = $scope.isActiveHelper(isActive);
        $scope.loader = true;
        $http.get("/CategorySer/AddSubCategory?&catName=" + catName + "&parentId=" + parentId + "&isActive=" + isActive )
            .then(function (response) {
            var errorCode;
            try {
                errorCode = response.data.ErrorCode;
            }
            catch (e) {
                errorCode = 1;
            }
            if (errorCode == 0) {
                $scope.subParentCatInput = "";
                $scope.subParentCat.Children = response.data.Data;

                angular.forEach($scope.ParentCategories, function (value, index) {
                    if (value.Name == $scope.parentCat.Name) {
                        $scope.parentCat = value;
                        return;
                    }
                });
                $scope.Sub3CatSuccTxtKey = "נוספה";
                $scope.Sub3CatSuccTxt = catName;
                $('#Sub3CatSucc').slideToggle(100);
                $timeout(function () {
                    $('#Sub3CatSucc').slideToggle(1200);
                }, 1000);
            }
            $scope.loader = false;
        });
    }

    $scope.RenameSub3Category = function (parentId, catId, newName, isActive,order) {
        if (catId == null || newName == null || newName == "") return;
        isActive = $scope.isActiveHelper(isActive);
        $scope.loader = true;
        $http.get("/CategorySer/RenameSubCategoryName?parentId=" + parentId + "&catId=" + catId + "&newName=" + newName + "&isActive=" + isActive + "&order=" + order).then(function (response) {
            var errorCode;
            try {
                errorCode = response.data.ErrorCode;
            }
            catch (e) {
                errorCode = 1;
            }
            if (errorCode == 0) {
                $scope.subParentCatInput = "";
                $scope.subParentCat.Children = response.data.Data;

                $scope.Sub3CatSuccTxtKey = "שונתה";
                $scope.Sub3CatSuccTxt = newName;
                $('#Sub3CatSucc').slideToggle(100);
                $timeout(function () {
                    $('#Sub3CatSucc').slideToggle(1200);
                }, 1000);
            }
            $scope.loader = false;
        });
    }

    $scope.DeleteSub3Category = function (parentId, catId, catName) {
        if (catId == null) return;
        $scope.loader = true;
        $http.get("/CategorySer/RemoveSubCategoryById?catId=" + catId + "&parentId=" + parentId)
            .then(function (response) {
                var errorCode;
                try {
                    errorCode = response.data.ErrorCode;
                }
                catch (e) {
                    errorCode = 1;
                }
                if (errorCode == 0) {
                    $scope.subParentCatInput = "";
                    $scope.subParentCat.Children = response.data.Data;

                    angular.forEach($scope.ParentCategories, function (value, index) {
                        if (value.Name == $scope.parentCat.Name) {
                            $scope.parentCat = value;
                            return;
                        }
                    });

                    $scope.Sub3CatSuccTxtKey = "הוסרה";
                    $scope.Sub3CatSuccTxt = catName;
                    $('#Sub3CatSucc').slideToggle(100);
                    $timeout(function () {
                        $('#Sub3CatSucc').slideToggle(1200);
                    }, 1000);
                }
                else {
                    $scope.OpenPopup("אירעה שגיאה במחיקת הקטגוריה", "אנא בדוק שאין שום מאמר שמשתמש בקטגוריה זו (או בתת קטגוריה שלה) ואם יש עליך לשנות את הקטגוריה במאמר, או להסיר את המאמר.");
                }
                $scope.loader = false;
            });
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

    $scope.SelectedSub3ParentCat = function (item) {
        if (item == null) {
            $scope.sub3ParentCatInput = "";
            return;
        }
        $scope.sub3ParentCatInput = item.Name;
    }

    /*-------------------Order Category ----------------------------*/
    $scope.OrderFunc = function (item) {
        var isActive = item.isActive > 0 ? true : false;
        $scope.loader_parent = true;
        $http.get("/CategorySer/RenameCategoryName?catId=" + item.Id + "&newName=" + item.Name + "&isActive=" + isActive + "&order=" + item.Cat_Order)
            .then(function (response) {
                var errorCode;
                try {
                    errorCode = response.data.ErrorCode;
                }
                catch (e) {
                    errorCode = 1;
                }
                if (errorCode == 0) {
                    $scope.ParentCategories = response.data.Data;
                }
                $scope.loader_parent = false;
            });
    }

    $scope.OrderSubFunc = function (item) {
        var isActive = item.isActive > 0 ? true : false;
        $scope.loader_parent = true;

        $http.get("/CategorySer/RenameSubCategoryName?parentId=" + item.ParentId + "&catId=" + item.Id + "&newName=" + item.Name + "&isActive=" + isActive + "&order=" + item.Cat_Order)
            .then(function (response) {
                var errorCode;
                try {
                    errorCode = response.data.ErrorCode;
                }
                catch (e) {
                    errorCode = 1;
                }
                if (errorCode == 0) {
                        item.Children = response.data.Data;
                }
                $scope.loader_parent = false;
            });
    }

    $scope.Plus1 = function (item, level) {
        item.Cat_Order = (item.Cat_Order * 1 + 1) + "";
        if(level == 0)
            $scope.OrderFunc(item);
        if (level == 1) {
            $scope.OrderSubFunc(item);
        }
    }

    $scope.Minus1 = function (item, level) {
        item.Cat_Order = (item.Cat_Order * 1 - 1) + "";
        if (level == 0)
            $scope.OrderFunc(item);
        if (level == 1) {
            $scope.OrderSubFunc(item);
        }
    }

    $scope.openChildren = function (item, index, dor) {
        if (item == null) return;
        if (dor == 0) {
            $scope.childrens[index] = !$scope.childrens[index];
        }
        else {
            $scope.subchildrens[index] = !$scope.subchildrens[index];
        }
        
        $scope.loader_parent = true;
        $http.get("/CategorySer/GetAllChildrensCategoriesById?catId=" + item.Id).then(function (response) {
            var errorCode;
                try {
                    errorCode = response.data.ErrorCode;
                }
                catch (e) {
                    errorCode = 1;
                }
                if (errorCode == 0) {
                    item.Children = response.data.Data;
                }
                $scope.loader_parent = false;
         });

    }

    self.init();
}]);

//OvadiaApp.directive('CategoryAdmin', function () {
//    return {
//        restrict: 'E',
//        bindToController: true,
//        controller: 'CategoryAdminCtrl',
//        templateUrl: '/Scripts/OvadiaApp/Admin/category-admin/category-admin.html'
//    }
//});