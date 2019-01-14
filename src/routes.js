const DueTaskController = require('./controllers/DueTaskController');

const LogController = require('./controllers/LogController');

const AuthenticationController = require('./controllers/AuthenticationController');
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy');

const MachineController = require('./controllers/MachineController');

const TaskController = require('./controllers/TaskController');

module.exports = (app) => {
  app.get('/duetasks',
    DueTaskController.index
  );

  app.get('/logbook',
    LogController.index
  );
  
  app.post('/addlog',
    LogController.add
  );

  app.post('/signup', 
    AuthenticationControllerPolicy.signUp,
    AuthenticationController.signUp
  );

  app.post('/login',
    AuthenticationController.login
  );

  app.get('/users',
    AuthenticationController.index
  );

  app.post('/deleteuser',
    AuthenticationController.delete
  );

  app.get('/machines',
    MachineController.index
  );

  app.post('/addmachine',
    MachineController.add
  );

  app.post('/deletemachine',
    MachineController.delete
  );

  app.get('/tasks',
    TaskController.index
  );

  app.post('/addtask',
    TaskController.add
  );

  app.post('/deletetask',
    TaskController.delete
  );
};
