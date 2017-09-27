OvadiaApp.config(function ($stateProvider, $locationProvider, ngClipProvider, UserRole, $sceDelegateProvider) {
    $stateProvider
        .state("home", {
            url: '/',
            templateUrl: '/Scripts/OvadiaApp/home-component/home-component.html',
            controller: 'homeComponentCtrl',
            data: {
                access: [UserRole.Admin, UserRole.Guest, UserRole.Editor]
            }
        })
        .state("movie-details", {
            url: '/movie-category/movie-details/:articleId',
            templateUrl: '/Scripts/OvadiaApp/movie-details/movie-details.html',
            controller: 'movieDetailsCtrl',
            data: {
                access: [UserRole.Admin, UserRole.Guest, UserRole.Editor]
            },
            params: {
                articleId: null
            }
        })
        .state("movie-category", {
            url: '/movie-category',
            templateUrl: '/Scripts/OvadiaApp/movie-category/movie-category.html',
            controller: 'movieCategoryCtrl',
            data: {
                access: [UserRole.Admin, UserRole.Guest, UserRole.Editor]
            }
        })
        .state("login", {
            url: '/login',
            templateUrl: '/Scripts/OvadiaApp/login-container/login-container.html',
            controller: 'loginContainerCtrl',
            data: {
                access: [UserRole.Admin, UserRole.Guest, UserRole.Editor]
            }
        })
        .state("index", {
            url: '/index',
            templateUrl: '/Scripts/OvadiaApp/home-component/home-component.html',
            controller: 'homeComponentCtrl',
            data: {
                access: [UserRole.Admin, UserRole.Guest, UserRole.Editor]
            }
        })
        .state("admin", {
            url: '/admin',
            templateUrl: '/Scripts/OvadiaApp/Admin/home-admin/home-admin.html',
            controller: 'homeAdminCtrl',
            data: {
                access: [UserRole.Admin, UserRole.Editor]
            }

        })
        .state("admin.home", {
            url: '/home',
            templateUrl: '/Scripts/OvadiaApp/Admin/admin-home/admin-home.html',
            controller: 'adminHomeCtrl',
            data: {
                access: [UserRole.Admin, UserRole.Editor]
            }

        })
        .state("profile", {
            url: '/profile',
            templateUrl: '/Scripts/OvadiaApp/profile-component/profile-component.html',
            controller: 'profileComponentCtrl',
            data: {
                access: [UserRole.Admin, UserRole.Editor, UserRole.Guest]
            }
        })
        .state("donation", {
            url: '/donation/:Type',
            templateUrl: '/Scripts/OvadiaApp/donation-screen/donation-screen.html',
            controller: 'donationScreenCtrl',
            data: {
                access: [UserRole.Admin, UserRole.Editor, UserRole.Guest]
            }
            ,
            params: {
                Type: null,
            }
        })
        .state("admin.donation-details", {
            url: '/donation-details',
            templateUrl: '/Scripts/OvadiaApp/Admin/donation/donation-details/donation-details.html',
            controller: 'donationDetailsCtrl',
            data: {
                access: [UserRole.Admin, UserRole.Editor, UserRole.Guest]
            }
        })
        .state("map", {
            url: '/map',
            templateUrl: '/Scripts/OvadiaApp/mapa-component/mapa-component.html',
            controller: 'mapaComponentCtrl',
            data: {
                access: [UserRole.Admin, UserRole.Editor, UserRole.Guest]
            }
        })
        .state("image-gallery", {
            url: '/image-gallery',
            templateUrl: '/Scripts/OvadiaApp/image-gallery/image-gallery.html',
            controller: 'imageGalleryCtrl',
            data: {
                access: [UserRole.Admin, UserRole.Editor, UserRole.Guest]
            }
        })
        .state("tfilot", {
            url: '/tfilot',
            templateUrl: '/Scripts/OvadiaApp/tfila-time-container/tfila-time-container.html',
            controller: 'tfilaTimeContainerCtrl',
            data: {
                access: [UserRole.Admin, UserRole.Editor, UserRole.Guest]
            }
        })
        .state("all-lesson", {
            url: '/all-lesson',
            templateUrl: '/Scripts/OvadiaApp/all-lesson-component/all-lesson-component.html',
            controller: 'allLessonComponentCtrl',
            data: {
                access: [UserRole.Admin, UserRole.Editor, UserRole.Guest]
            }
        })
        .state("recommendation", {
            url: '/recommendation',
            templateUrl: '/Scripts/OvadiaApp/recommen-component/recommen-component.html',
            controller: 'recommenComponentCtrl',
            data: {
                access: [UserRole.Admin, UserRole.Editor, UserRole.Guest]
            }
        })

        /* Admin */
        .state("admin.lesson", {
            url: '/lesson',
            templateUrl: '/Scripts/OvadiaApp/Admin/lesson-admin/lesson-admin.html',
            controller: 'lessonAdminCtrl',
            data: {
                access: [UserRole.Admin, UserRole.Editor]
            }
        })
        .state("admin.donation-home", {
            url: '/donation-home',
            templateUrl: '/Scripts/OvadiaApp/Admin/donation/donation-home/donation-home.html',
            controller: 'donationHomeCtrl',
            data: {
                access: [UserRole.Admin, UserRole.Editor]
            }
        })
        .state("admin.home-movies", {
            url: '/home-movies',
            templateUrl: '/Scripts/OvadiaApp/Admin/Movies/home-movies/home-movies.html',
            controller: 'homeMoviesCtrl',
            data: {
                access: [UserRole.Admin, UserRole.Editor]
            }
        })
        .state("admin.upload", {
            url: '/upload',
            templateUrl: '/Scripts/OvadiaApp/Admin/ng-file-model/ng-file-model.html',
            controller: 'ImagesCntrl',
            data: {
                access: [UserRole.Admin, UserRole.Editor]
            }
        })
        .state("admin.uploadRecomm", {
            url: '/uploadRecomm',
            templateUrl: '/Scripts/OvadiaApp/Admin/upload-recom/upload-recom.html',
            controller: 'ImagesRecommCntrl',
            data: {
                access: [UserRole.Admin, UserRole.Editor]
            }
        })
        .state("admin.categories", {
            url: '/categories',
            templateUrl: '/Scripts/OvadiaApp/Admin/category-admin/category-admin.html',
            controller: 'CategoryAdminCtrl',
            data: {
                access: [UserRole.Admin, UserRole.Editor]
            }
        })
        .state("admin.add-movie", {
            url: '/add-movie',
            templateUrl: '/Scripts/OvadiaApp/Admin/Movies/add-movie/add-movie.html',
            controller: 'addMovieCtrl',
            data: {
                access: [UserRole.Admin, UserRole.Editor],
            },
            params: {
                articleId: null,
                category: null
            }
        })
        .state("admin.edit-movies", {
            url: '/add-movies',
            templateUrl: '/Scripts/OvadiaApp/Admin/Movies/edit-movies/edit-movies.html',
            controller: 'editMoviesCtrl',
            data: {
                access: [UserRole.Admin, UserRole.Editor],
            },
            params: {
                category: null
            }
        })
        .state("admin.sendmail", {
            url: '/sendmail',
            templateUrl: '/Scripts/OvadiaApp/Admin/send-mail/send-mail.html',
            controller: 'sendMailCtrl',
            data: {
                access: [UserRole.Admin, UserRole.Editor]
            }
        })
        .state("admin.carusel", {
            url: '/carusel',
            templateUrl: '/Scripts/OvadiaApp/Admin/carusel-admin/carusel-admin.html',
            controller: 'caruselAdminCtrl',
            data: {
                access: [UserRole.Admin, UserRole.Editor]
            }
        })
        .state("admin.tfila", {
            url: '/tfila',
            templateUrl: '/Scripts/OvadiaApp/Admin/tfila-time/tfila-time.html',
            controller: 'tfilaTimeCtrl',
            data: {
                access: [UserRole.Admin, UserRole.Editor]
            }
        })
        .state("admin.odot", {
            url: '/odot-admin',
            templateUrl: '/Scripts/OvadiaApp/admin/odot-admin/odot-admin.html',
            controller: 'odotAdminCtrl',
            data: {
                access: [UserRole.Admin, UserRole.Editor]
            }
        })
        .state("admin.comment-info", {
            url: '/comment-info',
            templateUrl: '/Scripts/OvadiaApp/Admin/comment-info/comment-info.html',
            controller: 'commentInfoCtrl',
            data: {
                access: [UserRole.Admin, UserRole.Editor]
            }
        })

        .state("admin.add-recommen", {
            url: '/add-recommen',
            templateUrl: '/Scripts/OvadiaApp/Admin/recommen/add-recommen/add-recommen.html',
            controller: 'addRecommenCtrl',
            data: {
                access: [UserRole.Admin, UserRole.Editor]
            },
            params: {
                Recomm: null
            }
        })
        .state("admin.edit-recommen", {
            url: '/edit-recommen',
            templateUrl: '/Scripts/OvadiaApp/Admin/recommen/edit-recommen/edit-recommen.html',
            controller: 'editRecommenCtrl',
            data: {
                access: [UserRole.Admin, UserRole.Editor]
            }
        })
      .state("admin.home-recommen", {
          url: '/home-recommen',
          templateUrl: '/Scripts/OvadiaApp/Admin/recommen/home-recommen/home-recommen.html',
          controller: 'homeRecommCtrl',
        data: {
            access: [UserRole.Admin, UserRole.Editor]
        }
    });


    

    ngClipProvider.setPath("/Scripts/plugins/ZeroClipboard.swf");
    $locationProvider.hashPrefix('');
    $locationProvider.html5Mode(true);
    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        'https://www.youtube.com/**'
    ]);
})

    .constant('AUTH_EVENTS', {
        Auto: 'Auto',
        NotAuto: 'NotAuto'
    })
    .constant('UserRole', {
        Admin: 'Admin',
        Editor: 'Editor',
        Guest: 'Guest'
    })
    .constant('UserAccount', {
        Role: 'Guest',
        User: '',
        SessionId: ''
        //NotAuto: 'NotAuto'
    })
   
    .run(function ($rootScope, UserRole, AUTH_EVENTS, UserAccount, $state, $cookies,appServices) {
        $rootScope.$on('$stateChangeStart', function (event, next) {
            var UserAutho = next.data.access;

            if (UserAutho.indexOf(UserAccount.Role) >= 0) {
                $rootScope.$broadcast(AUTH_EVENTS.Auto);
            }
            else {
                event.preventDefault();
                $state.go('login');

            }

        })
    })

