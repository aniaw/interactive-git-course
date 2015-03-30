(function ()
{
    'use strict';
    function storage()
    {
        return window.localStorage;
    }

    var module = angular.module('commandFileSystem');
    module.service('storage', [storage]);
})();
