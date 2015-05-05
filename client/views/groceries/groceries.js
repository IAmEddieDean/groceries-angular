'use strict';

angular.module('groceries')
.controller('GroceryCtrl', function($scope, $window, Item){
  
  $scope.item = {};
  $scope.camera = false;
  
  getRecords();
  
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
  $scope.save = function(item){
    Item.save(item)
    .then(function(returnedRecord){
      $scope.item = {};
      $scope.items.push(returnedRecord.data);
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
    // Item.update(item)
    // .then(function(returnedRecord){
    //   //
    // })
  };
  $scope.edit = function(item){
    $scope.item = item;
    
  };
  
});
