import { useState, useEffect } from 'react'
import { getTodos, toggleTodo } from '../../services/userService'
import { CheckCircle, Circle, Calendar } from 'lucide-react'
import { format } from 'date-fns'

const TodoList = () => {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    try {
      const data = await getTodos({ status: 'pending' })
      setTodos(data.data || [])
    } catch (error) {
      console.error('Failed to fetch todos:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleToggle = async (todoId) => {
    try {
      await toggleTodo(todoId)
      await fetchTodos()
    } catch (error) {
      console.error('Failed to toggle todo:', error)
    }
  }

  if (loading) {
    return <div className="card">Loading todos....</div>
  }

  return (
    <div className="card">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Upcoming Tasks</h2>
      
      {todos.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No pending tasks</p>
      ) : (
        <div className="space-y-3">
          {todos.slice(0, 5).map((todo) => (
            <div
              key={todo.id}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
              onClick={() => handleToggle(todo.id)}
            >
              {todo.is_completed ? (
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              ) : (
                <Circle className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
              )}
              <div className="flex-1 min-w-0">
                <p className={`font-medium ${todo.is_completed ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
                  {todo.title}
                </p>
                {todo.due_date && (
                  <div className="flex items-center gap-1 mt-1 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>{format(new Date(todo.due_date), 'MMM dd, yyyy')}</span>
                  </div>
                )}
              </div>
              {todo.priority === 'High' && (
                <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded">
                  High Priority
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default TodoList