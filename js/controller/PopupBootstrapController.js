/**
 *
 */
qul.controller('PopupBootstrapController', function($scope, $timeout, $elem){
	$scope.modal = null;

	$scope.init = function(){
		// store modal element
		//
		// Pff...
		//  we must convert angular element to DOM element (for use querySelector) and
		//  then convert back to angular element (for use removeClass and addClass)
		$scope.modal = angular.element($elem($scope.getControllerName())[0].querySelector('.modal'));
	};

	$scope.open = function(popupElement){
		$scope.$parent.open(popupElement);

		$timeout(function(){
			$scope.modal.addClass('in');
		}, 20);
	};

	$scope.close = function(popup){
		$scope.modal.removeClass('in');

		$timeout(function(){
			$scope.$parent.close();
		}, 250);
	};
});