(function ()
{
    'use strict';
    function CommandBroker()
    {
        var provider = function ()
        {
            var commandBroker = {handlers: [], redirectors: []};

            var selectByRedirectors = function (commandParts)
            {
                var result = [], r = [];
                for (var i = 0; i < commandParts.length; i++) {
                    var cp = commandParts[i];
                    var suitableRedirectors = commandBroker.redirectors.filter(function (r)
                    {
                        return r.command === cp;
                    });
                    if (suitableRedirectors.length) {
                        result.push(r);
                        result.push(cp);
                        r = [];
                    } else {
                        r.push(cp);
                    }
                }
                if (r.length) {
                    result.push(r);
                }

                return result;
            };

            commandBroker.$get = ['$injector', 'CommandLineSplitter', function ($injector, CommandLineSplitter)
            {
                return {
                    execute: function (session, consoleInput)
                    {

                        if (!consoleInput) {
                            return;
                        }
                        var fullCommandParts = CommandLineSplitter.split(consoleInput);

                        var stackedParts = selectByRedirectors(fullCommandParts);

                        var tempSession = {
                            commands: [], output: []
                        };

                        var redirector = null;

                        for (var i = 0; i < stackedParts.length; i++) {
                            var p = stackedParts[i];

                            if (redirector) {
                                p.splice(0, 0, tempSession);
                                redirector.handle.apply(redirector, p);
                                redirector = null;
                                continue;
                            }

                            var suitableRedirectors = commandBroker.redirectors.filter(function (r)
                            {
                                return r.command === p;
                            });

                            if (suitableRedirectors.length) {

                                var redirector = suitableRedirectors[0];
                                tempSession = {
                                    commands: [], output: [], input: tempSession.output
                                };
                            } else {

                                var suitableHandlers = commandBroker.handlers.filter(function (item)
                                {
                                    console.log(p);
                                    return p.length && item.command === p[0].toLowerCase();
                                });

                                if (suitableHandlers.length === 0) {
                                    throw new Error("There is no suitable handler for that command.");
                                }

                                var h = suitableHandlers[0];

                                p[0] = tempSession;
                                h.handle.apply(h, p);
                            }
                        }
                        angular.extend(session, tempSession);
                    },

                    init: function ()
                    { // inject dependencies on commands
                        // this commandBrokerthod should run in '.config()' ticommandBroker, but also does the command addition,
                        // so run it at '.run()' ticommandBroker makes more sense and ensure all commands are already present.
                        var inject = function (handler)
                        {
                            if (handler.init) {
                                $injector.invoke(handler.init);
                            }
                        };
                        for (var i = 0; i < commandBroker.handlers.length; i++) {
                            inject(commandBroker.handlers[i]);

                        }
                        for (var j = 0; j < commandBroker.redirectors.length; j++) {
                            inject(commandBroker.redirectors[j]);
                        }
                    }
                };
            }];

            commandBroker.appendCommandHandler = function (handler)
            {
                if (!handler || !handler.command || !handler.handle || !handler.description) {
                    throw new Error('Invalid command handler');
                }

                var suitableHandlers = commandBroker.handlers.filter(function (item)
                {
                    return item.command === handler.command;
                });

                if (suitableHandlers.length !== 0) {
                    throw new Error('There is already a handler for that command.');
                }

                commandBroker.handlers.push(handler);
            };

            commandBroker.appendRedirectorHandler = function (handler)
            {
                if (!handler || !handler.command || !handler.handle) {
                    throw new Error('Invalid redirect handler');
                }

                var suitableHandlers = commandBroker.redirectors.filter(function (item)
                {
                    return item.command === handler.command;
                });

                if (suitableHandlers.length !== 0) {
                    throw new Error('There is already a handler for that redirection.');
                }

                commandBroker.redirectors.push(handler);
            };

            commandBroker.describe = function ()
            {
                return commandBroker.handlers.map(function (item)
                {
                    return {command: item.command, description: item.description};
                });
            };

            return commandBroker;
        };

        return provider();
    }

    var module = angular.module('commandTools');
    module.provider('CommandBroker', [CommandBroker]);
})();
