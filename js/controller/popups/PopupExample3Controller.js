qul.controller('PopupExample3Controller', function($scope, XHR, Popups){
	$scope.params = {};

	$scope.open = function(popupElement, param1, param2, param3){
		$scope.params = [param1, param2, param3];

		$scope.$parent.open(popupElement);
	};
});