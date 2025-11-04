import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Get all todos ordered by their position
export const getTodos = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("todos")
      .withIndex("by_order")
      .order("asc")
      .collect();
  },
});

// Add a new todo - FIXED VERSION
export const addTodo = mutation({
  args: { text: v.string() },
  handler: async (ctx, args) => {
    // Get the highest order number - FIXED: No index for this query
    const todos = await ctx.db
      .query("todos")
      .order("desc")
      .take(1);
    
    const maxOrder = todos.length > 0 ? todos[0].order : 0;
    
    const todoId = await ctx.db.insert("todos", {
      text: args.text,
      completed: false,
      order: maxOrder + 1,
      createdAt: Date.now(),
    });
    
    return todoId;
  },
});

// Toggle todo completion status
export const toggleTodo = mutation({
  args: { id: v.id("todos") },
  handler: async (ctx, args) => {
    const todo = await ctx.db.get(args.id);
    if (!todo) throw new Error("Todo not found");
    
    await ctx.db.patch(args.id, {
      completed: !todo.completed,
    });
  },
});

// Delete a todo
export const deleteTodo = mutation({
  args: { id: v.id("todos") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

// Update todo order (for drag and drop)
export const updateTodoOrder = mutation({
  args: {
    todoId: v.id("todos"),
    newOrder: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.todoId, {
      order: args.newOrder,
    });
  },
});

// Clear completed todos
export const clearCompleted = mutation({
  handler: async (ctx) => {
    const completedTodos = await ctx.db
      .query("todos")
      .filter((q) => q.eq(q.field("completed"), true))
      .collect();
    
    for (const todo of completedTodos) {
      await ctx.db.delete(todo._id);
    }
  },
});