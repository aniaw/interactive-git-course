'use strict';
angular.module('ng-terminal-example', ['ng-terminal', 'commandTools', 'commandImplementations', 'commandFileSystem']).provider('$ga',
        function ()
        {

            window['GoogleAnalyticsObject'] = 'ga';
            window['ga'] = window['ga'] || function ()
            {
                (window['ga'].q = window['ga'].q || []).push(arguments)
            };
            window['ga'].l = 1 * new Date();
            var script = document.createElement('script');
            var prevScript = document.getElementsByTagName('script')[0];
            script.async = 1;
            script.src = '//www.google-analytics.com/analytics_debug.js';
            prevScript.parentNode.insertBefore(script, prevScript);

            var provider = function ()
            {
                var me = {};

                me.$get = function ()
                {
                    ga('send', 'pageview');
                    return function ()
                    {
                        return window.ga.apply(window, arguments);
                    };
                };

                me.ga = function ()
                {
                    return window.ga.apply(window, arguments);
                };

                return me;
            };

            return provider();
        })

        .config(['$gaProvider', function ($gaProvider)
        {
            $gaProvider.ga('create', 'UA-53263543-1', 'auto');
        }])

        .config(['terminalConfigurationProvider', function (terminalConfigurationProvider)
        {

            terminalConfigurationProvider.config('vintage').outputDelay = 10;
            terminalConfigurationProvider.config('vintage').allowTypingWriteDisplaying = false;
            terminalConfigurationProvider.config('vintage').typeSoundUrl = 'example/content/type.wav';
            terminalConfigurationProvider.config('vintage').startSoundUrl = 'example/content/start.wav';
        }])

;
