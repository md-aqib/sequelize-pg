const Todo = require("../models").Todo;

module.exports = {
  //create new todo
  create(req, res) {
    return Todo.create({
      title: req.body.title,
    })
      .then((todo) => res.status(201).send(todo))
      .catch((error) => res.status(400).send(error));
  },
  //get all todos
  list(req, res) {
    return Todo.findAll({
      include: [
        {
          model: TodoItem,
          as: "todoItems",
        },
      ],
    })
      .then((todos) => res.status(200).send(todos))
      .catch((error) => res.status(400).send(error));
  },
  //get single todo
  retrieve(req, res) {
    return Todo.findById(req.params.todoId, {
      include: [
        {
          model: TodoItem,
          as: "todoItems",
        },
      ],
    })
      .then((todo) => {
        if (!todo) {
          return res.status(404).send({
            message: "Todo Not Found",
          });
        }
        return res.status(200).send(todo);
      })
      .catch((error) => res.status(400).send(error));
  },
  //update todo
  update(req, res) {
    return Todo.findById(req.params.todoId, {
      include: [
        {
          model: TodoItem,
          as: "todoItems",
        },
      ],
    })
      .then((todo) => {
        if (!todo) {
          return res.status(404).send({
            message: "Todo Not Found",
          });
        }
        return todo
          .update({
            title: req.body.title || todo.title,
          })
          .then(() => res.status(200).send(todo)) // Send back the updated todo.
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
  //delete todo
  destroy(req, res) {
    return Todo.findById(req.params.todoId)
      .then((todo) => {
        if (!todo) {
          return res.status(400).send({
            message: "Todo Not Found",
          });
        }
        return (
          todo
            .destroy()
            //.then(() => res.status(204).send()) -Personally, I prefer returning 204 No Content
            .then(() =>
              res.status(200).send({ message: "Todo deleted successfully." })
            )
            .catch((error) => res.status(400).send(error))
        );
      })
      .catch((error) => res.status(400).send(error));
  },
};
