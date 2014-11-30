qul.controller('TestController', function($scope, Popups, $rootScope){
	$scope.open = function(name){
		Popups.open(name);
	};

	$scope.openPopupExample3 = function(param1, param2, param3){
		Popups.open('PopupExample3', param1, param2, param3);
	};

	$rootScope.$on('Popups:open', function(event, name){
		console.log('Open popup', name);
	});
	$rootScope.$on('Popups:close', function(event, name){
		console.log('Close popup', name);
	});
});