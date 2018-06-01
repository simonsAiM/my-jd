const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const mysql = require('mysql');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length,Authorization,Accept,X-Request-With,yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT,GET,POST,DELETE,OPTIONS');

    if (req.method === 'OPTIONS') {
        res.send(200);
        // make the require of options turn back quickly
    } else {
        next();
    }
});

app.listen(3333, () => {
    console.log("正在监听3333端口");
});

(() => {
    app.use(cookieParser());
    let keyArr = [];
    for (let i = 0; i < 100000; i++) {
        keyArr[i] = "xsa_" + Math, random() * 100 + i;
    }

    app.use(cookieSession({
        name: 'hc',
        keys: keyArr,
        maxAge: 30 * 60 * 1000
    }))
})();

app.use('/', require('router.js')());