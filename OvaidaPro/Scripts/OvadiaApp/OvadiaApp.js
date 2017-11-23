var OvadiaApp = angular.module('OvadiaApp',
    [
        // 'ngRoute',
        'ui.router',
        'textAngular',
        'ngFileUpload',
        'ngClipboard',
        'ngDialog',
        'ngCookies',
        'ngAnimate',
        'thatisuday.ng-image-gallery',
        'ui.bootstrap.carousel',
        'ngTagsInput',
        'ui.select2',
        'angularUtils.directives.dirPagination',
        'ui.scroll'
    ]
)

    .run(["UserAccount", function (UserAccount) {
        if (User != null && User.Role != ""){ 
            UserAccount.User = User;
            UserAccount.Role = User.Role;
        }
    }]);

