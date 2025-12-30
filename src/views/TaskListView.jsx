import React from 'react';
import TaskItemView from './TaskItemView';
import './TaskListView.css';

const TaskListView = ({ tasks = [], onToggle, onDelete, onUpdate }) => {
    if (tasks.length === 0) {
        return (
            <div className="task-list-container">
                <div className="placeholder-text">
                    No tasks yet. Add one above!
                </div>
            </div>
        );
    }

    const remainingCount = tasks.filter(t => !t.isCompleted).length;

    return (
        <div className="task-list-container">
            <div className="list-header">
                <h3>Your Tasks</h3>
                <span className="task-count">{remainingCount} remaining</span>
            </div>

            <div className="task-list">
                {tasks.map(task => (
                    <TaskItemView
                        key={task.id}
                        task={task}
                        onToggle={onToggle}
                        onDelete={onDelete}
                        onUpdate={onUpdate}
                    />
                ))}
            </div>
        </div>
    );
};

export default TaskListView;
