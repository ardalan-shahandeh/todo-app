import { db } from "../../db";

export default defineEventHandler((e) => {
  console.log({ e });
  const method = e.req.method;

  if (method === "GET") {
    return db.todos;
  }

  if (method === "POST") {
  }

  if (method === "PUT") {
  }

  if (method === "DELETE") {
  }
});
