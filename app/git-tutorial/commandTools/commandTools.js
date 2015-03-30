'use strict';
angular.module('commandTools', [])

.run(['CommandBroker', function (CommandBroker) {
    CommandBroker.init();
}]);