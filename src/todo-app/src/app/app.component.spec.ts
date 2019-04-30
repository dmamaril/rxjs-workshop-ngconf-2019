import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TestScheduler } from 'rxjs/testing';
import { throwError, of, defer } from 'rxjs';
import { TodosService } from './todos-service';

describe('AppComponent', () => {
  // WORKSHOP_START
  /**
   * **TODO**
   * 
   * - Write tests that prove you've solved the issues with
   *   Messages coming back out of order, and errors being handled appropriately.
   * - Try out Marble Tests with `TestScheduler.run`.
   */
  // WORKSHOP_END
  // FINAL_START
  let rxTest: TestScheduler;

  beforeEach(async(() => {
    rxTest = new TestScheduler((actual: any, expected: any) => {
      expect(actual).toEqual(expected);
    });

    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should use marbles', () => {
    rxTest.run(({ hot, expectObservable }) => {
      const s = hot('---o---o---o---o---|');
      const exp = '  ---o---o---o---o---|';
      expectObservable(s).toBe(exp)
    });
  });

  it('should retry failed requests', () => {
    let calls = 0;
    const fakeTodosService = {
      getTodos() {
        return defer(() => {
          if (++calls === 3) {
            return of([]);
          }
          return throwError('Bad request');
        });
      }
    };

    TestBed.overrideProvider(TodosService, { useValue: fakeTodosService });

    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const todoEls: HTMLDivElement[] = Array.from(fixture.nativeElement.querySelectorAll('.todo'));
    expect(todoEls.length).toBe(0);
    expect(calls).toBe(3);
  });


  it('should retry failed requests (marble edition)', () => {
    rxTest.run(({ cold, expectObservable }) => {
      const failed = '  ------#';
      //                      ------#
      //                            -------(o|)
      const success = ' -------(o|)';
      const expected = '-------------------o-';

      let calls = 0;
      const fakeTodosService = {
        getTodos() {
          return defer(() => calls++ < 4 ? cold(failed) : cold(success));
        }
      };
      TestBed.overrideProvider(TodosService, { useValue: fakeTodosService });

      const fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges();

      expectObservable(fixture.componentInstance.todos$).toBe(expected);
    });
  });

  it('should not allow out of order results (marble edition)', () => {
    const values = {
      a: [{ description: 'original', id: 1 }],
      b: [{ description: 'original', id: 1 }, { description: 'test', id: 2 }],
      c: [{ description: 'test', id: 2 }],
    };

    // Setup all our marbles. (spaces don't count)
    const getTodos = '-----------(a|)';
    const addTodo = '                -------------------(b|)';
    const markDone = '                                  ----(c|)';
    const expected = '-----------a----------------------b---c-----';
    const act = '     ---------------A--B------------------------';

    rxTest.run(({ cold, hot, expectObservable }) => {
      // Return cold test observables from our fake methods
      const fakeTodosService = {
        getTodos() {
          return cold(getTodos, values);
        },
        markDone(id: string) {
          return cold(markDone, values);
        },
        addTodo(description: string) {
          return cold(addTodo, values);
        }
      };

      // Setup angular test bed
      TestBed.overrideProvider(TodosService, { useValue: fakeTodosService });
      const fixture = TestBed.createComponent(AppComponent);
      const comp = fixture.componentInstance;
      // Note: todos$ | async is mounted and this point


      // Schedule an observable of functions to execute.
      const actions = {
        A: () => {
          comp.addTodo('test');
        },
        B: () => {
          comp.markDone(1);
        },
      };

      rxTest.schedule(() => {
        cold(act, actions).pipe(tap(fn => {
          fn();
        })).subscribe();
      });

      // Set up are expectations
      // Note: `expectObservable` schedules at 0.
      expectObservable(comp.todos$).toBe(expected, values);
    });
  });
  // FINAL_END
});
