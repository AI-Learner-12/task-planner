import { useState, useEffect } from 'react';
import { TaskModel } from '../models/TaskModel';

export const useTaskController = () => {
    // Load initial state via Model
    const [tasks, setTasks] = useState(() => TaskModel.fetchAll());

    // Persistence Effect
    useEffect(() => {
        TaskModel.saveAll(tasks);
    }, [tasks]);

    // Actions
    const addTask = (taskData) => {
        const newTask = TaskModel.create(taskData);
        setTasks(prev => [newTask, ...prev]);
    };

    const toggleTask = (id) => {
        setTasks(prev => prev.map(t =>
            t.id === id ? { ...t, isCompleted: !t.isCompleted } : t
        ));
    };

    const updateTask = (id, updatedFields) => {
        setTasks(prev => prev.map(t =>
            t.id === id ? { ...t, ...updatedFields } : t
        ));
    };

    const deleteTask = (id) => {
        setTasks(prev => prev.filter(t => t.id !== id));
    };

    return {
        tasks,
        addTask,
        toggleTask,
        updateTask,
        deleteTask
    };
};
