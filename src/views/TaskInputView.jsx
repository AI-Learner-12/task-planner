import React from 'react';
import './TaskInputView.css';

// Note: Logic will be injected via props later (MVC Controller)
const TaskInputView = ({ onAddTask }) => {
    const [title, setTitle] = React.useState('');
    const [priority, setPriority] = React.useState('Medium');
    const [dueDate, setDueDate] = React.useState('');

    const handleSubmit = () => {
        if (!title.trim()) return;
        onAddTask({ title, priority, dueDate });
        setTitle('');
        setPriority('Medium');
        setDueDate('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSubmit();
    };

    return (
        <div className="task-input-card">
            <div className="input-group">
                <input
                    type="text"
                    placeholder="What needs to be done?"
                    className="task-title-input"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </div>

            <div className="controls-row">
                <div className="priority-selector">
                    {['High', 'Medium', 'Low'].map((p) => (
                        <label key={p} className={`priority-option ${p.toLowerCase()}`}>
                            <input
                                type="radio"
                                name="priority"
                                value={p}
                                checked={priority === p}
                                onChange={(e) => setPriority(e.target.value)}
                            />
                            <span>{p}</span>
                        </label>
                    ))}
                </div>

                <input
                    type="date"
                    className="date-input"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                />

                <button className="add-btn" onClick={handleSubmit}>
                    <span>+</span>
                </button>
            </div>
        </div>
    );
};

export default TaskInputView;
