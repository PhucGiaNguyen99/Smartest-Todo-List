import '../style.css';
import { Project } from './project';
import { Todo } from './todo';
import { renderProjects, renderTodos  } from './dom';
import { saveProjects, loadProjects } from './storage';

let projects = loadProjects();
if (projects.length === 0) {
    projects.push(new Project('Default'));
}

let currentIndex = 0;

function update() {
    renderProjects(projects, currentIndex, (i) => {
        currentIndex = i;
        update();
    });
    renderTodos(projects[currentIndex], (i) => {
        projects[currentIndex].removeTodo(i);
        saveProjects(projects);
        update();
    }, (i) => {
        alert(JSON.stringify(projects[currentIndex].todos[i], null, 2));
    });
}

document.getElementById('new-project-btn').addEventListener('click', () => {
    const name = prompt('Project name:');
    if (name) {
        projects.push(new Project(name));
        saveProjects(projects);
        update();
    }
});

update();