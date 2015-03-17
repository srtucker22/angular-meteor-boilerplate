(function(){
  angular.module('app').factory('authService', authService);

  authService.$inject = ['$rootScope', '$q'];

  function authService($rootScope, $q){
    return {
      getLoginStatus: getLoginStatus
    };

    function getLoginStatus(roles){
      var defer = $q.defer();
      $rootScope.currentUserPromise.then(function(currentUser){
        if(currentUser){
          if(roles){
            if(currentUser.roles && currentUser.roles.__global_roles__ && _.intersection(currentUser.roles.__global_roles__, roles).length > 0){
              defer.resolve(currentUser);
            }else{
              defer.reject({status: 401, description: 'unauthorized'});
            }
          }else{
            defer.resolve(currentUser);
          }
        }else{
          defer.reject({status: 401, description: 'unauthorized'});
        }
      }, function(err){
        defer.reject(err);
      });
      return defer.promise;
    }
  }
})();