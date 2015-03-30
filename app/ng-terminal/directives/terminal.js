(function ()
{
    'use strict';

    function terminal($document)
    {
        return {
            restrict: 'E',
            controller: 'terminalController',
            transclude: true,
            replace: true,
            templateUrl: 'ng-terminal/assets/templates/terminalTemplate.html',
            compile: function compile(tElement, tAttrs, transclude)
            {
                return {
                    pre: function preLink(scope, element, attrs, controller)
                    {

                    }, post: function postLink(scope, element, attrs, controller)
                    {
                        var terminal = element;
                        var target = angular.element(element[0].querySelector('.terminal-target'));
                        var consoleView = angular.element(element[0].querySelector('.terminal-viewport'));
                        var results = angular.element(element[0].querySelector('.terminal-results'));
                        var prompt = angular.element(element[0].querySelector('.terminal-prompt'));
                        var cursor = angular.element(element[0].querySelector('.terminal-cursor'));
                        var consoleInput = angular.element(element[0].querySelector('.terminal-input'));

                        if (navigator.appVersion.indexOf('Trident') !== -1) {
                            terminal.addClass('damn-ie');
                        }

                        var css = attrs['terminalClass'];
                        if (css) {
                            terminal.addClass(css);
                        }

                        var config = attrs['terminalConfig'];
                        scope.init(config || 'default');

                        setInterval(function ()
                        {
                            var focused = $document[0].activeElement == target[0];
                            if (focused) {
                                cursor.toggleClass('terminal-cursor-hidden');
                            } else if (!target.hasClass('terminal-cursor-hidden')) {
                                cursor.addClass('terminal-cursor-hidden');
                            }
                        }, 500);

                        var mouseover = false;
                        element.on('mouseover', function ()
                        {
                            mouseover = true;
                        });
                        element.on('mouseleave', function ()
                        {
                            mouseover = false;
                        });

                        consoleView.on('click', function ()
                        {
                            target[0].focus();
                            terminal.toggleClass('terminal-focused', true);
                        });

                        target.on("blur", function (e)
                        {
                            if (!mouseover) {
                                terminal.toggleClass('terminal-focused', false);
                            }
                        });

                        target.on("keypress", function (event)
                        {
                            if (scope.showPrompt || scope.allowTypingWriteDisplaying) {
                                scope.keypress(event.which);
                            }
                            event.preventDefault();
                        });

                        target.on("keydown", function (e)
                        {

                            if (e.keyCode == 9) {
                                e.preventDefault();
                            }
                            if (e.keyCode == 8) {
                                if (scope.showPrompt || scope.allowTypingWriteDisplaying) {
                                    scope.backspace();
                                }
                                e.preventDefault();
                            } else if (e.keyCode == 13) {
                                if (scope.showPrompt || scope.allowTypingWriteDisplaying) {
                                    scope.execute();
                                }
                            } else if (e.keyCode == 38) {
                                if (scope.showPrompt || scope.allowTypingWriteDisplaying) {
                                    scope.previousCommand();
                                }
                                e.preventDefault();
                            } else if (e.keyCode == 40) {
                                if (scope.showPrompt || scope.allowTypingWriteDisplaying) {
                                    scope.nextCommand();
                                }
                                e.preventDefault();
                            }
                        });

                        function type(input, line, i, endCallback)
                        {
                            setTimeout(function ()
                            {
                                scope.typeSound();
                                input.textContent += (i < line.length ? line[i] : '');

                                if (i < line.length - 1) {
                                    scope.typeSound();
                                    type(input, line, i + 1, endCallback);
                                } else if (endCallback) {
                                    endCallback();
                                }
                            }, scope.outputDelay);
                        }

                        scope.$watchCollection(function ()
                        {
                            return scope.results;
                        }, function (newValues, oldValues)
                        {

                            if (oldValues.length && !newValues.length) { // removal detected
                                var children = results.children();
                                for (var i = 0; i < children.length; i++) {
                                    children[i].remove();
                                }
                            }

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

                                if (scope.outputDelay) {

                                    for (var i = newValue.text.length - 1; i >= 0; i--) {
                                        var line = document.createElement('pre');
                                        line.className = 'terminal-line';

                                        var textLine = newValue.text[i];

                                        if (scope.outputDelay && newValue.output) {
                                            line.textContent = '  ';
                                            var fi = f.length - 1;
                                            var wrapper = function ()
                                            {
                                                var wline = line;
                                                var wtextLine = textLine;
                                                var wf = f[fi];
                                                var wbreak = i == newValue.text.length - 1 && newValue.breakLine;
                                                f.push(function ()
                                                {
                                                    results[0].appendChild(wline);
                                                    type(wline, wtextLine, 0, wf);
                                                    consoleView[0].scrollTop = consoleView[0].scrollHeight;
                                                    if (wbreak) {
                                                        var breakLine = document.createElement('br');
                                                        results[0].appendChild(breakLine);
                                                    }
                                                });
                                            }();
                                        } else {
                                            line.textContent = textLine;
                                            results[0].appendChild(line)
                                        }
                                    }
                                } else {
                                    for (var i = 0; i < newValue.text.length; i++) {
                                        var line = document.createElement('pre');
                                        line.textContent = newValue.output ? '  ' : '';
                                        line.className = 'terminal-line';
                                        line.textContent += newValue.text[i];
                                        results[0].appendChild(line)
                                    }
                                    if (!!newValue.breakLine) {
                                        var breakLine = document.createElement('br');
                                        results[0].appendChild(breakLine);
                                    }
                                }

                            }
                            f[f.length - 1]();
                        });

                    }
                }
            }
        }
    }

    var module = angular.module("ng-terminal");
    module.directive('terminal', ['$document', terminal]);
})();

