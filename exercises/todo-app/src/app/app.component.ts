import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { map, retry, concatAll, startWith } from 'rxjs/operators';
import { TodosService, Todo } from './todos-service';



/**
 * There is a LOT going wrong with this app. For one thing, Our server is being run from an old mobile
 * phone tied to a tree in Northern Manitoba. It is sporadically slow, and errors quite often.
 * 
 * This means that our messages may come back out of order, or worse, not at all.
 * 
 * If the responses come back out of order, then our client will get out of sync with our server,
 * and/or the UI will just jump around inexplicably. 
 * 
 * **TODO**
 * - Fix the issues mentioned above using RxJS.
 * - Write a few tests to confirm the behaviors.
 */

@Component({
  selector: 'app-root',
  template: `
    <h1>THE WORLD'S WORST TODO APP</h1>
    <div class="todo" *ngFor="let todo of todos">
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
  todos: Todo[];

  markDone(id: number) {
    this.todosService.markDone(id).subscribe(
      todos => this.todos = todos
    );
  }

  addTodo(description: string) {
    this.todosService.addTodo(description).subscribe(
      todos => this.todos = todos
    );
  }

  constructor(private todosService: TodosService) {
  }

  ngOnInit() {
    this.todosService.getTodos().subscribe(
      todos => this.todos = todos
    );
  }
}
