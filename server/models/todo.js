var express = require('express');
var router = express.Router();
var models = require('../server/models/index');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('index', { title: 'Express' });
});

//Input new todo item
router.post('/todo', function(req, res) {
  models.Todo.create({
    title: req.body.title
  }).then(function(todo) {
    res.json(todo);
  });
});

//Output all items in the list
router.get('/todo', function(req, res) {
  models.Todo.findAll({}).then(function(todos) {
    res.json(todos);
  });
});

//output a specific item in the list
router.get('/todo', function(req, res) {
  models.Todo.find({
    where: {
      id: req.params.id
    }
  }).then(function(todo) {
    res.json(todo);
  });
});

router.delete('/todo:id', function(req, res) {
  models.Todo.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(todo) {
    res.json(todo);
  });
});

router.put('/todo:id', function(req, res) {
  models.Todo.find({
    where: {
      id: req.params.id
    }
  }).then(function(todo) {
    if(todo) {
      todo.updateAttributes({
        title: req.body.title,
        complete: req.body.complete
      }).then(function(todo) {
        res.send(todo);
      });
    }
  });
});

router.get('/descending', function(req, res) {
  var descending = [];
  var counter = 0;
  models.Todo.findAll({}).then(function(todos) {
    for(var x = todos.length; x >- 0; x--) {
      descending[counter] = todos[x];
      counter++;
    }
  });
});

module.exports = router;
