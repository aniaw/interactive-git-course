(function ()
{
    'use strict';
    angular.module('app').controller('NavCtrl', function ($scope, $routeParams, $location, ChapterList)
    {

        $scope.$root.progress = -1;

        $scope.chapters = ChapterList.list;

        $scope.isPass = function (id)
        {
            return id > $scope.$root.progress;
        };

        $scope.goToChapter = function (id)
        {
            $location.path('/chapter/' + id);

        };

        $scope.isChecked = function (id)
        {
            var color = id === Number($routeParams.id) ? 'black' : 'white';
            return {color: color};
        };

    });

})();

