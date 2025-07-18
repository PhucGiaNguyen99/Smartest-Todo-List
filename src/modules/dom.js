import { saveProjects } from './storage';
import { format } from 'date-fns';

export function renderProjects(projects, selectedIndex, onSelect) {
    const list = document.getElementById('project-list');
    list.innerHTML = '';
    projects.forEach((project, i) => {
        const btn = document.createElement('button');
        btn.textContent = project.name;
        if (i === selectedIndex) btn.style.fontWeight = 'bold';
        btn.addEventListener('click', () => onSelect(i));
        list.appendChild(btn);
    });
}

export function renderTodos(project, onDelete, onExpand) {
    const container = document.getElementById('todo-list');

    container.innerHTML = '';
    project.todos.forEach((todo, i) => {
        const div = document.createElement('div');
        div.textContent = `${todo.title} (due: ${format(new Date(todo.dueDate), 'PPP')})`;
        div.className = `priority-${todo.priority}`;
        div.addEventListener('click', () => onExpand(i));
        const del = document.createElement('button');
        del.textContent = 'Delete';
        del.addEventListener('click', (e) => {
        e.stopPropagation();
        onDelete(i);
        });
        div.appendChild(del);
        container.appendChild(div);
    });
}
