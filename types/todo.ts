import { Id } from "../convex/_generated/dataModel";

export interface Todo {
  _id: Id<"todos">;
  _creationTime: number;
  text: string;
  completed: boolean;
  order: number;
  createdAt: number;
}

export type FilterType = 'all' | 'active' | 'completed';