(function ()
{
    'use strict';
    angular.module('app').controller('ConsoleCtrl', function ($scope, $routeParams, $location, ChapterList)
    {
        var chapterId = $routeParams.id;
        var chapter = ChapterList.list[chapterId];
        var prevId = chapterId - 1;
        var prevChapter = ChapterList.list[prevId];

        $scope.fileStructure = ChapterList.list[chapterId].files;
        $scope.theory = ChapterList.list[chapterId].theory;
        $scope.exercise = ChapterList.list[chapterId].exercise;
        $scope.message = ChapterList.list[chapterId].message;

        setTimeout(function ()
        {
            if (prevId >= 0) {
                $scope.$broadcast('terminal-output', {
                    output: true, command: prevChapter.command.git, text: [prevChapter.command.output], breakLine: prevChapter.command.breakLine
                });
                $scope.$apply();
            }
        }, 100);

        $scope.$on('terminal-input', function (event, consoleInput)
        {
            if (consoleInput === chapter.command.git) {
                chapterId++;
                $location.path('/chapter/' + chapterId);

            } else {
                console.log('er');
                //$scope.session.output.push({output: true, breakLine: true, text: [err.message]});
            }
        });
    });
})();

