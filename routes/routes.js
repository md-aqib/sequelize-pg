const todosController = require("../controllers/index").todos;
const todoItemsController = require("../controllers/index").todoItems;

module.exports = (app) => {
  app.get("/api", (req, res) =>
    res.status(200).send({
      message: "Welcome to the Todos API!",
    })
  );
  //todo
  app.post("/api/todos", todosController.create);
  app.post("/api/todos", todosController.list);
  app.get("/api/todos/:todoId", todosController.retrieve);
  app.put("/api/todos/:todoId", todosController.update);
  app.delete("/api/todos/:todoId", todosController.destroy);
  //todoItem
  app.post("/api/todos/:todoId/items", todoItemsController.create);
  app.put("/api/todos/:todoId/items/:todoItemId", todoItemsController.update);
  app.delete(
    "/api/todos/:todoId/items/:todoItemId",
    todoItemsController.destroy
  );

  // For any other request method on todo items, we're going to return "Method Not Allowed"
  app.all("/api/todos/:todoId/items", (req, res) =>
    res.status(405).send({
      message: "Method Not Allowed",
    })
  );
};
