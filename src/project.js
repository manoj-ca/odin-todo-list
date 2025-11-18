import { Todo } from './todo';
import { todoshow, rmtodo } from "./main";
import { clearactive } from './sidebar';

export class Project {
  constructor(name, active, todos) {
    this.name = name;
    this.active = active;
    this.todos = todos;
    this.id = crypto.randomUUID();
  }

  addTodo(todo) {
    this.todos.push(todo);
    todoshow(this);
  }

  rmTodo(id) {
    const index = this.todos.findIndex(todo => todo.id == id);
    if (index > -1) {
      this.todos.splice(index, 1);
      rmtodo(id);
    }
  }

  getTodo(id) {
    const index = this.todos.findIndex(todo => todo.id == id);
    if (index > -1) {
      return this.todos[index];
    } else {
      return null;
    }
  }

  setTodo(id, title, desc, date, prio) {
    const todo = this.getTodo(id);
    if (todo != null) {
      todo.title = title;
      todo.description = desc;
      todo.dueDate = date;
      todo.priority = prio;
    }
  }
}

class ProjectMgr {

  constructor() {
    const defList = [];
    const date = new Date();
    const dateStr = date.toISOString().substring(0, 10);

    defList.push(new Todo('This is the first todo on the list.',
      'Todo description', dateStr, "Moderate"));
    defList.push(new Todo('This is the second todo.',
      'Todo description', dateStr, "High"));
    this.projects = [];
    this.projects.push(new Project("Default", true, defList));
  }

  addProject(project) {
    this.projects.push(project);
  }

  getProject(name) {
    const projectFound = this.projects.find(project => project.name == name);
    return projectFound;
  }

  getActive() {
    const projectFound = this.projects.find(project => project.active == true);
    return projectFound;
  }

  clearActive() {
    const index = this.projects.findIndex(project => project.active == true);
    if (index > -1) {
      const project = this.projects[index];
      project.active = false;
      clearactive(project.id);
    }
  }

}

export const projectmgr = new ProjectMgr();
