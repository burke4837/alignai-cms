'use client'

import { useState, useEffect, useRef } from 'react'
import { io, Socket } from 'socket.io-client'
import { Send, Paperclip, Smile, Users, Search, Filter, MoreVertical, Check, CheckCheck, X, Phone, Mail, Calendar, Tag } from 'lucide-react'

interface Message {
  id: string
  text: string
  sender: string
  timestamp: Date
  status: 'sent' | 'delivered' | 'read'
  type: 'text' | 'file' | 'image'
  fileName?: string
  fileSize?: string
}

interface User {
  id: string
  name: string
  email: string
  avatar: string
  status: 'online' | 'offline' | 'away'
  lastSeen?: Date
}

interface ChatBoardProps {
  currentUser?: User
}

export function ChatBoard({ currentUser = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'JD',
  status: 'online'
} }: ChatBoardProps) {
  const [messages, setMessages] = useState<Message[]>([])
  
  const [newMessage, setNewMessage] = useState('')
  const [isTyping, setIsTyping] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'unread' | 'mentions'>('all')
  const [showUserList, setShowUserList] = useState(false)
  const [socket, setSocket] = useState<Socket | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const users: User[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'JD',
      status: 'online',
      lastSeen: new Date()
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      avatar: 'SJ',
      status: 'online',
      lastSeen: new Date()
    },
    {
      id: '3',
      name: 'Mike Chen',
      email: 'mike@example.com',
      avatar: 'MC',
      status: 'away',
      lastSeen: new Date(Date.now() - 900000)
    },
    {
      id: '4',
      name: 'Emily Davis',
      email: 'emily@example.com',
      avatar: 'ED',
      status: 'offline',
      lastSeen: new Date(Date.now() - 3600000)
    }
  ]

  useEffect(() => {
    // Initialize socket connection
    const newSocket = io('http://localhost:3003', {
      transports: ['websocket', 'polling']
    })
    
    newSocket.on('connect', () => {
      console.log('Connected to chat server')
    })
    
    newSocket.on('message', (message: Message) => {
      setMessages(prev => [...prev, {
        ...message,
        timestamp: new Date(message.timestamp)
      }])
    })

    newSocket.on('initial-messages', (initialMessages: Message[]) => {
      setMessages(initialMessages.map(msg => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      })))
    })
    
    newSocket.on('typing', (userId: string) => {
      setIsTyping(prev => 
        prev.includes(userId) ? prev : [...prev, userId]
      )
    })
    
    newSocket.on('stop-typing', (userId: string) => {
      setIsTyping(prev => prev.filter(id => id !== userId))
    })
    
    setSocket(newSocket)
    
    return () => {
      newSocket.disconnect()
    }
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = () => {
    if (newMessage.trim() && socket) {
      const message: Message = {
        id: Date.now().toString(),
        text: newMessage,
        sender: currentUser.name,
        timestamp: new Date(),
        status: 'sent',
        type: 'text'
      }
      
      socket.emit('message', message)
      setMessages(prev => [...prev, message])
      setNewMessage('')
    }
  }

  const handleTyping = () => {
    if (socket) {
      socket.emit('typing', currentUser.id)
    }
  }

  const handleStopTyping = () => {
    if (socket) {
      socket.emit('stop-typing', currentUser.id)
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  const filteredMessages = messages.filter(message => {
    if (selectedFilter === 'unread') {
      return message.status !== 'read'
    }
    if (selectedFilter === 'mentions') {
      return message.text.includes(`@${currentUser.name}`)
    }
    return true
  })

  const unreadCount = messages.filter(msg => msg.status !== 'read').length

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Chat Board</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setShowUserList(!showUserList)}
                className="p-2 hover:bg-gray-100 rounded"
                title="Toggle user list"
              >
                <Users className="h-5 w-5" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded" title="Settings">
                <MoreVertical className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="p-3">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="p-3 border-t border-gray-200">
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedFilter('all')}
                className={`px-3 py-1 rounded-lg text-sm ${
                  selectedFilter === 'all' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedFilter('unread')}
                className={`px-3 py-1 rounded-lg text-sm relative ${
                  selectedFilter === 'unread' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Unread
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setSelectedFilter('mentions')}
                className={`px-3 py-1 rounded-lg text-sm ${
                  selectedFilter === 'mentions' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Mentions
              </button>
            </div>
          </div>
        </div>

        {/* User List */}
        <div className={`flex-1 overflow-y-auto ${showUserList ? 'block' : 'hidden'}`}>
          <div className="p-3">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Team Members</h3>
            <div className="space-y-2">
              {users.map(user => (
                <div key={user.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {user.avatar}
                    </div>
                    <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                      user.status === 'online' ? 'bg-green-500' :
                      user.status === 'away' ? 'bg-yellow-500' :
                      'bg-gray-400'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{user.name}</div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                    <div className="text-xs text-gray-400">
                      {user.status === 'online' ? 'Active now' :
                       user.lastSeen ? `Last seen ${formatTime(user.lastSeen)}` :
                       'Offline'}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button className="p-1 hover:bg-gray-100 rounded" title="Send message">
                      <Mail className="h-4 w-4 text-gray-600" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded" title="Start call">
                      <Phone className="h-4 w-4 text-gray-600" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded" title="Schedule meeting">
                      <Calendar className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                {currentUser.avatar}
              </div>
              <div>
                <div className="font-medium text-gray-900">{currentUser.name}</div>
                <div className="text-sm text-gray-500">{currentUser.email}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">
                {users.filter(u => u.status === 'online').length} online
              </span>
              <button className="p-2 hover:bg-gray-100 rounded" title="More options">
                <MoreVertical className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {filteredMessages.map(message => (
            <div key={message.id} className={`flex gap-3 ${
              message.sender === currentUser.name ? 'flex-row-reverse' : ''
            }`}>
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  {message.sender === currentUser.name ? currentUser.avatar : message.sender.charAt(0)}
                </div>
              </div>

              {/* Message Content */}
              <div className={`max-w-xs lg:max-w-md ${
                message.sender === currentUser.name 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white text-gray-900'
              } rounded-lg p-3`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-sm font-medium ${
                    message.sender === currentUser.name ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {message.sender}
                  </span>
                  <span className={`text-xs ${
                    message.sender === currentUser.name ? 'text-blue-100' : 'text-gray-400'
                  }`}>
                    {formatTime(message.timestamp)}
                  </span>
                </div>
                <div className={`text-sm ${
                  message.sender === currentUser.name ? 'text-white' : 'text-gray-900'
                }`}>
                  {message.type === 'file' ? (
                    <div className="flex items-center gap-2 p-2 bg-gray-100 rounded">
                      <Paperclip className="h-4 w-4" />
                      <span>{message.fileName}</span>
                      <span className="text-xs text-gray-500">({message.fileSize})</span>
                    </div>
                  ) : (
                    message.text
                  )}
                </div>
                <div className={`flex items-center gap-1 mt-1 text-xs ${
                  message.sender === currentUser.name ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {message.sender === currentUser.name && (
                    <>
                      <CheckCheck className="h-3 w-3" />
                      <span>{message.status === 'delivered' ? 'Delivered' : 'Read'}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping.length > 0 && (
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-sm">
                ...
              </div>
              <div className="bg-gray-200 rounded-lg px-3 py-2">
                <div className="text-sm text-gray-600">
                  {isTyping.map(userId => {
                    const user = users.find(u => u.id === userId)
                    return user ? user.name : 'Someone'
                  }).join(', ')} {isTyping.length === 1 ? 'is' : 'are'} typing...
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="flex gap-2">
            <button className="p-2 hover:bg-gray-100 rounded" title="Attach file">
              <Paperclip className="h-5 w-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded" title="Add emoji">
              <Smile className="h-5 w-5 text-gray-600" />
            </button>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSendMessage()
                }
              }}
              onFocus={handleTyping}
              onBlur={handleStopTyping}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
