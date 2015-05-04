(function ()
{
    'use strict';

    angular.module('app').factory('ChapterList', function ()
    {
        var chapters = {};
        chapters.list = [{
            id: 0,
            command: {
                git: 'git init', output: '<p>Initialized empty Git repository in git-project/.git/</p>'
            },
            files: [],
            theory: '**Repozytorium** to struktura danych zawierająca historię projektu (zawartość katalogu **.git**). \n\n Polecenie ```git init``` inicjalizuje puste repozytorium (lokalne) w podkatalogu **.git** (bieżący katalog staje się katalogiem roboczym)',
            exercise: 'Znajdujesz się w katalogu **git-project**.\n Zainicjalizuj nowe repozytorium.',
            message: 'Postępuj zgodnie z poleceniami aby przejść do następnego poziomu.'
        },
            {
                id: 1,
                command: {
                    git: 'git status', output: '<p>On branch master</p><p>Initial commit</p> nothing to commit (create/copy files and use "git add" to track)'
                },
                files: [],
                theory: 'Polecenie ```git status``` sprawdza czy wystąpiły **zmiany lokalne** - jeżeli tak, zostanie wyświetlony odpowiedni komunikat.',
                exercise: 'Sprawdź czy w folderze **git-project** nastąpiły zmiany.',
                message: 'Udało Ci się zainicjalizować nowe repozytorium. W strukturze projektu pojawił się nowy folder **.git** '
            },
            {
                id: 2,
                command: {
                    git: 'git status',
                    output: '<p>On branch master</p>\n<p>Initial commit</p> \n<p>Untracked files:</p>\n<p>(use "git add < file>..." to include in what will be committed)</p> \n<p style="color: red">index.html</p> \n<p>nothing added to commit but untracked files present (use "git add" to track)</p>'
                },
                files: [],
                theory: '',
                exercise: 'Dodaj do projektu plik **index.html** a następnie sprawdź czy zostały wykryte zmiany w folderze **git-project**.',
                message: 'Katalog **git-project** nie zawiera żadnych śledzonych lub zmodyfikowanych plików. Git nie widzi także żadnych plików nieśledzonych, w przeciwnym wypadku wyświetliłby ich listę.',
                add: {file: {name: 'index.html', folder: false, color: {text: 'red', file: 'black'}}, displayed: false}
            },
            {
                id: 3,
                command: {
                    git: 'git add index.html', output: ''
                },
                files: [{
                    name: 'index.html', folder: false, color: {text: 'red', file: 'black'}
                }],
                theory: 'Każdy plik w katalogu który poddany jest kontroli wersji może być śledzony(```tracked```) lub nieśledzony(```untracked```)\n\nPliki nieśledzone - czyli takie, które **nie zostały poddane kontroli wersji**, oznaczone są kolorem czerwonym.\n\n Aby rozpocząć śledzenie nowego pliku, użyj polecenia ```git add nazwa_pliku``` ',
                exercise: 'Rozpocznij śledzenie pliku **index.html**',
                message: 'Do projektu został dodany plik **index.html**. '
            },
            {
                id: 4,
                command: {
                    git: 'git status',
                    output: '<p>On branch master</p> <p>Initial commit</p> <p>Changes to be committed:<p> <p>  (use "git rm --cached <file>..." to unstage)<p>\n\n<p style="color: green">        new file:   index.html<p>'

                },
                files: [{
                    name: 'index.html', folder: false, color: {text: 'blue', file: 'black'}
                }],
                theory: '',
                exercise: 'Sprawdź czy plik **index.html** został oznaczony jako śledzony',
                message: ''
            },
            {
                id: 5,
                command: {
                    git: 'git status',
                    output: '<p>On branch master</p>\n<p>Initial commit</p>\n<p>Changes to be committed:<p>\n<p> (use "git rm --cached   < file>..." to unstage)<p>\n<p style="color: green"> new file: index.html</p>\n\n<p>Untracked files:</p>\n<p> (use "git add < file>..." to include in what will be committed)</p>\n<p style="color: red">      app.js</p>\n\n\n'

                },
                files: [{
                    name: 'index.html', folder: false, color: {text: 'blue', file: 'black'}
                }],
                theory: '',
                exercise: 'Dodaj plik **app.js** do projektu a następnie sprawdź jakie zmiany zostały wykryte.',
                message: 'Plik **index.html** jest oznaczony jako śledzony.',
                add: {file: {name: 'app.js', folder: false, color: {text: 'red', file: 'black'}}, displayed: false}

            },
            {
                id: 6,
                command: {
                    git: 'git add app.js', output: ''

                },
                files: [{
                    name: 'index.html', folder: false, color: {text: 'blue', file: 'black'}

                }, {name: 'app.js', folder: false, color: {text: 'red', file: 'black'}}],
                theory: '',
                exercise: 'Rozpocznij śledzenie pliku **app.js** a następnie sprawdź staus zmian.',
                message: 'Plik **index.html** oznaczony jest jako ```tracked``` natomiast **app.js** jako ```untracked```'

            },
            {
                id: 6,
                command: {
                    git: 'git status',
                    output: '<p>On branch master</p>\n<p>Initial commit</p>\n<p>Changes to be committed:<p>\n<p> (use "git rm --cached   < file>..." to unstage)<p>\n<p style="color: green"> new file: app.js</p>\n<p style="color: green"> new file: index.html</p>\n\n\n'


                },
                files: [{
                    name: 'index.html', folder: false, color: {text: 'blue', file: 'black'}

                }, {name: 'app.js', folder: false, color: {text: 'blue', file: 'black'}}],
                theory: '',
                exercise: 'Rozpocznij śledzenie pliku **app.js** a następnie sprawdź staus zmian.',
                message: ''

            },
            {
                id: 7,
                command: {
                    git: 'git commit -m "initial commit"',
                    output: '<p>[master (root-commit) 0fbc7a6] initial commit </p>   <p> 2 files changed, 17 insertions(+) </p>  <p> create mode 100644 app.js </p>                <p> create mode 100644 index.html </p>'

                },
                files: [{
                    name: 'index.html', folder: false, color: {text: 'blue', file: 'black'}

                }, {name: 'app.js', folder: false, color: {text: 'blue', file: 'black'}}],
                theory: '```git commit -m "opis commita"``` - aktualny stan **plików śledzonych** zostaje zapisany i opatrzony komentarzem. \n\n ```git commit -m "add file"``` \n\n zapisuje aktualne zmiany, opatrując je komentarzem **add file**',
                exercise: 'Zapisz zmiany z katalogu **git-project** wraz z komentarzem o treści **initial commit**',
                message: 'Oba pliki oznaczone są jako ```tracked```'

            },
            {
                id: 8,
                command: {
                    git: 'git status', output: '<p>On branch master</p> <p>nothing to commit, working directory clean</p>'
                },
                files: [{
                    name: 'index.html', folder: false, color: {text: 'black', file: 'black'}

                }, {name: 'app.js', folder: false, color: {text: 'black', file: 'black'}}],
                theory: '',
                exercise: '',
                message: ''

            },
            {
                id: 9,
                command: {
                    git: '', output: ''
                },
                files: [{
                    name: 'index.html', folder: false, color: {text: 'black', file: 'black'}

                }, {name: 'app.js', folder: false, color: {text: 'black', file: 'black'}}],
                theory: '',
                exercise: '',
                message: ''

            },
            {}];

        return chapters;

    });

})();
