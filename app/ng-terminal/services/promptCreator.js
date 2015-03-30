(function ()
{
    'use strict';

    function promptCreator()
    {
        return function (config)
        {
            var build;
            var me = {};
            var _user, _path, _userPathSeparator, _promptEnd;

            if (config) {
                config = config.promptConfiguration;
            } else {
                config = null;
            }

            build = function ()
            {
                me.text = _user + _userPathSeparator + _path + _promptEnd;
            };

            me.resetPath = function ()
            {
                if (config && config.path) {
                    _path = config.path;
                } else {
                    _path = '\\';
                }
                build();
            };

            me.resetUser = function ()
            {
                if (config && config.user) {
                    _user = config.user;
                } else {
                    _user = 'anon';
                }
                build();
            }

            me.reset = function ()
            {
                _user = config && config.user != null ? config.user || '' : 'anon';
                _path = config && config.path != null ? config.path || '' : '\\';
                _userPathSeparator = config && config.separator != null ? config.separator || '' : '@';
                _promptEnd = config && config.end != null ? config.end || '' : ':>';
                build();
            };

            me.user = function (user)
            {
                if (user) {
                    _user = user;
                    build();
                }
                return _user;
            };

            me.path = function (path)
            {
                if (path) {
                    _path = path;
                    build();
                }
                return _path;
            };

            me.text = '';

            me.reset();

            return me;
        };
    }


    var module = angular.module("ng-terminal");
    module.service('promptCreator', ['$document', promptCreator]);
})();

