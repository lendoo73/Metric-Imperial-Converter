'use strict';

var express     = require('express');
var bodyParser  = require('body-parser');
var expect      = require('chai').expect;
var cors        = require('cors');

var apiRoutes         = require('./routes/api.js');
var fccTestingRoutes  = require('./routes/fcctesting.js');
var runner            = require('./test-runner');

var app = express();

// Helmet: helps you secure your Express apps by setting various HTTP headers:
const helmet = require("helmet");

// The `hidePoweredBy` middleware will remove the `X-Powered-By` header.
app.use(helmet.hidePoweredBy({
  setTo: "PHP 4.2.0"
}));

// Your page could be put in a <frame> or <iframe> without your consent.
// This can result in [clickjacking attacks]
app.use(helmet.frameguard({
  action: "deny"
}));

// Cross-site scripting (XSS) is a very frequent type of attack where malicious
// script are injected into vulnerable pages, on the purpous of stealing sensitive
// data like session cookies, or passwords. The basic rule to lower the risk
// of an XSS attack is simple: **"Never trust user's input"**, so as a developer
// you should always *sanitize* all the input coming from the outside.
// This includes data coming from forms, GET query urls, and even from
// POST bodies. Sanitizing means that you should find and encode the characters
// that may be dangerous e.g. `<`, `>`.
// The `X-XSS-Protection` HTTP header is a basic protection.  When the browser
// detects a potential injected script using an heuristic filter,
// it changes it, making the script not executable.
app.use(helmet.xssFilter());

// Browsers can use content or MIME sniffing to override response `Content-Type`
// headers to guess and process the data using an implicit content type.
// While this can be convenient in some scenarios, it can also lead to
// some dangerous attacks.
// This middleware sets the X-Content-Type-Options header to `nosniff`,
// instructing the browser to not bypass the provided `Content-Type`.
app.use(helmet.noSniff()); 

app.use('/public', express.static(process.cwd() + '/public'));

app.use(cors({origin: '*'})); //For FCC testing purposes only

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Index page (static HTML)
app.route('/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
  });

//For FCC testing purposes
fccTestingRoutes(app);

//Routing for API 
apiRoutes(app);  
    
//404 Not Found Middleware
app.use(function(req, res, next) {
  res.status(404)
    .type('text')
    .send('Not Found');
});

//Start our server and tests!
app.listen(process.env.PORT || 3000, function () {
  console.log("Listening on port " + process.env.PORT);
  if(process.env.NODE_ENV==='test') {
    console.log('Running Tests...');
    setTimeout(function () {
      try {
        runner.run();
      } catch(e) {
        var error = e;
          console.log('Tests are not valid:');
          console.log(error);
      }
    }, 1500);
  }
});

module.exports = app; //for testing
