import { WebSocketServer } from 'ws'

const wss = new WebSocketServer({ noServer: true });
export let connectedUser = [];

wss.on('connection', (ws) => {
    connectedUser.push(ws);
    ws.on('close', () => {
        connectedUser = connectedUser.filter(user => user !== ws);
    });
});

export default wss;