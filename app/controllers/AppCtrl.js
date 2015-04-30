(function ()
{
    'use strict';

    angular.module('app').controller('AppCtrl', function ($scope)
    {
        $scope.session = {
            commands: [], output: []
        };

        $scope.$watch('session', function (newVal, oldVal)
        {
            //console.log(newVal);
        }, true);


    });


})();
