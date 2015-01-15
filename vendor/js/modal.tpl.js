/**
 * angular-strap
 * @version v2.1.1 - 2014-09-26
 * @link http://mgcrea.github.io/angular-strap
 * @author Olivier Louvignes (olivier@mg-crea.com)
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
'use strict';

angular.module('mgcrea.ngStrap.modal').run(['$templateCache', function($templateCache) {

  $templateCache.put('modal/modal.tpl.html',
      '<div class="modal" tabindex="-1" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-body">' +
      '<p class="text-center"><i class="icon-trash"></i></p>' +
      '<div class="modal-title text-center" ng-bind="title"></div>' +
      '<div class="body-content text-center" ng-bind-html="content"></div>' +
      '<div class="row text-center"><button type="button" class="btn btn-default" ng-click="$hide()">Cancel</button>' +
      '<button type="button" class="btn btn-default btn-delete" ng-click="del()">Delete</button></div></div></div></div></div>');

}]);