const MachineTaskController = require('./controllers/MachineTaskController');

const LogController = require('./controllers/LogController');

const AuthenticationController = require('./controllers/AuthenticationController');
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy');

const MachineController = require('./controllers/MachineController');

const TaskController = require('./controllers/TaskController');

const isAuthenticated = require('./policies/isAuthenticated');

module.exports = (app) => {
  app.get('/machinetasks',
    MachineTaskController.index
  );

  app.get('/machinetask/:machineTaskId',
    MachineTaskController.machineTask
  );

  app.get('/logbook',
    LogController.index
  );
  
  app.post('/addlog',
    isAuthenticated,
    LogController.add
  );

  app.delete('/deletelog/:logId',
    isAuthenticated,
    LogController.delete
  );

  app.get('/log/:logId',
    isAuthenticated,
    LogController.log
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
    isAuthenticated,
    AuthenticationController.delete
  );

  app.get('/machines',
    MachineController.index
  );

  app.get('/machine/:machineId',
    MachineController.machine
  );

  app.post('/addmachine',
    isAuthenticated,
    MachineController.add
  );

  app.delete('/deletemachine/:machineId',
    isAuthenticated,
    MachineController.delete
  );

  app.get('/tasks',
    TaskController.index
  );

  app.get('/task/:taskId',
    TaskController.task
  );

  app.post('/addtask',
    isAuthenticated,
    TaskController.add
  );

  app.put('/updatetask/:taskId',
    isAuthenticated,
    TaskController.update
  );

  app.delete('/deletetask/:taskId',
    isAuthenticated,
    TaskController.delete
  );
};
