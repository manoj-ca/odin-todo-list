import { Todo } from './todo';
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
  }
}

class ProjectMgr {

  constructor() {
    const defList = [];
    defList.push(new Todo('This is the first todo on the list.',
      'description', Date.now(), 2));
    defList.push(new Todo('This is the second todo.',
      'description', Date.now(), 2));
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
    this.projects.forEach(project => {
      if (project.active) {
        project.active = false;
        clearactive(project.id);
      }
    });
  }

}

export const projectmgr = new ProjectMgr();
