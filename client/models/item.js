'use strict';

angular.module('groceries')
.factory('Item', function($http, nodeUrl){
  
  function Item(){}
  
  Item.save = function(item){
    return $http.post(nodeUrl + '/items', item);
  };
  
  Item.getRecords = function(){
    return $http.get(nodeUrl + '/items');
  };
  Item.destroy = function(item){
    return $http.delete(nodeUrl + '/items/' + item._id);
  };
  
  return Item;
});
