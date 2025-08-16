import { useState, useEffect } from 'react';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading time
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Generate unique ID
  const generateId = () => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  };

  const handleCreateTask = () => {
    if (newTask.trim() === '') return;
    
    const task = {
      id: generateId(),
      text: newTask.trim(),
      completed: false,
      createdAt: Date.now()
    };
    
    setTasks(prevTasks => [...prevTasks, task]);
    setNewTask('');
  };

  const handleUpdateTask = (task) => {
    if (!editingTask) return;
    
    setTasks(prevTasks =>
      prevTasks.map(t =>
        t.id === task.id
          ? { ...t, text: editingTask.text.trim() }
          : t
      )
    );
    setEditingTask(null);
  };

  const handleToggleComplete = (task) => {
    setTasks(prevTasks =>
      prevTasks.map(t =>
        t.id === task.id
          ? { ...t, completed: !t.completed }
          : t
      )
    );
  };

  const handleDeleteTask = (taskId) => {
    setTasks(prevTasks => prevTasks.filter(t => t.id !== taskId));
  };

  const renderTasks = () => {
    return tasks.map((task) => (
      <li key={task.id} className="task-item">
        {editingTask?.id === task.id ? (
          <input
            type="text"
            className="task-edit-input"
            value={editingTask.text}
            onChange={(e) => setEditingTask({ ...editingTask, text: e.target.value })}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleUpdateTask(task);
              if (e.key === 'Escape') setEditingTask(null);
            }}
            autoFocus
          />
        ) : (
          <span 
            className={`task-text ${task.completed ? 'completed' : ''}`}
            onDoubleClick={() => setEditingTask({ ...task })}
          >
            {task.text}
          </span>
        )}
        <div className="task-actions">
          {editingTask?.id === task.id ? (
            <>
              <button 
                onClick={() => handleUpdateTask(task)}
                className="action-button update-button"
                title="Simpan"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              <button 
                onClick={() => setEditingTask(null)}
                className="action-button cancel-button"
                title="Batal"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={() => handleToggleComplete(task)}
                className={`action-button ${task.completed ? 'complete-toggle-yellow' : 'complete-toggle-blue'}`}
                title={task.completed ? 'Tandai belum selesai' : 'Tandai selesai'}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </button>
              <button 
                onClick={() => handleDeleteTask(task.id)}
                className="action-button delete-button"
                title="Hapus tugas"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm6 0a1 1 0 01-2 0v6a1 1 0 112 0V8z" clipRule="evenodd" />
                </svg>
              </button>
            </>
          )}
        </div>
      </li>
    ));
  };
  
  return (
    <>
      <style>
        {`
          .main-container {
            min-height: 100vh;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1rem;
          }
          .app-card {
            background-color: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 1.5rem;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            padding: 2.5rem;
            max-width: 42rem;
            width: 100%;
            border: 1px solid rgba(255, 255, 255, 0.2);
          }
          .title {
            font-size: 2.5rem;
            font-weight: 800;
            text-align: center;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 1rem;
          }
          .subtitle {
            text-align: center;
            font-size: 0.875rem;
            color: #6b7280;
            margin-bottom: 2rem;
            font-style: italic;
          }
          .input-container {
            display: flex;
            gap: 0.75rem;
            margin-bottom: 2rem;
          }
          .task-input {
            flex-grow: 1;
            padding: 1rem 1.25rem;
            border: 2px solid #e5e7eb;
            border-radius: 50px;
            outline: none;
            transition: all 0.3s ease;
            font-size: 1rem;
            background-color: rgba(255, 255, 255, 0.8);
          }
          .task-input:focus {
            border-color: #667eea;
            box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
            background-color: white;
          }
          .add-button {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #ffffff;
            padding: 1rem 1.25rem;
            border-radius: 50px;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
            border: none;
            cursor: pointer;
            min-width: 60px;
          }
          .add-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
          }
          .add-button:active {
            transform: translateY(0);
          }
          .add-button:disabled {
            background: #9ca3af;
            cursor: not-allowed;
            transform: none;
            box-shadow: none;
          }
          .task-list {
            list-style: none;
            padding: 0;
            margin: 0;
          }
          .task-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1.25rem;
            background: rgba(255, 255, 255, 0.7);
            border-radius: 1rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
            margin-bottom: 0.75rem;
            border: 1px solid rgba(255, 255, 255, 0.3);
            backdrop-filter: blur(5px);
            transition: all 0.3s ease;
          }
          .task-item:hover {
            transform: translateY(-1px);
            box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
            background: rgba(255, 255, 255, 0.9);
          }
          .task-text {
            flex-grow: 1;
            font-size: 1.125rem;
            color: #1f2937;
            cursor: pointer;
            transition: all 0.3s ease;
            padding-right: 1rem;
          }
          .task-text:hover {
            color: #667eea;
          }
          .task-text.completed {
            text-decoration: line-through;
            color: #9ca3af;
            opacity: 0.7;
          }
          .task-edit-input {
            flex-grow: 1;
            padding: 0.75rem 1rem;
            border: 2px solid #667eea;
            border-radius: 0.75rem;
            outline: none;
            margin-right: 0.75rem;
            font-size: 1.125rem;
            background: white;
          }
          .task-edit-input:focus {
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
          }
          .task-actions {
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }
          .action-button {
            padding: 0.75rem;
            border-radius: 50%;
            color: #ffffff;
            transition: all 0.3s ease;
            border: none;
            cursor: pointer;
            min-width: 44px;
            min-height: 44px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .action-button:hover {
            transform: scale(1.1);
          }
          .action-button:active {
            transform: scale(0.95);
          }
          .update-button {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
          }
          .update-button:hover {
            box-shadow: 0 6px 16px rgba(16, 185, 129, 0.6);
          }
          .cancel-button {
            background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%);
            box-shadow: 0 4px 12px rgba(107, 114, 128, 0.4);
          }
          .cancel-button:hover {
            box-shadow: 0 6px 16px rgba(107, 114, 128, 0.6);
          }
          .complete-toggle-blue {
            background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
          }
          .complete-toggle-blue:hover {
            box-shadow: 0 6px 16px rgba(59, 130, 246, 0.6);
          }
          .complete-toggle-yellow {
            background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
            box-shadow: 0 4px 12px rgba(245, 158, 11, 0.4);
          }
          .complete-toggle-yellow:hover {
            box-shadow: 0 6px 16px rgba(245, 158, 11, 0.6);
          }
          .delete-button {
            background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
            box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
          }
          .delete-button:hover {
            box-shadow: 0 6px 16px rgba(239, 68, 68, 0.6);
          }
          .icon {
            height: 1.25rem;
            width: 1.25rem;
          }
          .icon-lg {
            height: 1.5rem;
            width: 1.5rem;
          }
          .loading-text {
            text-align: center;
            color: #6b7280;
            padding: 3rem;
            font-size: 1.25rem;
            font-weight: 500;
          }
          .empty-state {
            text-align: center;
            padding: 3rem 2rem;
            color: #6b7280;
          }
          .empty-state-icon {
            height: 4rem;
            width: 4rem;
            margin: 0 auto 1rem;
            color: #d1d5db;
          }
          .empty-state-title {
            font-size: 1.125rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
          }
          .empty-state-text {
            font-size: 0.875rem;
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .task-item {
            animation: fadeIn 0.3s ease-out;
          }

          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }

          .loading-spinner {
            display: inline-block;
            width: 2rem;
            height: 2rem;
            border: 3px solid #e5e7eb;
            border-radius: 50%;
            border-top-color: #667eea;
            animation: spin 1s ease-in-out infinite;
            margin-right: 0.75rem;
          }
        `}
      </style>

      <div className="main-container">
        <div className="app-card">
          <h1 className="title">
            ✨ Daftar Tugas
          </h1>
          <p className="subtitle">
            Klik dua kali pada tugas untuk mengedit • Enter untuk simpan • Escape untuk batal
          </p>

          {/* Input and button for creating a new task */}
          <div className="input-container">
            <input
              type="text"
              className="task-input"
              placeholder="Apa yang ingin kamu kerjakan hari ini?"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleCreateTask();
              }}
            />
            <button
              onClick={handleCreateTask}
              className="add-button"
              disabled={newTask.trim() === ''}
              title="Tambah tugas"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="icon-lg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>

          {/* Task list */}
          {isLoading ? (
            <div className="loading-text">
              <div className="loading-spinner"></div>
              Memuat...
            </div>
          ) : tasks.length > 0 ? (
            <ul className="task-list">{renderTasks()}</ul>
          ) : (
            <div className="empty-state">
              <svg className="empty-state-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              <div className="empty-state-title">Belum ada tugas</div>
              <div className="empty-state-text">Tambahkan tugas pertamamu di atas untuk memulai!</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default App;