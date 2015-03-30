(function ()
{
    'use strict';
    function fileSystem(config, pathTools, storage)
    {

        var fs = function ()
        {
            var me = {};
            var _currentPath = config.directorySeparator;

            if (!storage.getItem(config.directorySeparator + '_dir')) {
                storage.setItem(config.directorySeparator + '_dir', '_dir');
            }

            me.path = function (path)
            {

                if (path === '..') {
                    _currentPath = pathTools.directoryUp(_currentPath);
                } else if (path && !pathTools.isDirNameValid(path)) {
                    throw new Error('The directory name is not valid');
                } else if (path) {

                    var dirkey = pathTools.combine(_currentPath, path, '_dir');
                    if (!storage.getItem(dirkey)) {
                        throw new Error('The directory "' + path + '" does not exist.');
                    }

                    _currentPath = pathTools.combine(_currentPath, path);
                }

                return _currentPath;
            };

            me.list = function ()
            {
                var result = {
                    directories: [], files: []
                };

                if (_currentPath !== config.directorySeparator) {
                    result.directories.push('..');
                }

                for (var key in storage) {
                    if (pathTools.isFileOfPath(_currentPath, key)) {
                        result.files.push(pathTools.getPathItemName(key));
                    } else if (pathTools.isDirectoryOfPath(_currentPath, key)) {
                        result.directories.push(pathTools.getPathItemName(key));
                    }
                }
                result.directories.sort();
                result.files.sort();
                return result;
            };

            me.existsDir = function (path, failIfNotExist)
            {

                if (!pathTools.isDirNameValid(path)) {
                    throw new Error('The directory name is not valid');
                }

                var dirkey = pathTools.combine(_currentPath, path, '_dir');
                var exists = storage.getItem(dirkey);
                if (!exists && failIfNotExist) {
                    throw new Error('The directory does not exist.');
                }
                return exists;
            };

            me.createDir = function (path)
            {

                if (!pathTools.isDirNameValid(path)) {
                    throw new Error('The directory name is not valid');
                }

                if (!pathTools.isDirNameValid(pathTools.getPathItemName(path))) {
                    throw new Error('Invalid directory name');
                }
                if (me.existsDir(path)) {
                    throw new Error('The directory already exists.');
                } else {
                    var dirkey = pathTools.combine(_currentPath, path, '_dir');
                    storage.setItem(dirkey, '_dir');
                }
            };

            me.removeDir = function (path)
            {
                console.log('Remove dir: ' + path + ' on: ' + _currentPath);
                if (!pathTools.isDirNameValid(path)) {
                    throw new Error('The directory name is not valid');
                }

                if (me.existsDir(path, true)) {
                    var dirkey = pathTools.combine(_currentPath, path, '_dir');
                    path = pathTools.combine(_currentPath, path);
                    console.log('Full path: ' + path);
                    var keys = [];
                    for (var key in storage) {

                        if (key.length >= path.length) {
                            var s = key.substr(0, path.length);
                            if (s === path) {
                                keys.push(key);
                                console.log('Remove: ' + key);
                                continue;
                            }
                        }
                        console.log('Skip: ' + key);
                    }
                    storage.removeItem(dirkey);
                    for (var i = 0; i < keys.length; i++) {
                        storage.removeItem(keys[i]);
                    }
                }
            };

            me.writeFile = function (name, content)
            {
                if (!pathTools.isFileNameValid(name)) {
                    throw new Error('Invalid file name');
                }
                if (!content) {
                    throw new Error('No content has been passed');
                }

                var filekey = pathTools.combine(_currentPath, name);
                storage.setItem(filekey, content);
            };

            me.appendToFile = function (name, content)
            {
                if (!pathTools.isFileNameValid(name)) {
                    throw new Error('Invalid file name');
                }
                if (!content) {
                    throw new Error('No content has been passed');
                }

                var filekey = pathTools.combine(_currentPath, name);
                var prevcontent = storage.getItem(filekey);
                storage.setItem(filekey, (prevcontent ? prevcontent + '\n' : '') + content);
            };

            me.deleteFile = function (name)
            {
                if (!pathTools.isFileNameValid(name)) {
                    throw new Error('Invalid file name');
                }
                var filekey = pathTools.combine(_currentPath, name);
                if (!storage.getItem(filekey)) {
                    throw new Error('The file does not exist');
                }
                storage.removeItem(filekey);
            };

            me.readFile = function (name)
            {
                if (!pathTools.isFileNameValid(name)) {
                    throw new Error('Invalid file name');
                }

                var filekey = pathTools.combine(_currentPath, name);
                var content = storage.getItem(filekey);
                if (!content) {
                    throw new Error('The file does not exist');
                }
                return content;
            };

            return me;
        };
        return fs();
    }

    var module = angular.module('commandFileSystem');
    module.service('fileSystem', ['fileSystemConfiguration', 'pathTools', 'storage', fileSystem]);
})();
