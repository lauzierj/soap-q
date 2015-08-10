var Q = require("q");
    _ = require('lodash'),
    soap = require('soap');

var DEFAULTS = [
  "_initializeServices",
  "_defineService",
  "_definePort",
  "_defineMethod",
  "_invoke",
  "describe",
  "setSecurity",
  "setSOAPAction",
  "setEndpoint",
  "addSoapHeader"
];

function promisifyClient(client) {
  _.each(client, function(method, key) {
    if(typeof method == 'function' && DEFAULTS.indexOf(key) == -1)
      client[key] = function(args, options) {
        var deferred = Q.defer();
        method(args, deferred.makeNodeResolver(), options);
        return deferred.promise.spread(function(result, xml) {
          return result[key + 'Result'];
        });
      }
  });
  return client;
}

var origCreateClient = soap.createClient;
soap.createClient = function (url, options) {
  var deferred = Q.defer();
  origCreateClient.call(this, url, options, deferred.makeNodeResolver());
  return deferred.promise.then(promisifyClient);
}

module.exports = soap;
