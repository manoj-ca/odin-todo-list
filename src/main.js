import circleImg from "./images/circle-outline.svg";
import doneImg from "./images/circle.svg";
import editImg from "./images/pencil.svg";
import deleteImg from "./images/close-thick.svg";
import { projectmgr } from "./project";

const content = document.querySelector(".content");
const main = document.createElement("div");
const title = document.createElement("div");
const todos = document.createElement("div");

const addProjDelete = ((title, project) => {
  const deletebtn = document.createElement("button");
  deletebtn.classList.add("proj-delete-btn");
  deletebtn.type = "button";
  title.appendChild(deletebtn);
  const deleteimg = document.createElement("img");
  deleteimg.classList.add("delete");
  deleteimg.src = deleteImg;
  deleteimg.width = 26;
  deletebtn.appendChild(deleteimg);

  deletebtn.addEventListener('click', () => {
    projectmgr.rmProject(project.id);
    projectmgr.projects[0].active = true;
  });
});

const addProjEdit = ((title, project) => {
  const editbtn = document.createElement("button");
  editbtn.classList.add("proj-edit-btn");
  editbtn.type = "button";
  title.appendChild(editbtn);
  const editimg = document.createElement("img");
  editimg.classList.add("edit");
  editimg.src = editImg;
  editimg.width = 26;
  editbtn.appendChild(editimg);
  editbtn.addEventListener("click", () => {
    const title = document.querySelector(".proj-input .input:first-child .text");
    title.value = project.name;
    const submit = document.querySelector(".proj-form .submit");
    submit.id = project.id;
    submit.type = "submit";
    submit.textContent = "Save Project";
    const projdialog = document.querySelector(".proj-dialog");
    projdialog.showModal();
  });
});

const addTitle = ((project) => {
  title.classList.add("title");
  title.textContent = project.name;
  main.appendChild(title);
  todos.classList.add("todos");
  main.appendChild(todos);
  if (project.name != "Default") {
    addProjEdit(title, project);
    addProjDelete(title, project);
  }
});

const addCircle = ((tododiv, todo) => {
  const circlebtn = document.createElement("button");
  circlebtn.classList.add("circle-btn");
  circlebtn.type = "button";
  tododiv.appendChild(circlebtn);
  const circleimg = document.createElement("img");
  circleimg.classList.add("circle");
  circleimg.src = circleImg;
  circleimg.width = 26;
  const doneimg = document.createElement("img");
  doneimg.classList.add("circle");
  doneimg.src = doneImg;
  doneimg.width = 26;
  if (todo.done) {
    circlebtn.appendChild(doneimg);
  } else {
    circlebtn.appendChild(circleimg);
  }

  circlebtn.addEventListener('click', () => {
    if (todo.done) {
      todo.done = false;
      circlebtn.removeChild(doneimg);
      circlebtn.appendChild(circleimg);
    } else {
      todo.done = true;
      circlebtn.removeChild(circleimg);
      circlebtn.appendChild(doneimg);
    }
    setdone(todo.id, todo.done);
  });
});

const addEdit = ((tododiv, todo) => {
  const editbtn = document.createElement("button");
  editbtn.classList.add("edit-btn");
  editbtn.type = "button";
  tododiv.appendChild(editbtn);
  const editimg = document.createElement("img");
  editimg.classList.add("edit");
  editimg.src = editImg;
  editimg.width = 26;
  editbtn.appendChild(editimg);
  editbtn.addEventListener("click", () => {
    const title = document.querySelector(".todo-input .input:first-child .text");
    title.value = todo.title;
    const desc = document.querySelector(".todo-input .input:nth-child(2) .text");
    desc.value = todo.description;
    const date = document.querySelector(".todo-input .input:nth-child(3) .text");
    date.value = todo.dueDate;
    const prio = document.querySelector(".todo-input .input:nth-child(4) .text");
    prio.value = todo.priority;
    const submit = document.querySelector(".todo-form .submit");
    submit.id = todo.id;
    submit.type = "submit";
    submit.textContent = "Save Todo";
    const tododialog = document.querySelector(".todo-dialog");
    tododialog.showModal();
  });
});

const addDelete = ((tododiv, project) => {
  const deletebtn = document.createElement("button");
  deletebtn.classList.add("delete-btn");
  deletebtn.type = "button";
  tododiv.appendChild(deletebtn);
  const deleteimg = document.createElement("img");
  deleteimg.classList.add("delete");
  deleteimg.src = deleteImg;
  deleteimg.width = 26;
  deletebtn.appendChild(deleteimg);

  deletebtn.addEventListener('click', () => {
    project.rmTodo(tododiv.id);
  });
});

const addTodo = ((todo, project) => {
  const tododiv = document.createElement("div");
  tododiv.classList.add("todo");
  tododiv.id = todo.id;
  todos.appendChild(tododiv);
  addCircle(tododiv, todo);
  const title = document.createElement("div");
  title.classList.add("title");
  title.textContent = `${todo.title} (Due: ${todo.dueDate})`;
  if (todo.priority == "High") {
    title.style.color = "#cc0000";
  } else if (todo.priority == "Moderate") {
    title.style.color = "#0000cc";
  } else {
    title.style.color = "#000000";
  }
  tododiv.appendChild(title);
  setdone(todo.id, todo.done);
  addEdit(tododiv, todo);
  addDelete(tododiv, project);
});

export const settodo = ((todo) => {
  const todoid = "#" + CSS.escape(todo.id) + " > " + ".title";
  const tododiv = document.querySelector(todoid);
  tododiv.textContent = `${todo.title} (Due: ${todo.dueDate})`;
  if (todo.priority == "High") {
    tododiv.style.color = "#cc0000";
  } else if (todo.priority == "Moderate") {
    tododiv.style.color = "#0000cc";
  } else {
    tododiv.style.color = "#000000";
  }
});

export const mainshow = (() => {
  main.classList.add("main");
  content.appendChild(main);
  const project = projectmgr.getActive();
  addTitle(project);
  for (const todo of project.todos) {
    addTodo(todo, project);
  }
});

export const todoshow = ((project) => {
  const last = project.todos.length - 1;
  const todo = project.todos[last];
  addTodo(todo, project);
});

export const mainprojshow = ((project) => {
  let todo = document.querySelector(".todo");
  while (todo != null) {
    todos.removeChild(todo);
    todo = document.querySelector(".todo");
  }
  main.removeChild(todos);
  main.removeChild(title);
  addTitle(project);
  for (const todo of project.todos) {
    addTodo(todo, project);
  }
});

export const setdone = ((id, done) => {
  const todoid = "#" + CSS.escape(id) + " > " + ".title";
  const tododiv = document.querySelector(todoid);
  if (done) {
    tododiv.style.filter = 'brightness(0) saturate(100%) invert(66%) sepia(2%) saturate(18%) hue-rotate(314deg) brightness(92%) contrast(90%)';
  } else {
    tododiv.style.filter = 'none';
  }
});

export const rmtodo = ((id) => {
  const todoid = "#" + CSS.escape(id);
  const tododiv = document.querySelector(todoid);
  todos.removeChild(tododiv);
});
