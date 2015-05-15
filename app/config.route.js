(function ()
{
    'use strict';

    angular.module('app').config(function ($routeProvider)
    {
        $routeProvider.when('/', {
            controller: 'AppCtrl', templateUrl: 'views/start.html'
        });
        $routeProvider.when('/end', {
            controller: 'AppCtrl', templateUrl: 'views/end.html'
        });

        $routeProvider.when('/chapter/:id', {
            controller: 'ConsoleCtrl', templateUrl: 'views/terminal.html'
        });

        $routeProvider.otherwise({
            redirectTo: '/'
        });

    });
})();
