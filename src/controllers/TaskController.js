import { useState, useEffect } from 'react';
import { TaskModel } from '../models/TaskModel';

export const useTaskController = () => {
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Load initial state via Model
    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        try {
            const data = await TaskModel.fetchAll();
            // Map DB snake_case to UI camelCase
            const mapped = data.map(t => ({
                id: t.id,
                title: t.title,
                priority: t.priority,
                dueDate: t.due_date,
                isCompleted: t.is_completed,
                createdAt: t.created_at
            }));
            setTasks(mapped);
        } catch (error) {
            console.error("Failed to load tasks:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Actions
    const addTask = async (taskData) => {
        // Optimistic Update (Optional) or Wait for DB
        try {
            const newTaskDB = await TaskModel.create(taskData);
            const newTaskUI = {
                id: newTaskDB.id,
                title: newTaskDB.title,
                priority: newTaskDB.priority,
                dueDate: newTaskDB.due_date,
                isCompleted: newTaskDB.is_completed,
                createdAt: newTaskDB.created_at
            };
            setTasks(prev => [newTaskUI, ...prev]);

            // Trigger SMS Notification
            fetch('/api/send-sms', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ taskTitle: newTaskDB.title })
            }).catch(err => console.error("SMS Trigger Failed:", err)); // Non-blocking

        } catch (error) {
            console.error("Error adding task:", error);
            alert("Failed to save task to cloud.");
        }
    };

    const toggleTask = async (id) => {
        // Optimistic UI Update
        const task = tasks.find(t => t.id === id);
        const newStatus = !task.isCompleted;

        setTasks(prev => prev.map(t =>
            t.id === id ? { ...t, isCompleted: newStatus } : t
        ));

        try {
            await TaskModel.toggle(id, newStatus);
        } catch (error) {
            console.error("Error toggling task:", error);
            // Revert on error
            setTasks(prev => prev.map(t =>
                t.id === id ? { ...t, isCompleted: !newStatus } : t
            ));
        }
    };

    const updateTask = async (id, updatedFields) => {
        setTasks(prev => prev.map(t =>
            t.id === id ? { ...t, ...updatedFields } : t
        ));

        try {
            await TaskModel.update(id, updatedFields);
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    const deleteTask = async (id) => {
        const previousTasks = [...tasks];
        setTasks(prev => prev.filter(t => t.id !== id));

        try {
            await TaskModel.delete(id);
        } catch (error) {
            console.error("Error deleting task:", error);
            setTasks(previousTasks); // Revert
        }
    };

    return {
        tasks,
        addTask,
        toggleTask,
        updateTask,
        deleteTask,
        isLoading
    };
};
