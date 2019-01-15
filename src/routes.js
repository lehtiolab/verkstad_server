const MachineTaskController = require('./controllers/MachineTaskController');

const LogController = require('./controllers/LogController');

const AuthenticationController = require('./controllers/AuthenticationController');
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy');

const MachineController = require('./controllers/MachineController');

const TaskController = require('./controllers/TaskController');

module.exports = (app) => {
  app.get('/duemachinetasks',
    MachineTaskController.index
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

  app.delete('/deleteuser/:userId',
    AuthenticationController.delete
  );

  app.get('/machines',
    MachineController.index
  );

  app.post('/addmachine',
    MachineController.add
  );

  app.delete('/deletemachine/:machineId',
    MachineController.delete
  );

  app.get('/tasks',
    TaskController.index
  );

  app.get('/task/:taskId',
    TaskController.task
  );

  app.post('/addtask',
    TaskController.add
  );

  app.delete('/deletetask/:taskId',
    TaskController.delete
  );
};
