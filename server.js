const express = require('express');
const app = express();
const path = require('path');
const httpProxy = require('http-proxy');

const bodyparser = require("body-parser");
const cookieparser = require("cookie-parser");

const mongoose = require("mongoose");
mongoose.connect("mongodb://admin:moonstarmagicaardvark@ds019698.mlab.com:19698/pinterest");

var User = require("./src/models/User.js");
var Pin = require("./src/models/Pin.js");

const isProduction = process.env.NODE_ENV === 'production';
const port = isProduction ? process.env.PORT || 4000 : 3000;
const publicPath = isProduction ? path.resolve(__dirname, 'build') : path.resolve(__dirname, 'src');

app.set("view options", {layout: false});
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
app.use(cookieparser());
app.use(express.static(publicPath));

// We only want to run the workflow when not in production
if (!isProduction) {

    const Webpack = require('webpack');
    const WebpackDevServer = require('webpack-dev-server');
    const webpackConfig = require('./webpack.config.js');
    const proxy = httpProxy.createProxyServer();

    // First we fire up Webpack an pass in the configuration we
    // created
    var bundleStart = null;
    const compiler = Webpack(webpackConfig);

    // We give notice in the terminal when it starts bundling and
    // set the time it started
    compiler.plugin('compile', function() {
        console.log('Bundling...');
        bundleStart = Date.now();
    });

    // We also give notice when it is done compiling, including the
    // time it took. Nice to have
    compiler.plugin('done', function() {
        console.log('Bundled in ' + (Date.now() - bundleStart) + 'ms!');
    });

    const bundler = new WebpackDevServer(compiler, {

        // We need to tell Webpack to serve our bundled application
        // from the build path. When proxying:
        // http://localhost:3000/build -> http://localhost:8080/build
        publicPath: '/build/',

        // Configure hot replacement
        hot: true,

        historyApiFallback: true,

        // The rest is terminal configurations
        quiet: false,
        noInfo: true,
        stats: {
            colors: true
        }
    });

    // We fire up the development server and give notice in the terminal
    // that we are starting the initial bundle
    bundler.listen(8080, 'localhost', function () {
        console.log('Bundling project, please wait...');
    });


    // Any requests to localhost:3000/build is proxied
    // to webpack-dev-server
    app.all('/build/*', function (req, res) {
        proxy.web(req, res, {
            target: 'http://localhost:8080'
        });
    });

    // It is important to catch any errors from the proxy or the
    // server will crash. An example of this is connecting to the
    // server when webpack is bundling
    proxy.on('error', function (e) {
        console.log('Could not connect to proxy, please try again...');
    });
}

app.all('/', function (req, res) {
    res.sendFile(`${publicPath}/index.html`);
});

app.post("/login", function(req, res) {
    var un = req.body.username;
    var pw = req.body.password;


    /*
     * response: 1 = success
     * response: 2 = wrong password
     * response: 3 = username not found
     * */


    User.findOne({
        username: un
    }, function(err, doc) {
        if(err) throw err;
        if(doc) {
            if (doc.password === pw) {
                res.json({response: 1});
            } else {
                res.json({response: 2});
            }
        } else {
            res.json({response: 3});
        }
    });
});

app.post("/signup", function(req, res) {
    var un = req.body.username;
    var pw = req.body.password;

    /*
     * response: 1 = user signed up
     * response: 2 = this account name already used
     */

    User.findOne({
        username: un
    }, function(err, doc) {
        if(err) throw err;
        if(doc) {
            res.json({response: 2});
        } else {
            var user = new User({
                username: un,
                password: pw,
                pins: []
            });
            console.log(user);
            user.save();
            res.json({response: 1});
        }
    })
});

app.get("/logout", function(req, res) {

});

app.get("/recent", function(req, res) {
    Pin.find({}).sort({date: -1}).limit(10).exec(function(err, doc) {
        if(err) throw err;
        res.json(doc);
    })
});

app.get("/user/:username", function(req, res) {
    var pins = [];
    User.findOne({
        username: req.params.username
    }).sort({date: -1}).exec(function (err, doc) {
        if (err) throw err;
        doc.pins.map(function (val) {
            Pin.findOne({
                _id: val
            }, function (err, doc2) {
                if (err) throw err;
                pins.push(doc2);
                if (pins.length === doc.pins.length) {
                    res.json(pins);
                }
            });
        });
    });
});




app.post("/user/:username/new", function(req, res) {
    var un = req.params.username;
    var src = req.body.src;
    var title = req.body.title;

    /*
     * response: 1 = added pin
     * response: 2 = pin already exists for user
     */
    Pin.findOne({
        author: un,
        src: src
    }, function(err, doc2) {
        if(err) throw err;
        if(doc2) {
            res.json({response: 2});
        } else {
            var pin = new Pin({
                title: title,
                author: un,
                src: src
            });

            pin.save(function(err, p) {
                if(err) throw err;
                User.update({
                    username: un
                }, {
                    $push: {
                        pins: p._id
                    }
                }, function(err, doc) {
                    if(err) throw err;
                });
            });
            res.json({response: 1});
        }
    })
});

app.listen(port, function () {
    console.log('Server running on port ' + port);
});