(function ()
{
    'use strict';

    function terminal($document, $sce)
    {
        return {
            restrict: 'E',
            controller: 'TerminalController',
            replace: true,
            templateUrl: 'directives/ng-terminal/assets/templates/terminalTemplate.html',
            compile: function compile()
            {
                return {
                    post: function postLink(scope, element)
                    {
                        var terminal = element;
                        var target = angular.element(element[0].querySelector('.terminal-target'));
                        var consoleView = angular.element(element[0].querySelector('.terminal-viewport'));
                        var cursor = angular.element(element[0].querySelector('.terminal-cursor'));

                        if (navigator.appVersion.indexOf('Trident') !== -1) {
                            terminal.addClass('ie');
                        }

                        setInterval(function ()
                        {
                            var focused = $document[0].activeElement === target[0];
                            if (focused) {
                                cursor.toggleClass('terminal-cursor-hidden');
                            } else if (!target.hasClass('terminal-cursor-hidden')) {
                                cursor.addClass('terminal-cursor-hidden');
                            }
                        }, 500);

                        var mouseOver = false;
                        element.on('mouseover', function ()
                        {
                            mouseOver = true;
                        });
                        element.on('mouseleave', function ()
                        {
                            mouseOver = false;
                        });

                        consoleView.on('click', function ()
                        {
                            target[0].focus();
                            terminal.toggleClass('terminal-focused', true);
                        });

                        target.on('blur', function ()
                        {
                            if (!mouseOver) {
                                terminal.toggleClass('terminal-focused', false);
                            }
                        });

                        target.on('keypress', function (event)
                        {
                            if (scope.showPrompt || scope.allowTypingWriteDisplaying) {
                                scope.keyPress(event.which);
                            }
                            event.preventDefault();
                        });

                        target.on('keydown', function (event)
                        {
                            if (event.keyCode === 9) {
                                event.preventDefault();
                            }
                            if (event.keyCode === 8) {
                                if (scope.showPrompt || scope.allowTypingWriteDisplaying) {
                                    scope.backspace();
                                }
                                event.preventDefault();
                            } else if (event.keyCode === 13) {
                                if (scope.showPrompt || scope.allowTypingWriteDisplaying) {
                                    scope.execute();
                                }
                            } else if (event.keyCode === 38) {
                                if (scope.showPrompt || scope.allowTypingWriteDisplaying) {
                                    scope.previousCommand();
                                }
                                event.preventDefault();
                            } else if (event.keyCode === 40) {
                                if (scope.showPrompt || scope.allowTypingWriteDisplaying) {
                                    scope.nextCommand();
                                }
                                event.preventDefault();
                            }
                        });

                        scope.$watchCollection(function ()
                        {
                            return scope.results;
                        }, function (newValues, oldValues)
                        {

                            scope.showPrompt = false;

                            var f = [function ()
                                     {
                                         scope.showPrompt = true;
                                         scope.$$phase || scope.$apply();
                                         consoleView[0].scrollTop = consoleView[0].scrollHeight;
                                     }];

                            for (var j = 0; j < newValues.length; j++) {
                                var newValue = newValues[j];
                                if (newValue.displayed) {
                                    continue;
                                }
                                newValue.displayed = true;
                                if ((newValue.text[0].indexOf(':>') !== -1)) {
                                    scope.test = newValue.text[0];

                                } else {
                                    scope.oki = $sce.trustAsHtml(newValue.text[0]);
                                }

                            }
                            f[f.length - 1]();
                        });

                    }
                };
            }
        };
    }

    var module = angular.module('ng-terminal');
    module.directive('terminal', ['$document', '$sce', terminal]);
})();

