/**
 * Directive of popups group (now can be only one of this element)
 *
 * Attributes:
 *
 * Example:
 *
 * <popups>
 *   <popup name="PopupFoo"></popup>
 *   <popup name="PopupBar"></popup>
 * </popups>
 */
qul.directive('popups', function($compile, Popups) {
	var PopupsDirectiveClass = {
		/**
		 *
		 * @param element
		 */
		prepare: function(element){
			var elementIds  = Popups.getConfig().elementIds;
			var html      = '';

			html += '<div id="' + elementIds.manager + '" ng-controller="PopupManagerController" ng-show="isShowedContainer">';
			html += '  <div  id="' + elementIds.plug + '" ng-show="isShowedPlug"></div>';
			html += '  <div id="' + elementIds.content + '">';
			html += '    <!-- All popups -->';
			html += '  </div>';
			html += '</div>';

			element.append(angular.element(html));
		},

		/**
		 *
		 * @param element
		 * @param scope
		 */
		compile: function(element, scope){
			$compile(element.contents())(scope);
		}
	};

	return {
		restrict: 'E',
		compile: function(element, attrs){
			return {
				pre: function(){
					this.prepare(element);
				}.bind(this),
				post: function(scope){
					this.compile(element, scope);
				}.bind(this)
			}
		}.bind(PopupsDirectiveClass)
	};
});