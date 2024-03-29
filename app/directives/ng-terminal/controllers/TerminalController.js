(function ()
{
    'use strict';
    function TerminalController($scope)
    {
        $scope.commandLine = '';
        $scope.results = [];
        $scope.showPrompt = true;

        var promptCreator = function (p)
        {
            return p.user + p.separator + p.path + p.end + ' ';
        };

        var cleanNonPrintableCharacters = function (input)
        {
            var tmpInput = input.replace(/\s+/g, ' ');
            return tmpInput.replace(/[^\x20-\x7E]+/g, '');
        };


        $scope.init = function ()
        {
            var defaultPrompt = {end: ':>', user: 'default', separator: '@', path: '\\'};
            $scope.prompt = {text: promptCreator(defaultPrompt)};
            $scope.outputDelay = 0;
            $scope.allowTypingWriteDisplaying = true;
        };

        $scope.init();

        var commandIndex = -1;

        // copy text to console
        $scope.handlePaste = function (event)
        {
            $scope.commandLine += event.clipboardData.getData('text/plain');
            $scope.$$phase || $scope.$apply();
        };

        // listen terminal-output event
        $scope.$on('terminal-output', function (event, session)
        {

            for (var key in session) {
                if (!session[key].added) {
                    session[key].added = true;
                    $scope.results.push(session[key]);
                }
            }

        });

        //command line character limit (80)
        $scope.keyPress = function (keyCode)
        {
            if ($scope.commandLine.length < 80) {
                commandIndex = -1;
                $scope.commandLine += String.fromCharCode(keyCode);
                $scope.$$phase || $scope.$apply();
            }
        };

        // previous command with key up pressed
        $scope.previousCommand = function ()
        {
            $scope.count = $scope.commandHistory.length;
            if (commandIndex === -1) {
                commandIndex = $scope.commandHistory.length;
            }
            $scope.commandLine = $scope.commandHistory[--commandIndex];
            $scope.$$phase || $scope.$apply();
        };

        // next command with key down pressed
        $scope.nextCommand = function ()
        {
            if (commandIndex < $scope.commandHistory.length - 1) {
                $scope.commandLine = $scope.commandHistory[++commandIndex];
                $scope.$$phase || $scope.$apply();
            } else {
                $scope.commandLine = '';
                $scope.$$phase || $scope.$apply();
            }
        };

        $scope.execute = function ()
        {

            var command = cleanNonPrintableCharacters($scope.commandLine);

            $scope.commandLine = '';

            if (!command) {
                return;
            }

            // only 10 previous command in history
            if ($scope.commandHistory.length > 10) {
                $scope.commandHistory.splice(0, 1);
            }

            // don't duplicate if the last command was the same
            if (command !== $scope.commandHistory[$scope.commandHistory.length - 1]) {
                $scope.commandHistory.push(command);
            }

            $scope.results.push({type: 'text', text: [$scope.prompt.text + command]});
            $scope.$emit('terminal-input', command);
            $scope.$apply();

        };

        $scope.backspace = function ()
        {
            if ($scope.commandLine) {
                $scope.commandLine = $scope.commandLine.substring(0, $scope.commandLine.length - 1);
                $scope.$apply();
            }
        };
    }

    var module = angular.module('ng-terminal');
    module.controller('TerminalController', ['$scope', TerminalController]);
})();
