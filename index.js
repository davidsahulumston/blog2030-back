const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const { config } = require('./config/index');
const blogImagesApi = require('./routes/blogImages');
const blogVideosApi = require('./routes/blogVideos');

const {
  logErrors,
  wrapErrors,
  errorHandler
} = require('./utils/middleware/errorHandlers');

const notFoundHandler = require('./utils/middleware/notFoundHandler');

// use cors
app.use(cors());

app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))


// body parser
app.use(express.json());



blogImagesApi(app);
// app.get();
blogVideosApi(app);

// catch 404
app.use(notFoundHandler);

// Error middleware
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, function() {
  console.log(`listening http://localhost:${config.port}`);
});
