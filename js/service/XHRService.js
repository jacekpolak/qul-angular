qul.factory('XHR', function($http, XHRManager){
	var XHR = (function(){
		var XHRClass = function(params){
			this.init(params);
		};

		XHRClass.prototype = {
			params: {},

			/**
			 *
			 * @param params
			 */
			init: function(params){
				this.params = this.getDefinedParams(params);
			},

			/**
			 *
			 * @returns {*}
			 */
			getParams: function(){
				return this.params;
			},

			/**
			 *
			 * @param params
			 * @returns {*}
			 */
			getDefinedParams: function(params){
				if(undefined == params){
					params = {};
				}

				params.method     = params.method       || 'GET';
				params.onSuccess  = params.onSuccess    || function(){};
				params.onError    = params.onError      || function(){};

				return params;
			},

			send: function(){
				XHRManager.queuePush(this);
				XHRManager.send();
			}
		};

		return XHRClass;
	})();

	return XHR;
});