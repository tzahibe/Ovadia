OvadiaApp.controller('imageGalleryCtrl', ['$scope', '$timeout', '$interval','$http',
    function ($scope, $timeout, $interval, $http) {
        var currentDialog = null;
        $scope.currentEvent = null;
        $scope.ver = Math.random() * 100000;
        $scope.images = [];
        $scope.counter = 5;
        $scope.thumbSize = 150;
        $scope.limitImages = 4;
        $scope.moreImages = [];

        var self = this;
        var counterIntvl = $interval(function () {
            $scope.counter = $scope.counter - 1;
            if ($scope.counter == 0) {
                $interval.cancel(counterIntvl);
            }
        }, 1000);

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

        self.init = function () {
            $scope.isMobileDevice();
            $scope.showFiles();
           
        }
        $scope.loadMoreImages = function () {
            $scope.limitImages += 4;
        }

        $scope.showFiles = function () {
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
                        var item = {
                            id: 546 + key,
                            title: 'תמונה מהכולל',
                            alt: 'תמונה מהכולל',
                            url: "http://" + window.location.host + "/Uploads/lg_" + value.Name + "?ver" + $scope.ver,
                            thumbUrl: "http://" + window.location.host + "/Uploads/sm_" + value.Name + "?ver" + $scope.ver,
                            bubbleUrl: "http://" + window.location.host + "/Uploads/sm_" + value.Name + "?ver" + $scope.ver,
                            //extUrl: 'http://google.com',
                            desc: '',
                            deletable: true
                        }
                        $scope.images.push(item);
                    });
                }
                else if (ErrorCode == 5) {
                    $scope.isAllow = false;
                }
                $scope.loader = false;
            });
        }
        // Local images
        //$scope.images = [
        //    {
        //        id: 546,
        //        title: 'My first image',
        //        alt: 'photo1',
        //        url: '../demo/demo-images/1.jpg',
        //        thumbUrl: '../demo/demo-images/thumbs/1.jpg',
        //        bubbleUrl: '../demo/demo-images/bubbles/1.jpg',
        //        extUrl: 'http://google.com/image/1',
        //        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc consequat enim dui, vitae pretium turpis faucibus ac. Donec nisi ex, tempus non leo vel, laoreet convallis libero.',
        //        deletable: true
        //    },
        //    {
        //        id: 892,
        //        url: '../demo/demo-images/2.jpg',
        //        thumbUrl: '../demo/demo-images/thumbs/2.jpg',
        //        bubbleUrl: '../demo/demo-images/bubbles/2.jpg',
        //        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        //    },
        //    {
        //        id: 5454,
        //        url: '../demo/demo-images/3.jpg',
        //        thumbUrl: '../demo/demo-images/thumbs/3.jpg',
        //        bubbleUrl: '../demo/demo-images/bubbles/3.jpg',
        //        deletable: true,
        //    },
        //    {
        //        id: 34,
        //        title: 'My fourth image',
        //        alt: 'photo4',
        //        url: '../demo/demo-images/4.jpg',
        //        thumbUrl: '../demo/demo-images/thumbs/4.jpg',
        //        bubbleUrl: '../demo/demo-images/bubbles/4.jpg',
        //        extUrl: 'http://google.com/image/4',
        //        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc consequat enim dui, vitae pretium turpis faucibus ac. Donec nisi ex, tempus non leo vel, laoreet convallis libero. Vestibulum luctus libero nisl, elementum placerat libero ornare quis. Etiam aliquet, tellus et sagittis ullamcorper, nulla arcu volutpat orci, id vehicula quam orci sed nisi. Cras pellentesque faucibus elit a sagittis. Ut bibendum, arcu ac maximus efficitur, odio magna luctus nisi, a sollicitudin orci odio in quam. Nunc non tempus quam, vel ullamcorper massa. Quisque aliquet velit eget leo venenatis, eu sagittis justo aliquet. Ut ac sollicitudin tortor. Duis id egestas lacus. In nibh eros, pretium sed cursus sed, lobortis ac elit.',
        //        deletable: true
        //    },
        //    {
        //        id: 415,
        //        url: '../demo/demo-images/5.jpg',
        //        thumbUrl: '../demo/demo-images/thumbs/5.jpg',
        //        bubbleUrl: '../demo/demo-images/bubbles/5.jpg',
        //    },
        //    {
        //        id: 5582,
        //        url: '../demo/demo-images/6.jpg',
        //        thumbUrl: '../demo/demo-images/thumbs/6.jpg',
        //        bubbleUrl: '../demo/demo-images/bubbles/6.jpg',
        //    },
        //    {
        //        id: 64634,
        //        title: 'My seventh image',
        //        alt: 'photo7',
        //        url: '../demo/demo-images/7.jpg',
        //        thumbUrl: '../demo/demo-images/thumbs/7.jpg',
        //        bubbleUrl: '../demo/demo-images/bubbles/7.jpg',
        //    },
        //    {
        //        id: 475,
        //        url: '../demo/demo-images/8.jpg',
        //        thumbUrl: '../demo/demo-images/thumbs/8.jpg',
        //        bubbleUrl: '../demo/demo-images/bubbles/8.jpg',
        //        extUrl: 'http://google.com/image/8',
        //        deletable: true
        //    },
        //    {
        //        id: 452,
        //        title: 'My 9th image',
        //        alt: 'photo9',
        //        url: '../demo/demo-images/9.jpg',
        //        thumbUrl: '../demo/demo-images/thumbs/9.jpg',
        //        bubbleUrl: '../demo/demo-images/bubbles/9.jpg',
        //    }
        //];

             
        //    {
        //        id: 658,
        //        url: '../demo/demo-images/10.jpg',
        //        thumbUrl: '../demo/demo-images/thumbs/10.jpg',
        //        bubbleUrl: '../demo/demo-images/bubbles/10.jpg',
        //    },
        //    {
        //        id: 952,
        //        url: '../demo/demo-images/11.jpg',
        //        thumbUrl: '../demo/demo-images/thumbs/11.jpg',
        //        bubbleUrl: '../demo/demo-images/bubbles/11.jpg',
        //        extUrl: 'http://google.com/image/11',
        //        deletable: true
        //    },
        //    {
        //        id: 8575,
        //        title: 'My twelth image',
        //        alt: 'photo12',
        //        url: '../demo/demo-images/12.jpg',
        //        thumbUrl: '../demo/demo-images/thumbs/12.jpg',
        //        bubbleUrl: '../demo/demo-images/bubbles/12.jpg',
        //    },
        //    {
        //        id: 3652,
        //        url: '../demo/demo-images/13.jpg',
        //        thumbUrl: '../demo/demo-images/thumbs/13.jpg',
        //        bubbleUrl: '../demo/demo-images/bubbles/13.jpg'
        //    }
        //];

        $scope.conf = {
            imgAnim: 'fadeup'
        };

        /*****************************************************/

        $timeout(function () {
            $scope.images = $scope.images.concat($scope.moreImages);
        }, 5000);

        // Thumbnails
        $scope.thumbnails = true;
        $scope.toggleThumbnails = function () {
            $scope.thumbnails = !$scope.thumbnails;
        }

        // Inline
        $scope.inline = false;
        $scope.toggleInline = function () {
            $scope.inline = !$scope.inline;
        }

        // Bubbles
        $scope.bubbles = true;
        $scope.toggleBubbles = function () {
            $scope.bubbles = !$scope.bubbles;
        }

        // Image bubbles
        $scope.imgBubbles = false;
        $scope.toggleImgBubbles = function () {
            $scope.imgBubbles = !$scope.imgBubbles;
        }

        // Background close
        $scope.bgClose = false;
        $scope.closeOnBackground = function () {
            $scope.bgClose = !$scope.bgClose;
        }

        // Gallery methods gateway
        $scope.methods = {};
        $scope.openGallery = function () {
            $scope.methods.open();
        };

        // Gallery callbacks
        $scope.opened = function () {
            console.info('Gallery opened!');
        }

        $scope.closed = function () {
            console.warn('Gallery closed!');
        }
        self.init();
    }]);

OvadiaApp.directive('imageGallery', function () {
    return {
        restrict: 'E',
        bindToController: true,
        controller: 'imageGalleryCtrl',
        templateUrl: '/Scripts/OvadiaApp/image-gallery/image-gallery.html'
    }
});