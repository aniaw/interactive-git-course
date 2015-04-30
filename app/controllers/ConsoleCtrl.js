(function ()
{
    'use strict';
    angular.module('app').controller('ConsoleCtrl', function ($scope, $routeParams, $location, ChapterList)
    {
        $scope.chapterId = $routeParams.id;
        var chapter = ChapterList.list[$scope.chapterId];
        var prevId = $scope.chapterId - 1;
        var prevChapter = ChapterList.list[prevId];

        $scope.fileStructure = ChapterList.list[$scope.chapterId].files;
        $scope.theory = ChapterList.list[$scope.chapterId].theory;
        $scope.exercise = ChapterList.list[$scope.chapterId].exercise;
        $scope.message = ChapterList.list[$scope.chapterId].message;
        if (chapter.hasOwnProperty('add')) {
            $scope.fileToAdd = ChapterList.list[$scope.chapterId].add.file;
        }
        $scope.addition = chapter.hasOwnProperty('add');


        $scope.addFile = function (file)
        {
            chapter.files.push(file);
            chapter.add.displayed = true;
        };

        setTimeout(function ()
        {
            if (prevId >= 0) {
                $scope.$broadcast('terminal-output', {
                    output: true, command: prevChapter.command.git, text: [prevChapter.command.output]
                });
                $scope.$apply();
            }
        }, 100);

        $scope.$on('terminal-input', function (event, consoleInput)
        {
            if (!chapter.hasOwnProperty('add')) {
                if (consoleInput === chapter.command.git) {
                    $scope.chapterId++;
                    $location.path('/chapter/' + $scope.chapterId);

                } else {
                    console.log('er');
                    //$scope.session.output.push({output: true, text: [err.message]});
                }
            } else if (chapter.hasOwnProperty('add') && chapter.add.displayed) {
                if (consoleInput === chapter.command.git) {
                    $scope.chapterId++;
                    $location.path('/chapter/' + $scope.chapterId);

                } else {
                    console.log('er');
                    //$scope.session.output.push({output: true, text: [err.message]});
                }
            }
        });
    });
})();

