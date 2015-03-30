(function ()
{
    'use strict';
    function PathTools(config)
    {
        var pt = function ()
        {
            var pathTools = {};
            pathTools.isAbsolute = function (path)
            {
                if (!path || path.length < config.directorySeparator.length) {
                    return false;
                }
                return path.substring(0, config.directorySeparator.length) === config.directorySeparator;
            };

            pathTools.addDirectorySeparator = function (path)
            {
                if (path.substr(path.length - config.directorySeparator.length, config.directorySeparator.length) !== config.directorySeparator) {
                    path += config.directorySeparator;
                }
                return path;
            };

            pathTools.addRootDirectorySeparator = function (path)
            {
                if (!pathTools.isAbsolute(path)) {
                    return config.directorySeparator + path;
                }
                return path;
            };

            pathTools.combine = function ()
            {
                var result = '';
                for (var i = 0; i < arguments.length; i++) {

                    var arg = arguments[i];

                    if (i !== 0 && pathTools.isAbsolute(arg)) {
                        throw new Error('When combining a path, only the first element can an absolute path.');
                    } else if (i === 0) {
                        arg = pathTools.addRootDirectorySeparator(arg);
                    }
                    if (i !== arguments.length - 1) {
                        arg = pathTools.addDirectorySeparator(arg);
                    }

                    result += arg;
                }

                return result;
            };

            pathTools.directoryUp = function (path)
            {
                if (path === config.directorySeparator) {
                    return path;
                }
                var parts = path.split(config.directorySeparator);
                var count = 1;
                if (parts[parts.length - 1] === '') {
                    count = 2;
                }

                for (var i = 0; i < count; i++) {
                    parts.pop();
                }

                if (parts[0] === '') {
                    parts = parts.slice(1);
                }
                if (!parts.length) {
                    return config.directorySeparator;
                }

                return pathTools.combine.apply(pathTools, parts);
            };

            pathTools.isFileOfPath = function (basePath, path)
            {
                if (path.substr(0, basePath.length) === basePath) {
                    var sp = path.substr(basePath.length);
                    if (pathTools.isAbsolute(sp) && sp.indexOf(config.directorySeparator) === sp.lastIndexOf(config.directorySeparator)) {
                        sp = sp.substr(config.directorySeparator.length);
                        return sp !== '_dir';
                    } else {
                        return sp.indexOf(config.directorySeparator) === -1 && sp !== '_dir';
                    }
                }

                return false;
            };

            pathTools.isDirectoryOfPath = function (basePath, path)
            {
                if (path.substr(0, basePath.length) === basePath) {
                    var sp = path.substr(basePath.length);
                    if (sp.length > 5) {
                        var sp2 = sp.substr(0, sp.length - 5);
                        if (sp2 + '\\_dir' === sp) {
                            var pos = sp2.indexOf('\\');
                            return !!sp && (pos === -1 || pos === 0);
                        }
                    }
                }
                return false;
            };

            pathTools.getPathItemName = function (path)
            {
                var parts = path.split(config.directorySeparator);
                var last = parts[parts.length - 1];
                if (last === '_dir') {
                    if (parts.length >= 3) {
                        return parts[parts.length - 2];
                    } else {
                        return config.directorySeparator;
                    }
                } else if (last === '') {
                    return config.directorySeparator;
                } else {
                    return last;
                }
            };

            var fileNameValidator = /^[\w_.\-]+$/;
            pathTools.isFileNameValid = function (name)
            {
                return !!name && name[0] !== '_' && !!name.match(fileNameValidator);
            };

            var dirNameValidator = /^[\w_\-]+$/;
            pathTools.isDirNameValid = function (name)
            {
                return !!name && name[0] !== '_' && !!name.match(dirNameValidator);
            };

            return pathTools;
        };
        return pt();
    }

    var module = angular.module('commandFileSystem');
    module.service('PathTools', ['FileSystemConfiguration', PathTools]);
})();
