import todoImg from "./images/todo-list.svg";
import folderImg from "./images/folder-pound.svg";
import { projectmgr } from "./project";
import { mainprojshow } from "./main";

const addName = ((sidebar) => {
  const name = document.createElement("div");
  const nameicon = document.createElement("div");
  const nameimg = document.createElement("img");
  const nametitle = document.createElement("div");
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

const addMenu = ((sidebar) => {
  const menu = document.createElement("div");
  const addtodo = document.createElement("button");
  const tododialog = document.querySelector(".todo-dialog");
  const todoclose = document.querySelector(".todo-dialog > button");
  const todoform = document.querySelector(".todo-form");
  const addproject = document.createElement("button");
  const projdialog = document.querySelector(".proj-dialog");
  const projclose = document.querySelector(".proj-dialog > button");
  const projform = document.querySelector(".proj-form");
  menu.classList.add("menu");
  sidebar.appendChild(menu);
  addtodo.classList.add("add-todo");
  addtodo.type = "button";
  addtodo.textContent = "Add Todo";
  menu.appendChild(addtodo);
  addtodo.addEventListener("click", () => {
    const submit = document.querySelector(".todo-form .submit");
    submit.textContent = "Add Todo";
    tododialog.showModal();
  });
  todoclose.addEventListener("click", () => {
    todoform.reset();
    tododialog.close();
  });
  addproject.classList.add("add-project");
  addproject.type = "button";
  addproject.textContent = "Add Project";
  menu.appendChild(addproject);
  addproject.addEventListener("click", () => {
    projdialog.showModal();
  });
  projclose.addEventListener("click", () => {
    projform.reset();
    projdialog.close();
  });
});

const addProjects = ((sidebar) => {
  const projects = document.createElement("div");
  const projectsicon = document.createElement("div");
  const projectsimg = document.createElement("img");
  const projectstitle = document.createElement("div");
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

const addProject = ((sidebar, currproject) => {
  const project = document.createElement("div");
  const projectbtn = document.createElement("button");
  project.classList.add("project");
  project.id = currproject.id;
  sidebar.appendChild(project);
  projectbtn.classList.add("project-btn");
  projectbtn.type = "button";
  projectbtn.textContent = currproject.name;
  project.appendChild(projectbtn);
  if (currproject.active) {
    projectbtn.style.backgroundColor = '#99ff99';
  }
  projectbtn.addEventListener('mouseenter', () => {
    if (!currproject.active) {
      projectbtn.style.backgroundColor = '#99ddee';
    }
  });
  projectbtn.addEventListener('mouseleave', () => {
    if (!currproject.active) {
      projectbtn.style.backgroundColor = 'transparent';
    }
  });
  projectbtn.addEventListener('click', () => {
    if (!currproject.active) {
      projectmgr.clearActive();
      currproject.active = true;
      projectbtn.style.backgroundColor = '#99ff99';
      mainprojshow(currproject);
    }
  });
});

export const sidebarshow = (() => {
  const content = document.querySelector(".content");
  const sidebar = document.createElement("div");
  sidebar.classList.add("sidebar");
  content.appendChild(sidebar);
  addName(sidebar);
  addMenu(sidebar);
  addProjects(sidebar);
  projectmgr.projects.forEach(project => {
    addProject(sidebar, project);
  });
});

export const projectshow = (() => {
  const sidebar = document.querySelector(".sidebar");
  const last = projectmgr.projects.length - 1;
  const project = projectmgr.projects[last];
  addProject(sidebar, project);
});

export const clearactive = ((id) => {
  const projid = "#" + CSS.escape(id) + " > " + "button";
  const projectbtn = document.querySelector(projid);
  projectbtn.style.backgroundColor = 'transparent';
});
