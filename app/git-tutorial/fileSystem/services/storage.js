(function ()
{
    'use strict';
    function Storage()
    {
        return window.localStorage;
    }

    var module = angular.module('commandFileSystem');
    module.service('Storage', [Storage]);
})();
