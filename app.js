const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const router = require("./server/routes/routes.js");

app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    verify: (req, res, buf, encoding) => {
      req.rawBody = buf;
  }
}));

app.use(bodyParser.json({
    limit: '50mb',
    extended: true,
    verify: (req, res, buf, encoding) => {
      req.rawBody = buf;
  }
}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, HEAD, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    process.current_res = res;
    next();
});

app.use('/api', router);

process.on('uncaughtException', (error) => {
    const response = process.current_res;
    if (response) {
        error.message = util.format("%s CRID : %s", error.message);
        console.log('[uncaughtException] message : ', JSON.stringify(error.message));
    }
});

process.on('unhandledRejection', (reason, promise) => {
    const response = process.current_res;
    let error = new Error(reason);
    if (reason instanceof Error) {
      error = reason;
    }
    if (response) {
      error.message = util.format("%s CRID : %s", error.message);
      console.log("[unhandledRejection] reason: ", JSON.stringify(error.message));
    }
    console.log("[unhandledRejection] reason: ", JSON.stringify(error.message));
});

app.use((error, req, res, next) => {
    error.message = util.format("%s CRID : %s", error.message);
    console.log("[error] : ", JSON.stringify(error.message));
    res.status(error.status || 500).jsonp({
    message: error.message
    });
});

app.listen(4004, (error) => {
    console.log("Server running on port: 4004");
});    

module.exports = app;