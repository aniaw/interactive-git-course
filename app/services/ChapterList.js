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
                message: 'Katalog **git-project** nie zawiera żadnych śledzonych lub zmodyfikowanych plików.\n\nGit nie widzi także żadnych plików nieśledzonych, w przeciwnym wypadku wyświetliłby ich listę.',
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
                id: 7,
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
                id: 8,
                command: {
                    git: 'git commit -m "initial commit"',
                    output: '<p>[master (root-commit) 0fbc7a6] initial commit </p>   <p> 2 files changed, 17 insertions(+) </p>  <p> create mode 100644 app.js </p>                <p> create mode 100644 index.html </p>'

                },
                files: [{
                    name: 'index.html', folder: false, color: {text: 'blue', file: 'black'}

                }, {name: 'app.js', folder: false, color: {text: 'blue', file: 'black'}}],
                theory: '```git commit -m "opis commita"``` - aktualny stan **plików śledzonych** zostaje zapisany i opatrzony komentarzem.',
                exercise: 'Zapisz zmiany z katalogu **git-project** wraz z komentarzem o treści ***initial commit***',
                message: 'Oba pliki oznaczone są jako ```tracked```'

            },
            {
                id: 9,
                command: {
                    git: 'git status', output: '<p>On branch master</p> <p>nothing to commit, working directory clean</p>'
                },
                files: [{
                    name: 'index.html', folder: false, color: {text: 'black', file: 'black'}

                }, {name: 'app.js', folder: false, color: {text: 'black', file: 'black'}}],
                theory: 'Informacje otrzymane po wykonaniu commita to: \n\n* gałąź (branch) do której dodane zostały zmiany (**master**) \n\n* suma kontrolną SHA-1 (**0fbc7a6**), \n\n* ilość zmienionych plików (**2 files changed**) \n\n* statystyki dodanych i usuniętych linii kodu(**17 insertions(+)**)',
                exercise: 'Pliki **index.html** oraz **app.js** zmieniły kolor. Sprawdź status zmian.',
                message: 'Brawo! Właśnie wykonałeś swojego pierwszego commita!'

            },
            {
                id: 10,
                command: {
                    git: 'git branch', output: '<p style="color: green">* master</p>'
                },
                files: [{
                    name: 'index.html', folder: false, color: {text: 'black', file: 'black'}

                }, {name: 'app.js', folder: false, color: {text: 'black', file: 'black'}}],
                theory: 'Według konwencji, lokalny aktualny katalog roboczy nazywany jest **master**. To nazwa gałęzi (**brancha**), którą git tworzy podczas inicjalizacji repozytorium.\n\nPolecenie ```git branch``` wyświetla listę gałęzi występujących w projekcie.',
                exercise: 'Sprawdź jakie **gałęzie** znajdują się w projekcie',
                message: 'Posiadasz czysty katalog roboczy - nie zawiera on śledzonych ani zmodyfikowanych plików.'

            },
            {
                id: 11,
                command: {
                    git: 'git branch develop', output: ''
                },
                files: [{
                    name: 'index.html', folder: false, color: {text: 'black', file: 'black'}

                }, {name: 'app.js', folder: false, color: {text: 'black', file: 'black'}}],
                theory: 'Polecenie ```git branch nazwa_nowego_brancha``` tworzy nowe **odgałęzienie** na aktualnym branchu (w tym przykładzie gałęzi **master**)',
                exercise: 'Utwórz nową gałąź o nazwie **develop**',
                message: 'Aktualnie w projekcie istnieje tylko gałąź **master**.'

            },
            {
                id: 12,
                command: {
                    git: 'git branch', output: '<span>develop</span></br>* <span style="color: green"> master</span>'
                },
                files: [{
                    name: 'index.html', folder: false, color: {text: 'black', file: 'black'}

                }, {name: 'app.js', folder: false, color: {text: 'black', file: 'black'}}],
                theory: '',
                exercise: 'Ponownie sprawdź jakie **branche** znajdują się obecnie w projekcie',
                message: ''

            },
            {
                id: 13,
                command: {
                    git: 'git checkout develop', output: 'switched to branch \'develop\''
                },
                files: [{
                    name: 'index.html', folder: false, color: {text: 'black', file: 'black'}

                }, {name: 'app.js', folder: false, color: {text: 'black', file: 'black'}}],
                theory: 'Polecenie ```git branch nazwa_brancha```  tworzy nową gałąź, ale nie przełącza się na nią automatycznie.\n\nPolecenie ```git checkout nazwa_brancha``` służy m.in do przełączenia się między branchami',
                exercise: 'Przełącz się na branch **develop**',
                message: 'Na liście branchy pojawił się nowoutworzony branch **develop**. '

            },
            {
                id: 14,
                command: {
                    git: 'git branch', output: '* <span style="color: green">develop</span></br> master</span>'
                },
                files: [{
                    name: 'index.html', folder: false, color: {text: 'black', file: 'black'}

                }, {name: 'app.js', folder: false, color: {text: 'black', file: 'black'}}],
                theory: '',
                exercise: 'Sprawdź listę **branchy**, aby upewnić się na gdzie się znajdujesz.',
                message: ''


            },
            {
                id: 15,
                command: {
                    git: 'git status',
                    output: '<p>On branch develop</p>\n<p>Changes not staged for commit:</p>\n<p>  (use "git add < file>..." to update what will be committed)</p>\n<p>  (use "git checkout -- < file>..." to discard changes in working directory)</p>\n<br/>\n<p style="color: green">        modified:   index.html</p>\n<br/>\n<p>no changes added to commit (use "git add" and/or "git commit -a")</p>\n'
                },
                files: [{
                    name: 'index.html', folder: false, color: {text: 'black', file: 'black'}

                }, {name: 'app.js', folder: false, color: {text: 'black', file: 'black'}}],
                theory: '',
                exercise: 'Poniżej przedstawiono zawartość pliku **index.html**, zmodyfikuj go a następnie sprawdź czy zmiany zostały wykryte.',
                message: 'Znajdujesz się obecnie na branchu **develop**.',
                add: {
                    file: {
                        name: 'index.html', folder: false, color: {text: 'red', file: 'black'}
                    },
                    displayed: false,
                    code: '<!DOCTYPE html>\n<html>\n<head lang="en">\n<meta charset="UTF-8">\n<title></title>\n</head>\n<body>\n</body>\n</html>',
                    replace: '<!DOCTYPE html>\n<html>\n<head lang="en">\n<meta charset="UTF-8">\n<title>Exercise</title>\n</head>\n<body>\n</body>\n</html>'

                }
            },
            {
                id: 16,
                command: {
                    git: 'git add index.html', output: ''
                },
                files: [{
                    name: 'index.html', folder: false, color: {text: 'red', file: 'black'}

                }, {name: 'app.js', folder: false, color: {text: 'black', file: 'black'}}],
                theory: '',
                exercise: 'Wykorzystaj zdobytą wiedzę aby zacommitować zmiany na branchu **develop** z opisem ***update index.html***. Nie zapomnij o tym, aby najpierw rozpocząć śledzenie pliku. ',
                message: 'Plik **index.html** został oznaczony jako zmodyfikowany.'

            },
            {
                id: 17,
                command: {
                    git: 'git commit -m "update index.html"', output: '<p>[develop 1ff6a36] update index.html</p>\n<p> 1 file changed, 1 insertion(+), 1 deletion(-)</p>'
                },
                files: [{
                    name: 'index.html', folder: false, color: {text: 'blue', file: 'black'}

                }, {name: 'app.js', folder: false, color: {text: 'black', file: 'black'}}],
                theory: '',
                exercise: 'Wykorzystaj zdobytą wiedzę aby zacommitować zmiany na branchu **develop** z opisem ***update index.html***. Nie zapomnij o tym, aby najpierw rozpocząć śledzenie pliku. ',
                message: 'Plik **index.html** jest śledzony.'

            },{
                id: 18,
                command: {
                    git: 'git diff', output: ''
                },
                files: [{
                    name: 'index.html', folder: false, color: {text: 'black', file: 'black'}

                }, {name: 'app.js', folder: false, color: {text: 'black', file: 'black'}}],
                theory: '',
                exercise: '',
                message: ''

            }];

        return chapters;

    });

})();
