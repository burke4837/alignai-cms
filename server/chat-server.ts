import { createServer } from 'http'
import { Server } from 'socket.io'
import next from 'next'

const server = createServer()
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:3002"],
    methods: ["GET", "POST"]
  }
})

const PORT = process.env.CHAT_PORT || 3003

// Store messages in memory (in production, use a database)
const messages = [
  {
    id: '1',
    text: 'Welcome to the CRM chat board! This is a great place to collaborate with your team.',
    sender: 'System',
    timestamp: new Date(),
    status: 'delivered',
    type: 'text'
  }
]

// Store typing users
const typingUsers = new Set<string>()

// Handle socket connections
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`)

  // Send existing messages to new user
  socket.emit('initial-messages', messages)

  // Handle new messages
  socket.on('message', (message) => {
    const newMessage = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date(),
      status: 'sent'
    }
    
    messages.push(newMessage)
    
    // Broadcast to all connected clients
    io.emit('message', newMessage)
    
    console.log(`New message from ${message.sender}: ${message.text}`)
  })

  // Handle typing indicators
  socket.on('typing', (userId) => {
    typingUsers.add(userId)
    
    // Broadcast typing status to all clients except sender
    socket.broadcast.emit('typing', userId)
    
    console.log(`User ${userId} is typing`)
  })

  socket.on('stop-typing', (userId) => {
    typingUsers.delete(userId)
    
    // Broadcast stop typing to all clients except sender
    socket.broadcast.emit('stop-typing', userId)
    
    console.log(`User ${userId} stopped typing`)
  })

  // Handle user disconnection
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`)
    
    // Remove user from typing list
    typingUsers.forEach(userId => {
      if (userId === socket.id) {
        typingUsers.delete(userId)
        io.emit('stop-typing', userId)
      }
    })
  })

  // Handle message status updates
  socket.on('update-message-status', ({ messageId, status }) => {
    const message = messages.find(m => m.id === messageId)
    if (message) {
      message.status = status
      io.emit('message-status-updated', { messageId, status })
    }
  })

  // Handle file sharing
  socket.on('file-shared', (fileData) => {
    const fileMessage = {
      id: Date.now().toString(),
      text: fileData.fileName,
      sender: fileData.sender,
      timestamp: new Date(),
      status: 'sent',
      type: 'file',
      fileName: fileData.fileName,
      fileSize: fileData.fileSize
    }
    
    messages.push(fileMessage)
    io.emit('message', fileMessage)
    
    console.log(`File shared: ${fileData.fileName}`)
  })

  // Handle user status changes
  socket.on('user-status-change', ({ userId, status }) => {
    io.emit('user-status-updated', { userId, status })
    console.log(`User ${userId} status changed to ${status}`)
  })
})

// Start server
server.listen(PORT, () => {
  console.log(`Chat server running on port ${PORT}`)
  console.log(`CORS enabled for: http://localhost:3000, http://localhost:3002`)
})

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully')
  server.close(() => {
    console.log('Server closed')
  })
})

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully')
  server.close(() => {
    console.log('Server closed')
  })
})
