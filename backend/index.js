require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.FRONTEND_URL || '*',
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 5000;

// Share socket.io with routes
app.set('socketio', io);

// Security
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
const paymentRoutes = require('./routes/payment');
const donorRoutes = require('./routes/donor');
const adminRoutes = require('./routes/admin');

app.use('/api/payments', paymentRoutes);
app.use('/api/donors', donorRoutes);
app.use('/api/admin', adminRoutes);

// Socket Connection
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);
  socket.on('disconnect', () => console.log('Client disconnected'));
});

app.get("/", (req, res) => {
  res.send("Aryansh Backend Running...");
});

server.listen(PORT, () => {
  console.log(`Server with Socket.io & PG running on port ${PORT}`);
});
