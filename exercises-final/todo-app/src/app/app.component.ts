import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { map, retry, concatAll, startWith } from 'rxjs/operators';
import { TodosService, Todo } from './todos-service';


/**
 * NOTE: This is just _one_ of many, many ways to solve this problem
 * with RxJS. The only "right" solution is one that works for you and
 * is maintainable.
 */
export const enum TodoActionType {
  GET_ALL = 0,
  MARK_DONE = 1,
  ADD_NEW = 2,
}

export class TodoAction {
  constructor(public type: TodoActionType, public payload?: any) {}
}

@Component({
  selector: 'app-root',
  template: `
    <h1>THE WORLD'S WORST TODO APP</h1>
    <div class="todo" *ngFor="let todo of (todos$ | async)">
      <button (click)="markDone(todo.id)">done</button>
      {{todo.description}}
    </div>
    <div>
      <input #description (keyup.enter)="addTodo(description.value)" type="text"/>
      <button (click)="addTodo(description.value)">Add Todo</button>
    </div>
  `,
  styleUrls: ['./app.component.css'],
  providers: [
    TodosService,
  ],
})
export class AppComponent {
  action$ = new Subject<TodoAction>();

  todos$ = this.action$.pipe(
    startWith(new TodoAction(TodoActionType.GET_ALL)),
    map(action => {
      switch (action.type) {
        case TodoActionType.MARK_DONE:
          return this.todosService.markDone(action.payload);
        case TodoActionType.ADD_NEW:
          return this.todosService.addTodo(action.payload);
        case TodoActionType.GET_ALL:
        default:
          return this.todosService.getTodos();
      }
    }),
    map(http$ => http$.pipe(retry())),
    concatAll(),
  );

  markDone(id: number) {
    this.action$.next(new TodoAction(TodoActionType.MARK_DONE, id));
  }

  addTodo(description: string) {
    this.action$.next(new TodoAction(TodoActionType.ADD_NEW, description));
  }

  constructor(private todosService: TodosService) {
  }
}

