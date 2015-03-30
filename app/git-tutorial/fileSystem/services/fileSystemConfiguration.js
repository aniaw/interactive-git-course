(function ()
{
    'use strict';
    function FileSystemConfiguration()
    {
        var provider = function ()
        {
            var fileSystemConfiguration = {};
            fileSystemConfiguration.directorySeparator = '\\ ';
            fileSystemConfiguration.$get = [function ()
                       {
                           return fileSystemConfiguration;
                       }];
            return fileSystemConfiguration;
        };

        return provider();
    }

    var module = angular.module('commandFileSystem');
    module.provider('FileSystemConfiguration', [FileSystemConfiguration]);
})();
