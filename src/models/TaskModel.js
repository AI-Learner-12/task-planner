const STORAGE_KEY = 'task-planner-data';

export const TaskModel = {
    // Fetch all tasks from storage
    fetchAll: () => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
    },

    // Save tasks to storage
    saveAll: (tasks) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    },

    // Create a new task entity
    create: ({ title, priority, dueDate }) => {
        return {
            id: Date.now().toString(),
            title,
            priority,
            dueDate,
            isCompleted: false,
            createdAt: new Date().toISOString()
        };
    }
};
