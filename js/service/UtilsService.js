/**
 *
 */
qul.factory('$elem', function(){
	return function(pElementId){
		return angular.element(document.getElementById(pElementId));
	};
});
