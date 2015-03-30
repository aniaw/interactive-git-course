(function ()
{
    'use strict';
    function ConsoleController($scope, CommandBroker, $rootScope)
    {
        $rootScope.theme = 'modern';

        setTimeout(function ()
        {
            $scope.$broadcast('terminal-output', {
                output: true, text: ['Welcome to git-tutorial!', 'Please type "help" to open a list of commands'], breakLine: true
            });
            $scope.$apply();
        }, 100);

        $scope.session = {
            commands: [], output: [], $scope: $scope
        };

        $scope.$watchCollection(function ()
        {
            return $scope.session.output;
        }, function (n)
        {
            for (var i = 0; i < n.length; i++) {
                $scope.$broadcast('terminal-output', n[i]);
            }
            $scope.session.output.splice(0, $scope.session.output.length);
            $scope.$$phase || $scope.$apply();
        });

        $scope.$on('terminal-input', function (e, consoleInput)
        {
            var cmd = consoleInput[0];
            try {
                if ($scope.session.context) {
                    $scope.session.context.execute($scope.session, cmd.command);
                } else {
                    CommandBroker.execute($scope.session, cmd.command);
                }
            } catch (err) {
                $scope.session.output.push({output: true, breakLine: true, text: [err.message]});
            }
        });

    }

    var module = angular.module('git-tutorial');
    module.controller('ConsoleController', ['$scope', 'CommandBroker', '$rootScope', ConsoleController]);
})();