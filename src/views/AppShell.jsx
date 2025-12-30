import React, { useState, useEffect } from 'react';
import './AppShell.css';
import TaskInputView from './TaskInputView';
import TaskListView from './TaskListView';
import { useTaskController } from '../controllers/TaskController';

const AppShell = () => {
    const [theme, setTheme] = useState('light'); // Default to light/colorful

    // -- Controller Logic --
    const {
        tasks,
        addTask,
        toggleTask,
        updateTask,
        deleteTask
    } = useTaskController();
    // ----------------------

    // Toggle Theme Handler
    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    };

    // Apply Theme to Body
    useEffect(() => {
        document.body.setAttribute('data-theme', theme);
    }, [theme]);

    return (
        <div className="app-shell">
            <header className="app-header">
                <div className="header-top-row">
                    <div className="logo-container">
                        <h1>Task Planner</h1>
                        <p className="date-display">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                    </div>

                    <button className="theme-toggle-btn" onClick={toggleTheme} aria-label="Toggle Theme">
                        {theme === 'dark' ? '☀️' : '🌙'}
                    </button>
                </div>
            </header>

            <main className="app-content">
                <TaskInputView onAddTask={addTask} />
                <TaskListView
                    tasks={tasks}
                    onToggle={toggleTask}
                    onDelete={deleteTask}
                    onUpdate={updateTask}
                />
            </main>
        </div>
    );
};

export default AppShell;
