// @todo _private scope
qul.factory('XHRManager', function($http){
	return {
		globalData: {},
		defaultHost: null,
		queue: [],
		isSending: false,

		preOnSuccess: function(){},
		preOnError: function(){},

		setDefaultHost: function(host){
			this.defaultHost = host;
		},

		addGlobalData: function(data){
			angular.forEach(data, function(value, key){
				this.globalData[key] = value;
			}.bind(this));
		},

		setPreOnSuccess: function(callback){
			this.preOnSuccess = callback;
		},

		setPreOnError: function(callback){
			this.preOnError = callback;
		},

		queuePush: function(xhr){
			return this.queue.push(xhr);
		},

		queueShift: function(){
			return this.queue.shift();
		},

		objectToQueryString: function(data) {
			var urlData = [];

			angular.forEach(data, function(value, key){
				urlData.push(encodeURIComponent(key) + "=" + encodeURIComponent(value));
			});

			return urlData.join("&");
		},

		send: function(){
			if(true === this.isSending){
				// sending other request now, wait
				return false;
			}
			if(0 == this.queue.length){
				// nothing to send
				return;
			}

			this.isSending = true;

			var xhr     = this.queueShift();
			var params  = xhr.getParams();

			// set parameters
			params.url  = (-1 == params.url.indexOf('://')) ? this.defaultHost + params.url : params.url;
			params.data = angular.extend(params.data || {}, this.globalData);

			// FULL REST CORS
			if(undefined === params.headers){
				params.headers = {};
			}
			params.headers['Content-Type'] = 'application/x-www-form-urlencoded';
			params.url += '?' + this.objectToQueryString(params.data);

			$http(params)
				.success(function(responce, status, headers, config){
					this.isSending = false;

					if(false !== this.preOnSuccess(responce, status, headers, config)){
						params.onSuccess(responce, status, headers, config);
					}

					// send next
					this.send();
				}.bind(this))
				.error(function(responce, status, headers, config){
					this.isSending = false;

					if(false !== this.preOnError(responce, status, headers, config)){
						params.onError(responce, status, headers, config);
					}

					// send next
					this.send();
				}.bind(this));

			return true;
		}
	};
});