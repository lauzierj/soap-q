var Q = require("q");
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
    for (var prop in client) {
        if ("function" === typeof client[prop] 
            && defaults.indexOf(prop) == -1) {
            var newName = prop + "Q";
            client[newName] = function (args, options) {
                var deferred = Q.defer();
                client[prop](args, function (err, result) {
                    if (err) deferred.reject(err);
                    else deferred.resolve(result);
                }, options);
                return deferred.promise;
            }
        }
    }
}
module.exports = function (soap) {
    soap = soap || require("soap");
    soap.createClientQ = function (url, cb) {
        var deferred = Q.defer();
        soap.createClient(url, function (err, client) {
            if (err) return deferred.reject(err);
            client = promisifyClient(client);
            deferred.resolve(client);
        })
        return deferred.promise;
    }
    return soap;
}