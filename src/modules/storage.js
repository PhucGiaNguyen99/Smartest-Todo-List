let KEY = 'todo-projects';

export function saveProjects() {
    localStorage.setItem(KEY, JSON.stringify(projects));
}

export function loadProjects() {
    const data = localStorage.getItem(KEY);
    if (!data) return [];
    let raw = JSON.parse(data);
    return raw.map(proj => {
        const restored = Object.assign({}, proj);
        restored.todos = proj.todos.map(todo => Object.assign({}, todo));
        return restored;
    });
}