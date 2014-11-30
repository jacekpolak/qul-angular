qul.controller('PopupExample2Controller', function($scope, XHR, Popups){
	$scope.elements = [];

	$scope.open = function(popupElement){
		Popups.open('PopupLoader');

		new XHR({
			url: '/test.php',
			onSuccess: function(responce){
				Popups.close('PopupLoader');

				$scope.elements = responce;
				$scope.$parent.open(popupElement);
			}.bind(this)
		}).send();
	};

	$scope.sort = function(){
		$scope.elements.sort(function(a, b){return a-b});
	};
});