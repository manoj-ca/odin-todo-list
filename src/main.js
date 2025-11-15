import circleImg from "./images/circle-outline.svg";
import editImg from "./images/pencil.svg";
import deleteImg from "./images/close-thick.svg";
import { projectmgr } from "./project";

const content = document.querySelector(".content");
const main = document.createElement("div");
const title = document.createElement("div");
const todos = document.createElement("div");

const addTitle = ((name) => {
  title.classList.add("title");
  title.textContent = name;
  main.appendChild(title);
  todos.classList.add("todos");
  main.appendChild(todos);
});

const addCircle = ((tododiv) => {
  const circlebtn = document.createElement("button");
  circlebtn.classList.add("circle-btn");
  circlebtn.type = "button";
  tododiv.appendChild(circlebtn);
  const circleimg = document.createElement("img");
  circleimg.classList.add("circle");
  circleimg.src = circleImg;
  circleimg.width = 26;
  circlebtn.appendChild(circleimg);
});

const addEdit = ((tododiv) => {
  const editbtn = document.createElement("button");
  editbtn.classList.add("edit-btn");
  editbtn.type = "button";
  tododiv.appendChild(editbtn);
  const editimg = document.createElement("img");
  editimg.classList.add("edit");
  editimg.src = editImg;
  editimg.width = 26;
  editbtn.appendChild(editimg);
});

const addDelete = ((tododiv) => {
  const deletebtn = document.createElement("button");
  deletebtn.classList.add("delete-btn");
  deletebtn.type = "button";
  tododiv.appendChild(deletebtn);
  const deleteimg = document.createElement("img");
  deleteimg.classList.add("delete");
  deleteimg.src = deleteImg;
  deleteimg.width = 26;
  deletebtn.appendChild(deleteimg);
});

const addTodo = ((todo) => {
  const tododiv = document.createElement("div");
  tododiv.classList.add("todo");
  tododiv.id = todo.id;
  todos.appendChild(tododiv);
  addCircle(tododiv);
  const title = document.createElement("div");
  title.classList.add("title");
  title.textContent = todo.title;
  tododiv.appendChild(title);
  addEdit(tododiv);
  addDelete(tododiv);
});

export const mainshow = (() => {
  main.classList.add("main");
  content.appendChild(main);
  const project = projectmgr.getActive();
  addTitle(project.name);
  for (const todo of project.todos) {
    addTodo(todo);
  }
});

export const todoshow = (() => {
  const project = projectmgr.getActive();
  const last = project.todos.length - 1;
  const todo = project.todos[last];
  addTodo(todo);
});

export const mainprojshow = ((project) => {
  let todo = document.querySelector(".todo");
  while (todo != null) {
    todos.removeChild(todo);
    todo = document.querySelector(".todo");
  }
  main.removeChild(todos);
  main.removeChild(title);
  addTitle(project.name);
  for (const todo of project.todos) {
    addTodo(todo);
  }
});
