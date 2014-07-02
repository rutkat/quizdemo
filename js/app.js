var app = angular.module('myApp', ['ngRoute', 'ngAnimate']);

app.config(['$routeProvider', function ($routeProvider) {

  $routeProvider.when('/', { templateUrl: 'main.html', controller: 'MainCtrl' });
  $routeProvider.when('/create', { templateUrl: 'create.html', controller: 'MainCtrl' });
  $routeProvider.when('/play',   { templateUrl: 'play.html', controller: 'MainCtrl' });
  $routeProvider.otherwise({ redirectTo: '/'});

}]);

app.factory('Quiz', function() {

    var data = [{q: 'Are you ready?', a: 'yes'}];

    return {
      getData: function() {
        return data;
      }
    };
});


app.factory('storageService', function ($rootScope) {

    return {
        
        get: function (key) {
           return localStorage.getItem(key);
        },

        save: function (key, data) {
           localStorage.setItem(key, JSON.stringify(data));
        },

        remove: function (key) {
            localStorage.removeItem(key);
        },
        
        clearAll : function () {
            localStorage.clear();
        }
    };
});

app.factory('cacheService', function ($http, storageService) {
    
    return {
        
        getData: function (key) {
            return storageService.get(key);
        },

        setData: function (key,data) {
            storageService.save(key, data);
            return true;
        },
        
        removeData: function (key) {
            storageService.remove(key);
        }
    };
});
