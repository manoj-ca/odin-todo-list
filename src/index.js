import "./styles.css";
import { todoDialog, projDialog } from "./forms";
import { sidebarshow } from "./sidebar";
import { mainshow } from "./main";
import { projectmgr } from "./project";

projectmgr.load();
todoDialog();
projDialog();
sidebarshow();
mainshow();
