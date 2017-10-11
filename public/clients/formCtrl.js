angular.module('agencySite').controller('formCtrl', function($scope, formService, $http){
  $scope.test = "Mom's spaghetti";

  //session test
  $scope.sessiontest = () => {
    $http.get('/auth/session').then(function(res) {

console.log(res);

    })
  }
  // $scope.updateUser = click this ngClick to update database;
  //
  $scope.updateUser = function(form){
    console.log('ctrl', form)
    //take value of {form} from form.html data binding and submit to database
    formService.updateUser(form)
      .then(response => {
        console.log(response);
      })


  }



  // $scope.updateUser = function(){
  //   $http({
  //     method: 'PUT',
  //     url: '', //something here//
  //     data: $.param($scope.form),
  //
  //   }).success(function(data) {
  //     if (!data.success) {
  //       console.log("not passing data")
  //     }
  //     else {
  //       //
  //     }
  //   })
  // }




})
