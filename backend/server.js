const express=  require('express')
const http = require('http')
const WebSocket = require('ws')
const cors = require('cors');
const { send } = require('process');
const { json } = require('stream/consumers');

const app = express();
const server = http.createServer(app);

const wss = new WebSocket.Server({server});


//middlewares
app.use(express.json());
app.use(cors())

app.get('/', (req,res) => {
    console.log("called the server✅");
    res.json({message:"Hello i'm server!", code:'Success'})
})


//websockets
    //live counting of users
        function countUser(){
            const count = wss.clients.size;
            wss.clients.forEach((c) => {
                if(c.readyState == WebSocket.OPEN){
                    c.send(JSON.stringify({type:'userCount', count}))
                }
            })
        }

        function broadcastMsg(message){
            const msg = JSON.parse(message)
            wss.clients.forEach((c) => {
                if(c.readyState == WebSocket.OPEN){
                    c.send(JSON.stringify(msg))
                }
            })
        }

        function loadChatHistory(db,ws){
            if(ws.readyState === WebSocket.OPEN){   
                ws.send(JSON.stringify({type:'loadChatHistory', payload:db}))
            }
        }

const db = [];

wss.on('connection', (ws) => {
    console.log('Client connected');
    loadChatHistory(db,ws);
    countUser();

    console.log(wss.clients.size);


    ws.on('message', (message) => {
        console.log(JSON.parse(message));
      ws.send(JSON.stringify({type:'loadChatHistory', payload:db}))

        broadcastMsg(message);
        db.push(JSON.parse(message))
        console.log(db);

    })


    ws.on('close', () => {
        countUser();
        console.log('Client disconnected');
    })
})



server.listen(3456, () => {
    console.log("Listening to port: 3456");
})