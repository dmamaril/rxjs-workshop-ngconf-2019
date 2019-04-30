import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const HOST = 'http://localhost:8080';

@Injectable()
export class TodosService {
  getTodos() {
    return this.http.get<Todo[]>(`${HOST}/todos/`);
  }

  markDone(todoId: number) {
    return this.http.delete<Todo[]>(`${HOST}/todos/${todoId}`);
  }

  addTodo(description: string) {
    return this.http.post<Todo[]>(`${HOST}/todos`, { description });
  }

  constructor(private http: HttpClient) {}
}

export interface Todo {
  description: string;
  done: boolean;
  id: number;
}
