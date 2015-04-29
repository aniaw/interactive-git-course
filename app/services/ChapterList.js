(function ()
{
    'use strict';

    angular.module('app').factory('ChapterList', function ()
    {
        var chapters = {};
        chapters.list = [{
            command: {
                git: 'git init', description: 'opis do git init', output: 'Initialized empty Git repository in git-project/.git/', breakLine: true
            },
            files: [],
            theory: '* **repozytorium** - struktura danych zawierająca historię projektu (zawartość katalogu **.git**). \n* polecenie ```git init``` inicjalizuje puste repozytorium (lokalne) w podkatalogu **.git** (bieżący katalog staje się katalogiem roboczym)',
            exercise: 'Znajdujesz się w katalogu **git-project**.\n Zainicjalizuj nowe repozytorium.',
            message: '**Wiadomość**'
        },
            {
                command: {
                    git: 'git status',
                    description: 'opis do git status',
                    output: 'On branch master \n Initial commit \n nothing to commit \n(create/copy files and use "git add" to track)',
                    breakLine: true
                },
                files: [{name: '.git', folder: true, color: ''}],
                theory: 'Polecenie ```git status``` sprawdza czy nastapily **zmiany lokalne**. Jeżeli tak, wystosowany zostanie odpowiedni komunikat.',
                exercise: 'Sprawdź czy w folderze **git-project** nastąpiły zmiany.',
                message: ''
            },
            {
                command: {
                    git: 'git status', description: 'opis do git status', output: 'On branch master \n Initial commit \n nothing to commit', breakLine: true
                },
                files: [{name: '.git', folder: true, color: ''}],
                theory: [],
                exercise: 'Polecenie 3',
                message: ''
            }];


        return chapters;

    });

})();
