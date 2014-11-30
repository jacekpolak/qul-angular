qul.controller('XHRController', function(XHRManager, XHR, $http){
	XHRManager.setDefaultHost('./srv');
	XHRManager.addGlobalData({
		foo: 'bar'
	});
	XHRManager.setPreOnSuccess(function(responce, status, headers, config){
		console.log(config.method);
	});

	//new XHR({
	//	method: 'POST',
	//	url: '/test.php',
	//	data: {
	//		'param': 1
	//	},
	//	onSuccess: function(responce){
	//		console.log(' responce', responce);
	//	}
	//}).send();
	//
	//new XHR({
	//	method: 'DELETE',
	//	url: '/test.php',
	//	data: {
	//		'param': 2
	//	},
	//	onSuccess: function(responce){
	//		console.log(' responce', responce);
	//	}
	//}).send();
	//
	//new XHR({
	//	method: 'GET',
	//	url: '/test.php',
	//	data: {
	//		'param': 3
	//	},
	//	onSuccess: function(responce){
	//		console.log(' responce', responce);
	//	}
	//}).send();
	//
	//new XHR({
	//	method: 'PUT',
	//	url: '/test.php',
	//	data: {
	//		'param': 4
	//	},
	//	onSuccess: function(responce){
	//		console.log(' responce', responce);
	//	}
	//}).send();
});