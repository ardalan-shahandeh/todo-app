import { db } from "../../db";
import { sendError } from "h3";

export default defineEventHandler((e) => {
  // 1)Extract the path parameter

  const method = e.req.method;
  const context = e.context;
  const { id } = context.params;

  // 2) find todo in db
  const findTodoById = (todoId) => {
    let index;
    const todo = db.todos.find((t, i) => {
      if (t.id === todoId) {
        index = i;
        return true;
      }
      return false;
    });

    // 3)throw error if todo is not found
    if (!todo) {
      const TodoNotFoundError = createError({
        statusCode: 404,
        statusMessage: "Todo not found",
        data: {},
      });

      sendError(e, TodoNotFoundError);
    }

    return { todo, index };
  };

  if (method === "PUT") {
    const { todo, index } = findTodoById(id);

    // 4)update the completed status
    const updateTodo = {
      ...todo,
      completed: !todo.completed,
    };

    db.todos[index] = updateTodo;

    // 5) Return the update todo
    return updateTodo;
  }

  if (method === "DELETE") {
    const { index } = findTodoById(id);

    db.todos.splice(index, 1);

    return {
      message: "item deleted",
    };
  }
});
