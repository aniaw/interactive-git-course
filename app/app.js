'use strict';

var app = angular.module('app', ['ngRoute', 'ng-terminal', 'hc.marked']);
app.config(function ($routeProvider)
{
    $routeProvider.when('/', {
        controller: 'AppCtrl', templateUrl: 'start.html'
    });

    $routeProvider.when('/chapter/:id', {
        controller: 'ConsoleCtrl', templateUrl: 'terminal.html'
    });

    $routeProvider.otherwise({
        redirectTo: '/'
    });

});

app.factory('ChapterList', function ()
{
    var chapters = {};
    chapters.list = [{
        command: {git: 'git init', description: 'opis do git init', output: 'Initialized empty Git repository in git-project/.git/', breakLine: true},
        files: [],
        theory: '* **repozytorium** - struktura danych zawierająca historię projektu (zawartość katalogu **.git**). \n* polecenie ```git init``` inicjalizuje puste repozytorium (lokalne) w podkatalogu **.git** (bieżący katalog staje się katalogiem roboczym)',
        exercise: 'Znajdujesz się w katalogu ```git-project```.\n Zainicjalizuj nowe repozytorium.'
    },
        {
            command: {git: 'git status', description: 'opis do git status', output: 'On branch master \n Initial commit \n nothing to commit', breakLine: true},
            files: [{name: '.git', folder: true, color: ''}],
            theory: 'Polecenie ```git status``` sprawdza czy nastapily **zmiany lokalne**. Jeżeli tak zostanie wystosowany zostanie odpowiedni komunikat.',
            exercise: ''
        },
        {
            command: {git: 'git status', description: 'opis do git status', output: 'On branch master \n Initial commit \n nothing to commit', breakLine: true},
            files: [{name: '.git', folder: true, color: ''}],
            theory: [],
            exercise: 'Polecenie 3'
        }];


    return chapters;

});

app.controller('AppCtrl', function ($scope)
{
    $scope.session = {
        commands: [], output: []
    };

});


app.controller('ConsoleCtrl', function ($scope, $routeParams, $location, ChapterList)
{

    var chapterId = $routeParams.id;
    var prevId = chapterId - 1;

    var prevChapter = ChapterList.list[prevId];

    $scope.fileStructure = ChapterList.list[chapterId].files;
    console.log($scope.fileStructure);
    $scope.theory = ChapterList.list[chapterId].theory;
    $scope.exercise = ChapterList.list[chapterId].exercise;

    setTimeout(function ()
    {
        if (prevId >= 0) {
            $scope.$broadcast('terminal-output', {
                output: true, text: [prevChapter.command.output], breakLine: prevChapter.command.breakLine
            });
            $scope.$apply();
        }
    }, 100);

    $scope.$on('terminal-input', function (event, consoleInput)
    {

        var chapter = ChapterList.list[chapterId];
        if (consoleInput === chapter.command.git) {
            chapterId++;
            $location.path('/chapter/' + chapterId);

        } else {
            console.log('er');
            //$scope.session.output.push({output: true, breakLine: true, text: [err.message]});
        }

    });


});

