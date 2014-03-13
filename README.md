soap-q
==========

[kriskowal's Q](http://documentup.com/kriskowal/q/) support for [node-soap](https://github.com/vpulim/node-soap).

Inspired by [mongoose-q](https://github.com/iolo/mongoose-q)

usage
-----

* to apply Q with default suffix 'Q':

```javascript
var soapQ = require('soap-q')(require('soap'));
// shortest way: soap will be loaded by soap-q
var soapQ = require('soap-q')();
```

* create Q-applied client:

```javascript
soapQ.createClientQ("http://example.com/wsdl")
    .then(function(clientQ){
        /* ... use the client's nifty Q methods ...*/
    })
    .fail(function(err){ /* Handle client creation failure */})
```

* use Q-applied `client` methods:

```javascript
soap.createClientQ(wsdlUrl)
  .then(function(clientQ){
    clientQ.MyMethodQ(args, options).then(function(result){
    /* use result */
    });
  
  })
```
> NOTE: soap-q does not currently return the raw xml.

todo
-----
mongoose-q has safe features that need copying, like

* ensure soap-q hasn't already been applied to soap
* allow custom prefix/suffix functionality
