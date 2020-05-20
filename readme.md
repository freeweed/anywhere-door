# Anywhere Door
This package use for provide The simulator server for allow cors site

## Install

To use this package you need to install it global
```
npm install anywhere-door -g
```

## Usage
### Use as server
```
door --open
```
you can also use `--port` to specific port default is `3000`, now use can go anywhere you want by pass query string `url`.

#### Example
```javascript
$.post(`http://localhost:3000?url=my-cors-site.com`, {
    "data": {......}
})
```
door will send request with method, body, header that just `same` as you send to door, and send response back to you just `same` what the cors site server send back to door.

### Use cli
```
door [--options]
```

#### Avaliable options
```
--url // require eg. "www.google.com"
--method // require eg. "get"
--header // require eg. "{Content-type: 'Application/Json'}"
--body // require eg. "{foo: 'bar'}"
```
