'use strict';

angular.module('groceries')
.controller('GroceryCtrl', function($scope, $window, Item){
  console.log('GroceryCtrl loaded');
  
  $scope.item = {};
  $scope.item.photo = '';
  
  $scope.cameraOn = function(){
    $window.Webcam.attach('#camera');
  };
  $scope.cameraOff = function(){
    $window.Webcam.reset();
  };
  $scope.takePhoto = function(){
    $window.Webcam.snap(function(dataUrl){
      $scope.item.photo = dataUrl;
    });
  };
  $scope.save = function(item){
    Item.save(item)
    .then(function(){
      $scope.item = {};
    });
  };
});
