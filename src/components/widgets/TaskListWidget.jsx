import React, { useState } from 'react';
import { Plus, Check, X, Edit2 } from 'lucide-react';
import { useDashboard } from '../../contexts/DashboardContext';
import { t } from '../../lib/i18n';

const TaskListWidget = ({ widget }) => {
  const { updateWidget } = useDashboard();
  const [newTask, setNewTask] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [editText, setEditText] = useState('');

  const tasks = widget.config.tasks || [
    { id: 1, text: '审查季度报告', completed: false },
    { id: 2, text: '准备演示文稿', completed: true },
    { id: 3, text: '安排团队会议', completed: false },
  ];

  const addTask = () => {
    if (newTask.trim()) {
      const updatedTasks = [
        ...tasks,
        {
          id: Date.now(),
          text: newTask.trim(),
          completed: false,
        },
      ];
      updateWidget(widget.id, {
        config: { ...widget.config, tasks: updatedTasks }
      });
      setNewTask('');
    }
  };

  const toggleTask = (taskId) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    updateWidget(widget.id, {
      config: { ...widget.config, tasks: updatedTasks }
    });
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    updateWidget(widget.id, {
      config: { ...widget.config, tasks: updatedTasks }
    });
  };

  const startEditing = (task) => {
    setEditingTask(task.id);
    setEditText(task.text);
  };

  const saveEdit = () => {
    if (editText.trim()) {
      const updatedTasks = tasks.map(task =>
        task.id === editingTask ? { ...task, text: editText.trim() } : task
      );
      updateWidget(widget.id, {
        config: { ...widget.config, tasks: updatedTasks }
      });
    }
    setEditingTask(null);
    setEditText('');
  };

  const cancelEdit = () => {
    setEditingTask(null);
    setEditText('');
  };

  const handleKeyPress = (e, action) => {
    if (e.key === 'Enter') {
      action();
    } else if (e.key === 'Escape' && action === saveEdit) {
      cancelEdit();
    }
  };

  return (
    <div className="h-full flex flex-col p-2">
      {/* Add Task Input */}
      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={(e) => handleKeyPress(e, addTask)}
          placeholder={t('widgets.taskList.addTask')}
          className="glass-input flex-1 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none"
        />
        <button
          onClick={addTask}
          className="btn-primary p-2"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Task List */}
      <div className="flex-1 overflow-y-auto space-y-2">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`flex items-center space-x-3 p-2 rounded-xl border transition-colors ${
              task.completed
                ? 'bg-green-50/50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                : 'bg-white/50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600'
            }`}
          >
            {/* Checkbox */}
            <button
              onClick={() => toggleTask(task.id)}
              className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                task.completed
                  ? 'bg-green-600 border-green-600 text-white'
                  : 'border-gray-300 dark:border-gray-500 hover:border-green-500'
              }`}
            >
              {task.completed && <Check className="w-3 h-3" />}
            </button>

            {/* Task Text */}
            <div className="flex-1 min-w-0">
              {editingTask === task.id ? (
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyPress={(e) => handleKeyPress(e, saveEdit)}
                  onBlur={saveEdit}
                  className="glass-input w-full px-2 py-1 text-sm text-gray-900 dark:text-white focus:outline-none"
                  autoFocus
                />
              ) : (
                <span
                  className={`text-sm cursor-pointer ${
                    task.completed
                      ? 'line-through text-gray-500 dark:text-gray-400'
                      : 'text-gray-900 dark:text-white'
                  }`}
                  onClick={() => startEditing(task)}
                >
                  {task.text}
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="flex space-x-1">
              {editingTask === task.id ? (
                <>
                  <button
                    onClick={saveEdit}
                    className="p-1 text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
                  >
                    <Check className="w-3 h-3" />
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="p-1 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => startEditing(task)}
                    className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <Edit2 className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="p-1 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </>
              )}
            </div>
          </div>
        ))}

        {tasks.length === 0 && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <p className="text-sm">{t('widgets.taskList.noTasks')}</p>
            <p className="text-xs mt-1">{t('widgets.taskList.firstTask')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskListWidget;
