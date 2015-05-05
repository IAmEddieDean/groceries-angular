'use strict';

angular.module('groceries')
.controller('GroceryCtrl', function($scope, $window, Item){
  
  $scope.item = {};
  $scope.camera = false;
  $scope.editMode = false;
  getRecords();
  $window.Webcam.set({width: 200, height: 150});
  
  function getRecords(){
    Item.getRecords()
    .then(function(response){
      
      $scope.items = response.data.items;
    });
  }
  
  
  $scope.cameraOn = function(){
    $window.Webcam.attach('#camera');
    $scope.camera = true;
  };
  $scope.cameraOff = function(){
    $window.Webcam.reset();
    $scope.camera = false;
  };
  $scope.takePhoto = function(){
    $window.Webcam.snap(function(dataUrl){
      $scope.item.image = dataUrl;
    });
  };
  $scope.create = function(item){
    Item.create(item)
    .then(function(returnedRecord){
      $scope.item = {};
      $scope.items.push(returnedRecord.data);
    })
    .catch(function(){
      $window.swal({title: 'Profile Error', text: 'There was a problem saving your profile. Please try again.', type: 'error'});
    });
  };
  $scope.destroy = function(item){
    Item.destroy(item)
    .then(function(returnedRecord){
      var item = returnedRecord.data;
      $window._.remove($scope.items, function(i){
        return i._id === item._id;
      });
    });
  };
  $scope.update = function(item){
    var itemKey = item._id;
    var newItem = angular.copy(item);
    delete newItem._id;
    delete newItem.userId;
    delete newItem.__v;
    delete newItem.createdAt;
    Item.update(newItem, itemKey)
    .then(function(returnedRecord){
      item = returnedRecord;
    });
    $scope.item = {};
    $scope.editMode = false;
  };
  $scope.edit = function(item){
    $scope.item = item;
    $scope.editMode = true;
    
  };
  $scope.toggleIsHave = function(item){
    item.isHave = item.isHave ? true : false;
    $scope.update(item);
    
  };
  
});
