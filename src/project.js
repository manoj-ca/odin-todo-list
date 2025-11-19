import { todoshow, rmtodo, setdone } from "./main";
import { clearactive, rmproj } from './sidebar';

export class Todo {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.id = crypto.randomUUID();
    this.done = false;
  }
}

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
    date.setDate(date.getDate() + 1);
    const dateStrH = date.toISOString().substring(0, 10);
    date.setDate(date.getDate() + 5);
    const dateStrM = date.toISOString().substring(0, 10);
    date.setDate(date.getDate() + 10);
    const dateStrL = date.toISOString().substring(0, 10);

    defList.push(new Todo('This is the first todo with High priority.',
      'Todo description', dateStrH, "High"));
    defList.push(new Todo('This second todo has Moderate priority.',
      'Todo description', dateStrM, "Moderate"));
    defList.push(new Todo('This is the third todo with Low priority.',
      'Todo description', dateStrL, "Low"));
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

  rmProject(id) {
    const index = this.projects.findIndex(project => project.id == id);
    if (index > -1) {
      this.projects.splice(index, 1);
      rmproj(id);
    }
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

  save() {
    localStorage.setItem('projects', JSON.stringify(this.projects));
  }

  load() {
    const storedData = localStorage.getItem('projects');
    if (storedData) {
      const projects = JSON.parse(storedData);
      this.projects = [];
      projects.forEach(project => {
        const proj = new Project(project.name, project.active, project.todos);
        this.addProject(proj);
      });
    } else {
      console.log('Projects not found in local storage');
    }
  }

}

export const projectmgr = new ProjectMgr();
