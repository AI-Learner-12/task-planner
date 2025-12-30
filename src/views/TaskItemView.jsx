import React from 'react';
import './TaskItemView.css';

const TaskItemView = ({ task, onToggle, onDelete, onUpdate }) => {
    const [isEditing, setIsEditing] = React.useState(false);
    const [editTitle, setEditTitle] = React.useState(task.title);
    const [editPriority, setEditPriority] = React.useState(task.priority);
    const [editDate, setEditDate] = React.useState(task.dueDate);

    // Initial check (mock fallback handled by parent now, removed here for purity)

    const handleSave = () => {
        if (!editTitle.trim()) return;
        onUpdate(task.id, {
            title: editTitle,
            priority: editPriority,
            dueDate: editDate
        });
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditTitle(task.title);
        setEditPriority(task.priority);
        setEditDate(task.dueDate);
        setIsEditing(false);
    };

    return (
        <div className={`task-item ${task.isCompleted ? 'completed' : ''}`}>
            <div className="task-checkbox-container">
                <input
                    type="checkbox"
                    checked={task.isCompleted}
                    onChange={() => onToggle && onToggle(task.id)}
                    className="task-checkbox"
                />
            </div>

            {isEditing ? (
                // EDIT MODE
                <div className="edit-form">
                    <input
                        className="edit-input"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        autoFocus
                    />
                    <div className="edit-row">
                        <select
                            className="edit-select"
                            value={editPriority}
                            onChange={(e) => setEditPriority(e.target.value)}
                        >
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                        <input
                            type="date"
                            className="edit-select"
                            value={editDate}
                            onChange={(e) => setEditDate(e.target.value)}
                        />
                    </div>
                </div>
            ) : (
                // VIEW MODE
                <div className="task-content">
                    <p className="task-title">{task.title}</p>
                    <div className="task-meta">
                        <span className={`priority-badge ${task.priority.toLowerCase()}`}>
                            {task.priority}
                        </span>
                        {task.dueDate && (
                            <span className="task-date">
                                Due: {task.dueDate}
                            </span>
                        )}
                    </div>
                </div>
            )}

            {/* ACTION BUTTONS */}
            {isEditing ? (
                <div className="edit-actions">
                    <button className="icon-btn save-btn" onClick={handleSave} title="Save">✓</button>
                    <button className="icon-btn cancel-btn" onClick={handleCancel} title="Cancel">✕</button>
                </div>
            ) : (
                <div className="edit-actions">
                    <button className="icon-btn edit-btn" onClick={() => setIsEditing(true)} title="Edit">✎</button>
                    <button className="icon-btn delete-btn" onClick={() => onDelete && onDelete(task.id)} title="Delete">&times;</button>
                </div>
            )}
        </div>
    );
};

export default TaskItemView;
