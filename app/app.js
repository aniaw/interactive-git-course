'use strict';
// modules
angular.module('ng-terminal', []);

// app
var app = angular.module('app', ['ngRoute', 'ng-terminal']);
app.config(function ($routeProvider)
{
    $routeProvider.when('/', {
        controller: 'AppCtrl', templateUrl: 'start.html'
    });
});

app.controller('AppCtrl', function ()
{

});
app.factory('CommandList', function ()
{
    var commands = {};
    commands.list = [{
        command: 'git status', description: 'opis do git status', output: 'zwracam status'
    }, {
        command: 'git init', description: 'opis do git init', output: 'zwracam git init'
    }];
    return commands;

});

app.controller('ConsoleController', function ($scope,CommandList)
{
    //init message
    //setTimeout(function ()
    //{
    //    $scope.$broadcast('terminal-output', {
    //        output: true, text: ['Welcome to git-tutorial!', 'Please type "help" to open a list of commands'], breakLine: true
    //    });
    //    $scope.$apply();
    //}, 100);

    $scope.session = {
        commands: [], output: []
    };

    $scope.$watchCollection(function ()
    {
        return $scope.session.output;
    }, function (currentValue)
    {
        for (var i = 0; i < currentValue.length; i++) {
            $scope.$broadcast('terminal-output', currentValue[i]);
        }
        $scope.session.output.splice(0, $scope.session.output.length);
        $scope.$$phase || $scope.$apply();
    });

    $scope.$on('terminal-input', function (e, consoleInput)
    {
        var tmp = {
            commands: [], output: []
        };
        try {
            var commands = CommandList.list;
            angular.forEach(commands, function (key, value)
            {
                if (consoleInput === key.command) {
                    tmp.output.push({output: true, text: [key.output], breakLine: false});
                }
            });
            angular.extend($scope.session, tmp);


        } catch (err) {
            $scope.session.output.push({output: true, breakLine: true, text: [err.message]});
        }
    });

});

