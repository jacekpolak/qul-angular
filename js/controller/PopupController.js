/**
 *
 */
qul.controller('PopupController', function($scope, $rootScope, Popups){
	var _private = {
		controllerName: null,
		index: null
	};

	$scope.isShowed = false;
	$scope.style = {};

	/**
	 * Default init to overwrite in child controller
	 */
	$scope.init = function(){};

	/**
	 * Set controller name of popup
	 *
	 * Can run only once, then method is deleted
	 *
	 * @param name
	 */
	$scope.setControllerName = function(name){
		_private.controllerName = name;

		// delete this method
		delete $scope.setControllerName;
	};

	/**
	 * Return a name of popup controller
	 *
	 * @returns {null}
	 */
	$scope.getControllerName = function(){
		return _private.controllerName;
	};

	/**
	 * Set an index of popup
	 *
	 * @param index
	 */
	$scope.setIndex = function(index){
		_private.index = index;
	};

	/**
	 * Return a CSS style for popup
	 *
	 * @returns {}
	 */
	$scope.getStyle = function(){
		var style = angular.copy($scope.style);
		style['z-index'] = _private.index;

		return style;
	};

	/**
	 * Open popup
	 *
	 * @returns {boolean}
	 */
	$scope.open = function(popupElement){
		if(true === Popups.isOpened($scope.getControllerName())){
			// Popup is already opened. Block open again
			return false;
		}

		$scope.isShowed = true;

		// global event
		$rootScope.$emit('Popups:open', $scope.getControllerName());
		// special event to this popup
		$rootScope.$emit('Popups:open:' + $scope.getControllerName());

		return true;
	};

	/**
	 * Close popup
	 *
	 * @returns {boolean}
	 */
	$scope.close = function(){
		if(false === Popups.isOpened($scope.getControllerName())){
			// Popup is already closed. Block close again
			return false;
		}

		$scope.isShowed = false;

		// global event
		$rootScope.$emit('Popups:close', $scope.getControllerName());
		// special event to this popup
		$rootScope.$emit('Popups:close:' + $scope.getControllerName());

		return true;
	};

	/**
	 * Close all opened popups
	 */
	$scope.closeAll = function(){
		Popups.closeAll();
	};

	/**
	 *
	 * @param name
	 */
	$scope.openOther = function(name /*, other params... */){
		Popups.open.apply(Popups, arguments);
	};
});