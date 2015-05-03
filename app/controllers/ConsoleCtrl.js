(function ()
{
    'use strict';
    angular.module('app').controller('ConsoleCtrl', function ($scope, $routeParams, $location, ChapterList)
    {

        var chapterId = $routeParams.id;
        var chapter = ChapterList.list[chapterId];
        var prevId = chapterId - 1;
        var prevChapter = ChapterList.list[prevId];

        $scope.chapterId = chapterId;
        $scope.fileStructure = ChapterList.list[chapterId].files;
        $scope.theory = ChapterList.list[chapterId].theory;
        $scope.exercise = ChapterList.list[chapterId].exercise;
        $scope.message = ChapterList.list[chapterId].message;
        if (chapter.hasOwnProperty('add')) {
            $scope.fileToAdd = ChapterList.list[chapterId].add.file;
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
                $scope.$broadcast('terminal-output', $scope.terminalOutputs);
                $scope.$apply();
            }
        }, 100);

        var isCommandCorrect = function (consoleInput)
        {
            if (consoleInput === chapter.command.git) {
                $scope.session.push({command: consoleInput, text: [chapter.command.output]});
                chapterId++;
                $location.path('/chapter/' + chapterId);

            } else {
                $scope.session.push({command: consoleInput, text: [consoleInput + ' -  you provided invalid command!']});
                console.log('er');
            }
        };

        $scope.$on('terminal-input', function (event, consoleInput)
        {
            consoleInput = consoleInput.trim();
            if (!chapter.hasOwnProperty('add')) {
                isCommandCorrect(consoleInput);

            } else {
                if (chapter.add.displayed) {
                    isCommandCorrect(consoleInput);
                } else {
                    $scope.session.push({command: consoleInput, text: ['NOT ADD FILE']});

                }
            }
        });
    });
})();

