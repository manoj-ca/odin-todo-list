import closeImg from "./images/close-thick.svg";
import { Todo } from './todo';
import { Project } from './project';
import { projectmgr } from "./project";
import { todoshow } from "./main";
import { mainprojshow } from "./main";
import { projectshow } from "./sidebar";

const addPriority = ((todoinput) => {
  const input = document.createElement("div");
  const label = document.createElement("label");
  const prio = document.createElement("select");
  const high = document.createElement("option");
  const mod = document.createElement("option");
  const low = document.createElement("option");
  input.classList.add("input");
  todoinput.appendChild(input);
  label.classList.add("label");
  label.setAttribute("for", "priority");
  label.textContent = "Priority";
  input.appendChild(label);
  prio.classList.add("text");
  prio.setAttribute("name", "priority");
  input.appendChild(prio);
  low.setAttribute("value", "Low");
  low.textContent = "Low";
  prio.appendChild(low);
  mod.setAttribute("value", "Moderate");
  mod.textContent = "Moderate";
  prio.appendChild(mod);
  high.setAttribute("value", "High");
  high.textContent = "High";
  prio.appendChild(high);
});

const addDate = ((todoinput) => {
  const input = document.createElement("div");
  const label = document.createElement("label");
  const date = document.createElement("input");
  input.classList.add("input");
  todoinput.appendChild(input);
  label.classList.add("label");
  label.setAttribute("for", "due-date");
  label.textContent = "Due Date";
  input.appendChild(label);
  date.classList.add("text");
  date.type = "date";
  date.setAttribute("name", "date");
  input.appendChild(date);
});

const addDescription = ((todoinput) => {
  const input = document.createElement("div");
  const label = document.createElement("label");
  const desc = document.createElement("textarea");
  input.classList.add("input");
  todoinput.appendChild(input);
  label.classList.add("label");
  label.setAttribute("for", "description");
  label.textContent = "Description";
  input.appendChild(label);
  desc.classList.add("text");
  desc.setAttribute("name", "description");
  desc.setAttribute("rows", "5");
  desc.setAttribute("cols", "40");
  desc.setAttribute("placeholder", "Enter description . . .");
  input.appendChild(desc);
});

const addTitle = ((todoinput) => {
  const input = document.createElement("div");
  const label = document.createElement("label");
  const title = document.createElement("input");
  input.classList.add("input");
  todoinput.appendChild(input);
  label.classList.add("label");
  label.setAttribute("for", "title");
  label.textContent = "Title";
  input.appendChild(label);
  title.classList.add("text");
  title.type = "text";
  title.setAttribute("name", "title");
  title.setAttribute("placeholder", "Enter title . . .");
  title.setAttribute("required", "");
  input.appendChild(title);
});

const addForm = ((tododialog) => {
  const todoform = document.createElement("form");
  const todoinput = document.createElement("div");
  const submitbtn = document.createElement("button");
  todoform.classList.add("todo-form");
  todoform.setAttribute("method", "post");
  tododialog.appendChild(todoform);
  todoinput.classList.add("todo-input");
  todoform.appendChild(todoinput);
  submitbtn.classList.add("black", "submit");
  submitbtn.type = "submit";
  submitbtn.textContent = "Add Todo";
  todoform.appendChild(submitbtn);
  addTitle(todoinput);
  addDescription(todoinput);
  addDate(todoinput);
  addPriority(todoinput);
  todoform.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const title = formData.get('title');
    const desc = formData.get('description');
    const date = formData.get('date');
    const prio = formData.get('priority');
    const todo = new Todo(title, desc, date, prio);
    const project = projectmgr.getActive();
    project.addTodo(todo);
    todoshow();
    todoform.reset();
    tododialog.close();
  });
});

const addCloseBtn = ((dialog) => {
  const closebtn = document.createElement("button");
  const closeimg = document.createElement("img");
  closebtn.classList.add("close");
  closebtn.setAttribute("autofocus", "");
  dialog.appendChild(closebtn);
  closeimg.src = closeImg;
  closeimg.width = 48;
  closebtn.appendChild(closeimg);
});

export const todoDialog = (() => {
  const content = document.querySelector(".content");
  const tododialog = document.createElement("dialog");
  tododialog.classList.add("todo-dialog");
  content.appendChild(tododialog);
  addCloseBtn(tododialog);
  addForm(tododialog);
});

const addName = ((projinput) => {
  const input = document.createElement("div");
  const label = document.createElement("label");
  const name = document.createElement("input");
  input.classList.add("input");
  projinput.appendChild(input);
  label.classList.add("label");
  label.setAttribute("for", "name");
  label.textContent = "Name";
  input.appendChild(label);
  name.classList.add("text");
  name.type = "text";
  name.setAttribute("name", "name");
  name.setAttribute("placeholder", "Enter name . . .");
  name.setAttribute("required", "");
  input.appendChild(name);
});

const addProjForm = ((projdialog) => {
  const projform = document.createElement("form");
  const projinput = document.createElement("div");
  const submitbtn = document.createElement("button");
  projform.classList.add("proj-form");
  projform.setAttribute("method", "post");
  projdialog.appendChild(projform);
  projinput.classList.add("proj-input");
  projform.appendChild(projinput);
  submitbtn.classList.add("black", "submit");
  submitbtn.type = "submit";
  submitbtn.textContent = "Add Project";
  projform.appendChild(submitbtn);
  addName(projinput);
  projform.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get('name');
    projectmgr.clearActive();
    const project = new Project(name, true, []);
    projectmgr.addProject(project);
    projectshow();
    mainprojshow(project);
    projform.reset();
    projdialog.close();
  });
});

export const projDialog = (() => {
  const content = document.querySelector(".content");
  const projdialog = document.createElement("dialog");
  projdialog.classList.add("proj-dialog");
  content.appendChild(projdialog);
  addCloseBtn(projdialog);
  addProjForm(projdialog);
});
