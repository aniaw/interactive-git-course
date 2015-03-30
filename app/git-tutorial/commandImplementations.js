'use strict';
angular.module('commandImplementations', ['commandTools'])

        .config(['CommandBrokerProvider', function (CommandBrokerProvider)
        {

            CommandBrokerProvider.appendCommandHandler({
                command: 'version', description: ['Shows this software version.'], handle: function (session)
                {
                    session.output.push({output: true, text: ['Version 0.1 Beta'], breakLine: true});
                }
            });

            CommandBrokerProvider.appendCommandHandler({
                command: 'clear', description: ['Clears the screen.'], handle: function (session)
                {
                    session.commands.push({command: 'clear'});
                }
            });


            CommandBrokerProvider.appendCommandHandler({
                command: 'echo', description: ['Echoes input.'], handle: function (session)
                {
                    var a = Array.prototype.slice.call(arguments, 1);
                    session.output.push({output: true, text: [a.join(' ')], breakLine: true});
                }
            });


            var feedbackCommandHandler = function ()
            {
                var me = {};
                me.command = 'feedback';
                me.description = ['Sends a feedback message to the author.', 'Example: feedback This application is awesome! Where may I donate?'];
                me.handle = function (session, param)
                {
                    param = Array.prototype.slice.call(arguments, 1);
                    param = param.join(' ');
                    var outText = [];
                    if (!param) {
                        outText.push('You need to provide a message, type "help feedback" to get a hint.');
                    } else {
                        outText.push('Your message have been sent.');
                        outText.push('Thanks for the feedback!.');
                    }
                    session.output.push({output: true, text: outText, breakLine: true});
                };
                return me;
            };
            CommandBrokerProvider.appendCommandHandler(feedbackCommandHandler());

            // this must be the last
            var helpCommandHandler = function ()
            {
                var me = {};

                me.command = 'help';
                me.description = ['Provides instructions about how to use this terminal'];
                me.handle = function (session, cmd)
                {
                    var list = CommandBrokerProvider.describe();
                    var outText = [];
                    if (cmd) {
                        for (var i = 0; i < list.length; i++) {
                            if (list[i].command === cmd) {
                                var l = list[i];
                                outText.push('Command help for: ' + cmd);
                                for (var j = 0; j < l.description.length; j++) {
                                    outText.push(l.description[j]);
                                }
                                break;
                            }
                        }
                        if (!outText.length) {
                            outText.push('There is no command help for: ' + cmd);
                        }
                    } else {
                        outText.push('Available commands:');
                        for (var i = 0; i < list.length; i++) {
                            var str = '  ' + list[i].command + '\t\t';
                            for (var j = 0; j < 3 && i + 1 < list.length; j++) {
                                var cmd = list[++i].command;
                                str += cmd + (cmd.length > 6 ? '\t' : '\t\t');
                            }
                            outText.push(str);
                        }
                        outText.push('');
                        outText.push('Enter "help <command>" to get help for a particular command.');
                    }
                    session.output.push({output: true, text: outText, breakLine: true});
                };
                return me;
            };
            CommandBrokerProvider.appendCommandHandler(helpCommandHandler());
        }]);