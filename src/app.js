const config = require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
//const fs = require('fs');
const compression = require('compression');
const helmet = require('helmet');

const { sequelize } = require('./models');

const app = express();

process.on('SIGINT', function() {
  process.exit();
});

//const accessLogStream = fs.createWriteStream(config.log.path + "/access.log", {flags: 'a'});
app.use(morgan('combined')); //, {
  //stream: accessLogStream,
//}));

app.use(bodyParser.json());
app.use(cors());
app.use(compression());
app.use(helmet());
app.use(express.static('public'));

require('./passport');

require('./routes')(app);

sequelize.sync()
  .then(() => {
    app.listen(config.port);
    console.log(`Server started on port ${config.port}`);
  });
