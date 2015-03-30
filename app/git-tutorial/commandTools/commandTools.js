'use strict';
angular.module('commandTools', [])

.run(['commandBroker', function (commandBroker) {
    commandBroker.init();
}]);