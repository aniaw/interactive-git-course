(function ()
{
    'use strict';
    angular.module('app').controller('ConsoleCtrl', function ($scope, $routeParams, $location, ChapterList)
    {
        var chapterId = $routeParams.id;
        var chapter = ChapterList.list[chapterId];
        var prevId = chapterId - 1;
        //var nextId = Number(chapterId) + 1;
        //var nextChapter = ChapterList.list[nextId];

        $scope.focus = true;
        $scope.chapters = ChapterList.list;
        $scope.chapterId = chapterId;
        $scope.fileStructure = ChapterList.list[chapterId].files;
        $scope.theory = ChapterList.list[chapterId].theory;
        $scope.exercise = ChapterList.list[chapterId].exercise;
        $scope.message = ChapterList.list[chapterId].message;

        if (chapter.hasOwnProperty('add')) {
            $scope.fileToAdd = ChapterList.list[chapterId].add.file;
        }
        $scope.addition = chapter.hasOwnProperty('add');


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
                //nextChapter.disabled = false;
                $location.path('/chapter/' + chapterId);

            } else {
                $scope.session.push({command: consoleInput, text: [consoleInput + ' -  you provided invalid command!']});
                console.log('er');
            }
        };

        $scope.goToChapter = function (id)
        {
            $location.path('/chapter/' + id);

        };
        $scope.isChecked = function (id)
        {
            var color = id === Number(chapterId) ? 'red' : 'black';
            return {color: color};

        };

        $scope.addFile = function (file)
        {
            chapter.files.push(file);
            chapter.add.displayed = true;
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

