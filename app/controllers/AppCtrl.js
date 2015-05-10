(function ()
{
    'use strict';

    angular.module('app').controller('AppCtrl', function ($scope, $mdDialog, $mdToast)
    {
        $scope.session = [];
        $scope.history = [];
        $scope.commandHistory = [];
        $scope.lan = true;
        $scope.$root.progress = 0;

        $scope.isPass = function (id) {
            return id > $scope.$root.progress;
        };

        $scope.$watch('session', function (newVal, oldVal)
        {
            $scope.terminalOutputs = newVal;
            if (newVal !== undefined) {
                $scope.$broadcast('terminal-output', newVal);
            }
        }, true);



        $scope.showAdvanced = function (ev)
        {
            $mdDialog.show({
                controller: DialogCtrl, templateUrl: 'views/templates/lifeCycle.html', targetEvent: ev
            });
        };

    });

})();
