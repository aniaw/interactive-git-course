'use strict';
angular.module('commandFileSystem', ['commandTools'])

        .config(['commandBrokerProvider', function (commandBrokerProvider)
        {
            var pwdCommand = function ()
            {
                var me = {};
                var fs = null;
                me.command = 'pwd';
                me.description = ['Shows current directory.'];
                me.init = ['fileSystem', function (fileSystem)
                {
                    fs = fileSystem;
                }];
                me.handle = function (session)
                {
                    session.output.push({output: true, text: [fs.path()], breakLine: true});
                };
                return me;
            };
            commandBrokerProvider.appendCommandHandler(pwdCommand());

            var cdCommand = function ()
            {
                var me = {};
                var fs = null;
                me.command = 'cd';
                me.description = ['Changes directory.', 'Syntax: cd <path>', 'Example: cd myDirectory', 'Example: cd ..'];
                me.init = ['fileSystem', function (fileSystem)
                {
                    fs = fileSystem;
                }];
                me.handle = function (session, path)
                {
                    if (!path) {
                        throw new Error('A directory name is required');
                    }
                    session.commands.push({command: 'change-prompt', prompt: {path: fs.path(path)}});
                };
                return me;
            };
            commandBrokerProvider.appendCommandHandler(cdCommand());

            var mkdirCommand = function ()
            {
                var me = {};
                var fs = null;
                me.command = 'mkdir';
                me.description = ['Creates directory.', 'Syntax: mkdir <directoryName>', 'Example: mkdir myDirectory'];
                me.init = ['fileSystem', function (fileSystem)
                {
                    fs = fileSystem;
                }];
                me.handle = function (session, path)
                {
                    if (!path) {
                        throw new Error('A directory name is required');
                    }
                    fs.createDir(path);
                    session.output.push({output: true, text: ['Directory created.'], breakLine: true});
                };
                return me;
            };
            commandBrokerProvider.appendCommandHandler(mkdirCommand());

            var rmdirCommand = function ()
            {
                var me = {};
                var fs = null;
                me.command = 'rmdir';
                me.description = ['Removes directory.', 'Syntax: rmdir <directoryName>', 'Example: rmdir myDirectory'];
                me.init = ['fileSystem', function (fileSystem)
                {
                    fs = fileSystem;
                }];
                me.handle = function (session, path)
                {
                    if (!path) {
                        throw new Error('A directory name is required');
                    }
                    fs.removeDir(path);
                    session.output.push({output: true, text: ['Directory removed.'], breakLine: true});
                };
                return me;
            };
            commandBrokerProvider.appendCommandHandler(rmdirCommand());

            var lsCommand = function ()
            {
                var me = {};
                var fs = null;
                me.command = 'ls';
                me.description = ['List directory contents'];
                me.init = ['fileSystem', function (fileSystem)
                {
                    fs = fileSystem;
                }];
                me.handle = function (session)
                {
                    var l = fs.list();
                    var output = [];

                    for (var i = 0; i < l.directories.length; i++) {
                        output.push('[DIR]\t\t' + l.directories[i]);
                    }
                    for (var i = 0; i < l.files.length; i++) {
                        output.push('     \t\t' + l.files[i]);
                    }
                    output.push('');
                    output.push('Total: ' + (l.directories.length + l.files.length));

                    session.output.push({output: true, text: output, breakLine: true});
                };
                return me;
            };
            commandBrokerProvider.appendCommandHandler(lsCommand());

            var catCommand = function ()
            {
                var me = {};
                var fs = null;
                me.command = 'cat';
                me.description = ['Reads file.', 'Syntax: cat <fileName>', 'Example: cat file.txt'];
                me.init = ['fileSystem', function (fileSystem)
                {
                    fs = fileSystem;
                }];
                me.handle = function (session, path)
                {
                    if (!path) {
                        throw new Error('A file name is required');
                    }
                    var content = fs.readFile(path);
                    var outtext = content ? content.split('\n') : [];
                    session.output.push({output: true, text: outtext, breakLine: true});
                };
                return me;
            };
            commandBrokerProvider.appendCommandHandler(catCommand());

            var rmCommand = function ()
            {
                var me = {};
                var fs = null;
                me.command = 'rm';
                me.description = ['Removes file.', 'Syntax: rm <fileName>', 'Example: rm file.txt'];
                me.init = ['fileSystem', function (fileSystem)
                {
                    fs = fileSystem;
                }];
                me.handle = function (session, path)
                {
                    if (!path) {
                        throw new Error('A file name is required');
                    }
                    fs.deleteFile(path);
                    session.output.push({output: true, text: ['File deleted.'], breakLine: true});
                };
                return me;
            };
            commandBrokerProvider.appendCommandHandler(rmCommand());

            var createFileRedirection = function ()
            {
                var me = {};
                var fs = null;
                me.command = '>';
                me.init = ['fileSystem', function (fileSystem)
                {
                    fs = fileSystem;
                }];
                me.handle = function (session, path)
                {
                    if (!path) {
                        throw new Error('A file name is required');
                    }

                    if (session.input) {
                        var content = '';
                        for (var i = 0; i < session.input.length; i++) {
                            for (var j = 0; j < session.input[i].text.length; j++) {
                                content += session.input[i].text[j];
                                if (j !== session.input[i].text.length - 1) {
                                    content += '\n';
                                }
                            }
                        }
                        fs.writeFile(path, content);
                    }
                };
                return me;
            };
            commandBrokerProvider.appendRedirectorHandler(createFileRedirection());

            var appendFileRedirection = function ()
            {
                var me = {};
                var fs = null;
                me.command = '>>';
                me.init = ['fileSystem', function (fileSystem)
                {
                    fs = fileSystem;
                }];
                me.handle = function (session, path)
                {
                    if (!path) {
                        throw new Error('A file name is required');
                    }

                    if (session.input) {
                        var content = '';
                        for (var i = 0; i < session.input.length; i++) {
                            for (var j = 0; j < session.input[i].text.length; j++) {
                                content += session.input[i].text[j];
                                if (j !== session.input[i].text.length - 1) {
                                    content += '\n';
                                }
                            }
                        }
                        fs.appendToFile(path, content);
                    }
                };
                return me;
            };
            commandBrokerProvider.appendRedirectorHandler(appendFileRedirection());
        }])

        .run(['fileSystemConfiguration', 'storage', function (fs, storage)
        {
            if (!storage.getItem(fs.directorySeparator + '_dir')) {
                storage.setItem(fs.directorySeparator + '_dir', '_dir');
            }
        }])

;
