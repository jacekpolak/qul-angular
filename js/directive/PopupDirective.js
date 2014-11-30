/**
 * Directive of one instance of popup
 *
 * Attributes:
 *
 * name = <string>
 * no-controller = null
 * parent-controller = <string>
 *
 * Example:
 *
 * <popup name="PopupFoo" no-controller parent-controller="PopupBootstrapController">
 */
qul.directive('popup', function($compile, $rootScope, $elem, Popups) {
	var PopupDirectiveClass = {
		/**
		 *
		 * @param contentOld
		 * @param attrs
		 * @returns {*}
		 */
		getNewElement: function(contentOld, attrs){
			var elem = angular.element('<div>' + contentOld + '</div>');

			angular.forEach(attrs, function(value, key){
				if('$' === key.substr(0, 1)){
					// skip angular data
					return;
				}

				elem.attr(key, value);
			});

			elem.attr('id', attrs.name);
			elem.addClass('qulPopup');

			// angular attributes
			if(undefined === attrs.noController){
				// create new controller
				elem.attr('ng-controller', attrs.name + 'Controller');
			}
			elem.attr('ng-init', 'init()');
			elem.attr('ng-show', 'isShowed');
			elem.attr('ng-style', 'getStyle()');

			var elements = [];

			// root
			elements.push(angular.element('<div class="popupParent" ng-controller="PopupController" ng-init="setControllerName(\'' + attrs.name + '\')"></div>'));
			if(attrs.parentController){
				// parent
				elements.push(angular.element('<div ng-controller="' + attrs.parentController + '"></div>'));
			}
			// main
			elements.push(elem);

			for(var i = 0, ilen = elements.length - 1; i < ilen; i++){
				elements[i].append(elements[i+1]);
			}

			return elements[0];
		},

		/**
		 *
		 * @param scope
		 * @param element
		 * @param attrs
		 */
		prepare: function(scope, element, attrs){
			var elemData    = Popups.getElementData();
			var root        = elemData.content.element;
			var contentOld  = element.html();
			var elementNew  = this.getNewElement(contentOld, attrs);

			// remove directive element
			element.remove();

			// add element
			root.append(elementNew);
		},

		/**
		 *
		 * @param name
		 */
		servicePush: function(name){
			Popups.push(name);
		}
	};

	return {
		restrict: 'E',
		terminal: true,
		priority: 1001, // before ng-repeat
		link: function(scope, element, attrs){
			this.prepare(scope, element, attrs);
			this.servicePush(attrs.name);
		}.bind(PopupDirectiveClass)
	};
});