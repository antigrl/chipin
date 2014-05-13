/*
@license HTTP Auth Interceptor Module for AngularJS
(c) 2012 Witold Szczerba
License: MIT
*/


(function() {
  (function() {
    "use strict";
    /*
call this function to indicate that authentication was successfull and trigger a
retry of all deferred requests.
@param data an optional argument to pass on to $broadcast which may be useful for
example if you need to pass through details of the user that was logged in
*/

    /*
$http interceptor.
On 401 response (without 'ignoreAuthModule' option) stores the request
and broadcasts 'event:angular-auth-loginRequired'.
*/

    angular.module("http-auth-interceptor", ["http-auth-interceptor-buffer"]).factory("authService", [
      "$rootScope", "httpBuffer", function($rootScope, httpBuffer) {
        return {
          loginConfirmed: function(data) {
            $rootScope.$broadcast("event:auth-loginConfirmed", data);
            return httpBuffer.retryAll();
          }
        };
      }
    ]).config([
      "$httpProvider", function($httpProvider) {
        var interceptor
        interceptor = [
          "$rootScope", "$q", "httpBuffer", function($rootScope, $q, httpBuffer) {
            var error, success;
            success = function(response) {
              return response
            };
            error = function(response) {
              if (response.status === 401 && !response.config.ignoreAuthModule) {
                window.location = '/#/login'
              }
              return $q.reject(response);
            };
            return function(promise) {
              return promise.then(success, error);
            };
          }
        ];
        $httpProvider.responseInterceptors.push(interceptor);
        return $httpProvider.defaults.transformRequest.push();
      }
    ]);
    /*
Private module, a utility, required internally by 'http-auth-interceptor'.
*/

    return angular.module("http-auth-interceptor-buffer", []).factory("httpBuffer", [
      "$injector", function($injector) {
        /*
Holds all the requests, so they can be re-requested in future.
*/

        /*
Service initialized later because of circular dependency problem.
*/

        var $http, buffer, retryHttpRequest;
        retryHttpRequest = function(config, deferred) {
          var $http, errorCallback, successCallback;
          successCallback = function(response) {
            return deferred.resolve(response);
          };
          errorCallback = function(response) {
            return deferred.reject(response);
          };
          $http = $http || $injector.get("$http");
          return $http(config).then(successCallback, errorCallback);
        };
        buffer = [];
        $http = void 0;
        return {
          /*
Appends HTTP request configuration object with deferred response attached to buffer.
*/

          append: function(config, deferred) {
            return buffer.push({
              config: config,
              deferred: deferred
            });
          },
          /*
Retries all the buffered requests clears the buffer.
*/

          retryAll: function() {
            var i;
            i = 0;
            while (i < buffer.length) {
              retryHttpRequest(buffer[i].config, buffer[i].deferred);
              ++i;
            }
            return buffer = [];
          }
        };
      }
    ]);
  })();

}).call(this);
