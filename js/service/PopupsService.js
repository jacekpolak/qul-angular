/**
 *
 */
qul.factory('Popups', function($rootScope, $elem, _){
	var _private = {
		elementData: null,
		popups: {},
		opened: [],
		actualIndex: 1000,

		/**
		 * Return an angular scope of PopupManager (PopupManagerController)
		 *
		 * @returns {*}
		 */
		getPopupManager: function(){
			return this.getElementData().manager.scope();
		},

		/**
		 * Add popup to opened array
		 *
		 * @param name
		 */
		pushToOpened: function(name){
			_private.opened.push(name);
		},

		/**
		 * Remove popup from opened array
		 *
		 * @param name
		 * @returns {boolean}
		 */
		removeFromOpened: function(name){
			var index = _.indexOf(_private.opened, name);
			if(-1 === index){
				return false;
			}

			// remove
			_private.opened.splice(index, 1);
			return true;
		},

		/**
		 * Logic to open popup
		 *
		 * @param name
		 * @todo open popup with no plug
		 */
		open: function(name){
			var popupManager = _private.getPopupManager.call(this);

			if(false === popupManager.isShowedContainer){
				popupManager.isShowedContainer = true;
			}
			if(false === popupManager.isShowedPlug){
				popupManager.isShowedPlug = true;
			}

			// add to opened array
			_private.pushToOpened.call(this, name);

			// set index
			this.getPopup(name).scope().setIndex(_private.actualIndex++);
		},

		/**
		 * Logic to close popup
		 *
		 * @param name
		 */
		close: function(name){
			// remove from opened
			_private.removeFromOpened.call(this, name);

			if(0 == this.getOpenedAmount()){
				var popupManager = _private.getPopupManager.call(this);

				popupManager.isShowedContainer  = false;
				popupManager.isShowedPlug       = false;
			}
		}
	};



	return {
		/**
		 * Return config
		 *
		 * @returns {{elementIds: {manager: string, plug: string, content: string}}}
		 */
		getConfig: function(){
			return {
				elementIds: {
					'manager':  'popupsContainer',
					'plug':     'popupsPlug',
					'content':  'popupsContent'
				}
			};
		},

		/**
		 * Return config elements data (elementId, DOM element, angular scope)
		 *
		 * @returns {{}}
		 */
		getElementData: function(){
			if(null !== _private.elementData){
				return _private.elementData;
			}

			// Store element data
			_private.elementData = {};

			var ids = this.getConfig().elementIds;

			angular.forEach(ids, function(value, key){
				var elem = $elem(value);

				_private.elementData[key] = {
					'id':       value,
					'element':  elem,
					'scope':    elem.scope.bind(elem)
				}
			});

			return _private.elementData;
		},

		/**
		 * Open popup
		 *
		 * @param name
		 */
		open: function(name /*, other params... */){
			var popup       = this.getPopup(name);
			var popupScope  = popup.scope();

			var args  = Array.prototype.slice.call(arguments, 0);
			// remove first argument name
			// set at first argument element to popup
			args[0] = popup.element[0];

			popupScope.open.apply(popupScope, args);
		},

		/**
		 * Close popup
		 *
		 * @param name
		 */
		close: function(name){
			this.getPopup(name).scope().close();
		},

		/**
		 * Close all popup
		 */
		closeAll: function(){
			var reverseOpened = angular.copy(_private.opened).reverse();

			angular.forEach(reverseOpened, function(name){
				this.close(name);
			}.bind(this));
		},

		/**
		 * Return true when popup with param $name is opened
		 *
		 * @param name
		 * @returns {boolean}
		 */
		isOpened: function(name){
			return (-1 !== _.indexOf(_private.opened, name));
		},

		/**
		 * Return array of opened popups
		 *
		 * @returns {Array}
		 */
		getOpened: function(){
			return _private.opened;
		},

		/**
		 * Return amount of opened popups
		 *
		 * @returns {Number}
		 */
		getOpenedAmount: function(){
			return this.getOpened().length;
		},

		/**
		 * Add new popup
		 *
		 * @param name
		 */
		push: function(name){
			_private.popups[name] = {
				'element': $elem(name),
				'scope': function(controller){
					return $elem(controller).scope();
				}.bind(null, name)
			};

			$rootScope.$on('Popups:close:' + name, function(event){
				_private.close.call(this, name)
			}.bind(this));
			$rootScope.$on('Popups:open:' + name, function(event){
				_private.open.call(this, name);
			}.bind(this));
		},

		/**
		 * Return popup data (DOM element, angular scope)
		 *
		 * @param name
		 * @returns {*}
		 */
		getPopup: function(name){
			return _private.popups[name];
		}
	}
});