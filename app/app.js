'use strict';

var app = angular.module('app', ['ngRoute', 'ng-terminal']);
app.config(function ($routeProvider)
{
    $routeProvider.when('/', {
        controller: 'AppCtrl', templateUrl: 'start.html'
    });

    $routeProvider.when('/chapter/:id', {
        controller: 'ConsoleCtrl', templateUrl: 'terminal.html'
    });

    $routeProvider.otherwise({
        redirectTo: '/'
    });

});
app.factory('CommandList', function ()
{
    var commands = {};
    commands.list = [{
        command: 'git init', description: 'opis do git init', output: 'zwracam git init', breakLine: true
    }, {
        command: 'git status', description: 'opis do git status', output: 'zwracam status'
    }];
    return commands;

});

app.controller('AppCtrl', function ()
{

});


app.controller('ConsoleCtrl', function ($scope, $routeParams, $location, CommandList)
{
    $scope.session = {
        commands: [], output: []
    };
    $scope.chapterId = $routeParams.id;

    $scope.$on('terminal-input', function (event, consoleInput)
    {
        var tmp = {
            commands: [], output: []
        };
        console.log(CommandList.list);
        try {
            var chapter = CommandList.list[$scope.chapterId];
            console.log(chapter);
            if (consoleInput === chapter.command) {
                tmp.output.push({output: true, text: [chapter.output], breakLine: chapter.breakLine});
                angular.extend($scope.session, tmp);
                $scope.chapterId++;
                $location.path('/chapter/' + $scope.chapterId);
            } else {
                console.log('error');
            }

        } catch (err) {
            $scope.session.output.push({output: true, breakLine: true, text: [err.message]});
        }
    });


    //$scope.$watchCollection(function ()
    //{
    //    return $scope.session.output;
    //}, function (currentValue)
    //{
    //    if (currentValue !== undefined) {
    //        $scope.$broadcast('terminal-output', currentValue[0]);
    //        $scope.$$phase || $scope.$apply();
    //
    //    }
    //});

});

