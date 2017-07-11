OvadiaApp.config(function ($stateProvider, $locationProvider, ngClipProvider, UserRole) {
    $stateProvider
        .state("home", {
            url: '/',
            templateUrl: '/Scripts/OvadiaApp/home-component/home-component.html',
            controller: 'homeComponentCtrl',
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
        .state("profile", {
            url: '/profile',
            templateUrl: '/Scripts/OvadiaApp/profile-component/profile-component.html',
            controller: 'profileComponentCtrl',
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
        .state("admin.lesson", {
            url: '/lesson',
            templateUrl: '/Scripts/OvadiaApp/Admin/lesson-admin/lesson-admin.html',
            controller: 'lessonAdminCtrl',
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
        .state("admin.categories", {
            url: '/categories',
            templateUrl: '/Scripts/OvadiaApp/Admin/category-admin/category-admin.html',
            controller: 'CategoryAdminCtrl',
            data: {
                access: [UserRole.Admin, UserRole.Editor]
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
        });

    ngClipProvider.setPath("/Scripts/plugins/ZeroClipboard.swf");
    $locationProvider.hashPrefix('');
    $locationProvider.html5Mode(true);
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

