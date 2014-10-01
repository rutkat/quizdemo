app.factory('Quiz', function() {

    var data = [{'q': 'Are you ready?', 'a': 'yes'}];

    return {
      getData: function() {
        return data;
      }
    };
});


app.factory('storageService', function ($rootScope) {

    function storageSupported() {
        try {
            return 'localStorage' in window && window['localStorage'] !== null;
        } catch (e) {
            return false;
        }
    }

    if (storageSupported) {
        return {
            
            get: function (key) {
               return localStorage.getItem(key);
            },

            save: function (key, data) {
               localStorage.setItem(key, data);
            },

            remove: function (key) {
                localStorage.removeItem(key);
            },
            
            clearAll : function () {
                localStorage.clear();
            }
        }
    }
});
/*
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
*/