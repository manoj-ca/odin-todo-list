import { Todo } from './todo';

class Project {
  constructor(name, active, todos) {
    const defList = [];
    if (name == 'Default') {
      defList.push(new Todo('This is the first todo on the list.',
        'description', Date.now(), 2));
      defList.push(new Todo('This is the second todo.',
        'description', Date.now(), 2));
    } else {
      defList = todos;
    }
    this.name = name;
    this.active = active;
    this.curList = Array.from(defList);
  }
}

export const defaultproject = new Project("Default", true, []);
