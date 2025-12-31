import { supabase } from '../lib/supabase';

export const TaskModel = {
    // Fetch all tasks from Supabase
    fetchAll: async () => {
        const { data, error } = await supabase
            .from('tasks')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data || [];
    },

    // Create a new task
    create: async (task) => {
        const { data, error } = await supabase
            .from('tasks')
            .insert([{
                title: task.title,
                priority: task.priority,
                due_date: task.dueDate, // Maps to snake_case column
                is_completed: false
            }])
            .select() // Return the created object
            .single();

        if (error) throw error;
        return data; // Returns the task with real ID from DB
    },

    // Toggle Task Completion
    toggle: async (id, isCompleted) => {
        const { error } = await supabase
            .from('tasks')
            .update({ is_completed: isCompleted })
            .eq('id', id);

        if (error) throw error;
    },

    // Update Task Details
    update: async (id, updates) => {
        // Map camelCase to snake_case if needed
        const payload = {};
        if (updates.title) payload.title = updates.title;
        if (updates.priority) payload.priority = updates.priority;
        if (updates.dueDate) payload.due_date = updates.dueDate;

        const { error } = await supabase
            .from('tasks')
            .update(payload)
            .eq('id', id);

        if (error) throw error;
    },

    // Delete Task
    delete: async (id) => {
        const { error } = await supabase
            .from('tasks')
            .delete()
            .eq('id', id);

        if (error) throw error;
    }
};
