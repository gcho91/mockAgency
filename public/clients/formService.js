angular.module('agencySite').service('formService', function($http){
  this.updateUser = function(form){
    console.log('service', form)
    return $http.put('/user', form)
  }
})
