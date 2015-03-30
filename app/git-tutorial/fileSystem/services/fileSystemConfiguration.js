(function ()
{
    'use strict';
    function fileSystemConfiguration()
    {
        var provider = function ()
        {
            var me = {};
            me.directorySeparator = '\\ ';
            me.$get = [function ()
                       {
                           return me;
                       }];
            return me;
        };

        return provider();
    }

    var module = angular.module('commandFileSystem');
    module.provider('fileSystemConfiguration', [fileSystemConfiguration]);
})();
