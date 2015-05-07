(function ()
{
    'use strict';

    angular.module('app').controller('AppCtrl', function ($scope, $mdDialog, $mdToast)
    {
        $scope.session = [];
        $scope.history = [];
        $scope.lan = true;

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

        //$scope.showCustomToast = function ()
        //{
        //    $mdToast.show({
        //        controller: 'ConsoleCtrl', templateUrl: 'views/templates/toast.html', hideDelay: 0, position: 'bottom left right'
        //    });
        //};

    });


})();
