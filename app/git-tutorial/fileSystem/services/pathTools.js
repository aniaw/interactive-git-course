(function ()
{
    'use strict';
    function pathTools(config)
    {
        var pathT = function ()
        {
            var me = {};
            me.isAbsolute = function (path)
            {
                if (!path || path.length < config.directorySeparator.length) {
                    return false;
                }
                return path.substring(0, config.directorySeparator.length) === config.directorySeparator;
            };

            me.addDirectorySeparator = function (path)
            {
                if (path.substr(path.length - config.directorySeparator.length, config.directorySeparator.length) !== config.directorySeparator) {
                    path += config.directorySeparator;
                }
                return path;
            };

            me.addRootDirectorySeparator = function (path)
            {
                if (!me.isAbsolute(path)) {
                    return config.directorySeparator + path;
                }
                return path;
            };

            me.combine = function ()
            {
                var result = '';
                for (var i = 0; i < arguments.length; i++) {

                    var arg = arguments[i];

                    if (i !== 0 && me.isAbsolute(arg)) {
                        throw new Error('When combining a path, only the first element can an absolute path.');
                    } else if (i === 0) {
                        arg = me.addRootDirectorySeparator(arg);
                    }
                    if (i !== arguments.length - 1) {
                        arg = me.addDirectorySeparator(arg);
                    }

                    result += arg;
                }

                return result;
            };

            me.directoryUp = function (path)
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

                return me.combine.apply(me, parts);
            };

            me.isFileOfPath = function (basePath, path)
            {
                if (path.substr(0, basePath.length) === basePath) {
                    var sp = path.substr(basePath.length);
                    if (me.isAbsolute(sp) && sp.indexOf(config.directorySeparator) === sp.lastIndexOf(config.directorySeparator)) {
                        sp = sp.substr(config.directorySeparator.length);
                        return sp !== '_dir';
                    } else {
                        return sp.indexOf(config.directorySeparator) === -1 && sp !== '_dir';
                    }
                }

                return false;
            };

            me.isDirectoryOfPath = function (basePath, path)
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

            me.getPathItemName = function (path)
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
            me.isFileNameValid = function (name)
            {
                return !!name && name[0] !== '_' && !!name.match(fileNameValidator);
            };

            var dirNameValidator = /^[\w_\-]+$/;
            me.isDirNameValid = function (name)
            {
                return !!name && name[0] !== '_' && !!name.match(dirNameValidator);
            };

            return me;
        };
        return pathT();
    }

    var module = angular.module('commandFileSystem');
    module.service('pathTools', ['fileSystemConfiguration', pathTools]);
})();
