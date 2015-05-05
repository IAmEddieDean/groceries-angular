'use strict';

angular.module('groceries')
.controller('GroceryCtrl', function($scope, $window, Item){
  console.log('GroceryCtrl loaded');

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
  
});
