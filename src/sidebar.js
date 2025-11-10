import todoImg from "./images/todo-list.svg";
import folderImg from "./images/folder-pound.svg";
import { defaultproject } from "./project";

const content = document.querySelector(".content");
const sidebar = document.createElement("div");

const name = document.createElement("div");
const nameicon = document.createElement("div");
const nameimg = document.createElement("img");
const nametitle = document.createElement("div");

const menu = document.createElement("div");
const addtodo = document.createElement("button");
const addproject = document.createElement("button");

const projects = document.createElement("div");
const projectsicon = document.createElement("div");
const projectsimg = document.createElement("img");
const projectstitle = document.createElement("div");

const project = document.createElement("div");
const defaultproj = document.createElement("button");

export const addName = ((sidebar) => {
  name.classList.add("name");
  sidebar.appendChild(name);
  nameicon.classList.add("icon");
  name.appendChild(nameicon);
  nameimg.src = todoImg;
  nameimg.width = 48;
  nameicon.appendChild(nameimg);
  nametitle.classList.add("title");
  nametitle.textContent = "Todo List";
  name.appendChild(nametitle);
});

export const addMenu = ((sidebar) => {
  menu.classList.add("menu");
  sidebar.appendChild(menu);
  addtodo.classList.add("add-todo");
  addtodo.type = "button";
  addtodo.textContent = "Add Todo";
  menu.appendChild(addtodo);
  addproject.classList.add("add-project");
  addproject.type = "button";
  addproject.textContent = "Add Project";
  menu.appendChild(addproject);
});

export const addProjects = ((sidebar) => {
  projects.classList.add("projects");
  sidebar.appendChild(projects);
  projectsicon.classList.add("icon");
  projects.appendChild(projectsicon);
  projectsimg.src = folderImg;
  projectsimg.width = 42;
  projectsicon.appendChild(projectsimg);
  projectstitle.classList.add("title");
  projectstitle.textContent = "My Projects";
  projects.appendChild(projectstitle);
});

export const addDefault = ((sidebar) => {
  project.classList.add("project");
  sidebar.appendChild(project);
  defaultproj.classList.add("project-btn");
  defaultproj.type = "button";
  defaultproj.textContent = "Default";
  project.appendChild(defaultproj);
  if (defaultproject.active) {
    defaultproj.style.backgroundColor = '#99ff99';
  }
});

export const sidebarshow = (() => {
  sidebar.classList.add("sidebar");
  content.appendChild(sidebar);
  addName(sidebar);
  addMenu(sidebar);
  addProjects(sidebar);
  addDefault(sidebar);
});

defaultproj.addEventListener('mouseenter', () => {
  if (!defaultproject.active) {
    defaultproj.style.backgroundColor = '#99ddee';
  }
});

defaultproj.addEventListener('mouseleave', () => {
  if (!defaultproject.active) {
    defaultproj.style.backgroundColor = 'transparent';
  }
});
