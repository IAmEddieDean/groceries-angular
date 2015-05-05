'use strict';

angular.module('groceries')
.factory('Item', function($http, nodeUrl){

  function Item(){}

  Item.create = function(item){
    return $http.post(nodeUrl + '/items', item);
  };
  Item.getRecords = function(){
    return $http.get(nodeUrl + '/items');
  };
  Item.destroy = function(item){
    return $http.delete(nodeUrl + '/items/' + item._id);
  };
  Item.update = function(item, itemKey){
    return $http.put(nodeUrl + '/items/' + itemKey + '/edit', item);
  };
  return Item;
});
