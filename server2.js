const http = require("http");
const express = require("express");
const path = require("path");
const WebSocket = require("ws");
const app = express();

app.use(express.static(path.join(__dirname, "D:\Documents\Milana\RTU\bakalavrs\risinajums\project")));
app.get("/", (req, res) => { res.sendFile(path.join(__dirname, "2d_game.html")) });

const httpServer = http.createServer(app);
const wss = new WebSocket.Server({ server: httpServer });

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(data) {
      wss.clients.forEach(function each(client) {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
      })
    })
  })
 
const port = process.env.PORT || 9090;
httpServer.listen(port, () => { console.log("Server started. Port: ", port) });
