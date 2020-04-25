const express = require('express'),
      bodyParser = require('body-parser'),
      cors = require('cors');
const tweets = require('./tweets');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./build/webpack.base.conf');

var webpackServer = new WebpackDevServer(webpack(webpackConfig), {
  publicPath: webpackConfig.output.publicPath,
  hot: true,
  historyApiFallback: true,
  stats: { colors: true }
});


// const functions = require('firebase-functions');
const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors({origin: true}));


var port = process.env.PORT || 4000;
app.use(bodyParser.urlencoded({
  extended: false
}));
app.all('/*', function(req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

// app.get('/twitters', async (req, res) => {
//     try {
//     let allTweets =  await tweets.getTweet();
        
//         res.send(allTweets);
       
//     } catch (err) {
//         console.log("err: "+ err);
//         res.send({status: 500});
//     }
// });

app.post('/search', async (req, res) => {
    const name = req.body.screen_name;
    try {
        let allTweets =  await tweets.searchTweet(name);
            
            res.send(allTweets);
           
        } catch (err) {
            console.log("err: "+ err);
            res.send({status: 500});
        }
});

webpackServer.listen(9000, 'localhost', function ( err ) {
  if ( err ) { console.log(err); }
});


var server = app.listen(4000, function () {
  var host = 'localhost';
  var port = server.address().port;

  console.log('Vue server listening at http://%s:%s', host, port);
});
// exports.app = functions.https.onRequest(app);

