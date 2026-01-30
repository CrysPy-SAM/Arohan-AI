import { useState } from 'react'
import { Send, Loader } from 'lucide-react'

import { chatWithAI } from '../../services/aiService'
import { addToShortlist, lockUniversity } from '../../services/universityService'
import { createTodo } from '../../services/userService'

import ChatMessage from './ChatMessage'
import { useUser } from '../../context/UserContext'

const AIChatInterface = () => {
  const { profile, currentStage, lockedUniversity } = useUser()

  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        "Hello! I'm your AI Study Abroad Counsellor. Tell me about your goals and I’ll guide you step by step."
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  // =========================
  // EXECUTE AI ACTIONS
  // =========================
  const executeAIActions = async (actions = []) => {
    for (const action of actions) {
      try {
        if (action.type === 'SHORTLIST_UNIVERSITY') {
          await addToShortlist(action.university_id, action.category)
        }

        if (action.type === 'LOCK_UNIVERSITY') {
          await lockUniversity(action.shortlist_id)
        }

        if (action.type === 'CREATE_TODO') {
          await createTodo({
            title: action.title,
            priority: action.priority || 'Medium'
          })
        }
      } catch (error) {
        console.error('AI action failed:', action, error)
      }
    }
  }

  // =========================
  // SEND MESSAGE
  // =========================
  const handleSend = async () => {
    if (!input.trim() || loading) return

    const userMessage = input.trim()
    setInput('')

    setMessages((prev) => [...prev, { role: 'user', content: userMessage }])
    setLoading(true)

    try {
      const response = await chatWithAI({
        message: userMessage,
        profile,
        stage: currentStage,
        lockedUniversity
      })

      // AI reply
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            response.message ||
            'I’m here to guide you. Let’s take the next best step.'
        }
      ])

      // AI actions
      if (response.actions && response.actions.length > 0) {
        await executeAIActions(response.actions)
      }
    } catch (error) {
      console.error(error)
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            'Sorry, something went wrong. Please try again in a moment.'
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-xl shadow-sm border border-gray-200">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-gray-500">
            <Loader className="w-5 h-5 animate-spin" />
            <span>AI is thinking…</span>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me about universities, budget, exams, or next steps…"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary-500"
            rows={2}
          />

          <button
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default AIChatInterface
