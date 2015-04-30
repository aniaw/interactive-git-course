(function ()
{
    'use strict';

    angular.module('app').factory('ChapterList', function ()
    {
        var chapters = {};
        chapters.list = [{
            command: {
                git: 'git init', description: 'opis do git init', output: '<p>Initialized empty Git repository in git-project/.git/</p>'
            },
            files: [],
            theory: '**Repozytorium** to struktura danych zawierająca historię projektu (zawartość katalogu **.git**). \n\n Polecenie ```git init``` inicjalizuje puste repozytorium (lokalne) w podkatalogu **.git** (bieżący katalog staje się katalogiem roboczym)',
            exercise: 'Znajdujesz się w katalogu **git-project**.\n Zainicjalizuj nowe repozytorium.',
            message: '**Wiadomość**'
        },
            {
                command: {
                    git: 'git status',
                    description: 'opis do git status',
                    output: '<p>On branch master</p><p>Initial commit</p> nothing to commit (create/copy files and use "git add" to track)'
                },
                files: [{name: '.git', folder: true, color: {text: 'grey', file: 'grey'}}],
                theory: 'Polecenie ```git status``` sprawdza czy nastapily **zmiany lokalne** - jeżeli tak, wystosowany zostanie odpowiedni komunikat.',
                exercise: 'Sprawdź czy w folderze **git-project** nastąpiły zmiany.',
                message: ''
            },
            {
                command: {
                    git: 'git status',
                    description: '',
                    output: '<span>On branch master</span>\n<p>Initial commit</p> \n<p>Untracked files:</p>\n<p>(use "git add < file>..." to include in what will be committed)</p> \n<p style="color: red">index.html</p> \n<p>nothing added to commit but untracked files present (use "git add" to track)</p>'
                },
                files: [{name: '.git', folder: true, color: {text: 'grey', file: 'grey'}}],
                theory: 'Polecenie ```git status``` sprawdza czy nastapily **zmiany lokalne** - jeżeli tak, wystosowany zostanie odpowiedni komunikat.',
                exercise: 'Dodaj plik **index.html** do projektu a następnie sprawdź czy wykryte zostały lokalne zmiany w folderze **git-project**.',
                message: '',
                add: {file: {name: 'index.html', folder: false, color: {text: 'red', file: 'black'}}, displayed: false}
            },
            {
                command: {
                    git: 'git add index.html',
                    description: '',
                    output: '<span>On branch master</span>\n<p>Initial commit</p> \n<p>Untracked files:</p>\n<p>(use "git add < file>..." to include in what will be committed)</p> \n<p style="color: red">index.html</p> \n<p>nothing added to commit but untracked files present (use "git add" to track)</p>'
                },
                files: [{
                    name: '.git',
                    folder: true,
                    color: {text: 'grey', file: 'grey'}
                },
                    {
                        name: 'index.html',
                        folder: false,
                        color: {text: 'red', file: 'black'}
                    }],
                theory: '.',
                exercise: 'Dodaj plik **index.html** do projektu a następnie sprawdź czy wykryte zostały lokalne zmiany w folderze **git-project**.',
                message: ''
            },
            {}];

        return chapters;

    });

})();
