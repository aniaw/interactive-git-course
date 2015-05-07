function DialogCtrl($scope, $mdDialog)
{
    'use strict';
    $scope.hide = function ()
    {
        $mdDialog.hide();
    };
    $scope.cancel = function ()
    {
        $mdDialog.cancel();
    };
    $scope.answer = function (answer)
    {
        $mdDialog.hide(answer);
    };
}
