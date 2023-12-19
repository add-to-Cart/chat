const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "views")));

// Serve different HTML files based on routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "about.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "contact.html"));
});

// Serve chat interface for another route
app.get("/chat", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "chat.html"));
});

// Socket.IO connection handling
io.on("connection", (socket) => {
  console.log("A user connected");

  // Handle incoming chat messages
  socket.on("chatMessage", (message) => {
    console.log("Received chat message:", message);

    // Emit the chat message along with sender information (in this case, 'sender')
    io.emit("chatMessage", { message, sender: "sender" });
  });

  // Handle client disconnection
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
