(function ()
{
    'use strict';

    angular.module('app').controller('AppCtrl', function ($scope, $location, $anchorScroll)
    {
        $scope.session = [];
        $scope.history = [];

        $scope.$watch('session', function (newVal, oldVal)
        {
            $scope.terminalOutputs = newVal;
            if (newVal !== undefined) {
                $scope.$broadcast('terminal-output', newVal);

            }
        }, true);


    });


})();
