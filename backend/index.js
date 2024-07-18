import express from "express"
import cors from "cors"
import connectDb from './config/dbConfig.js'
import { getCoins, getPriceDetail, getPriceForCoins } from "./controller/stockController.js";
import wss from "./config/webSocketConfig.js";
import corn from "./config/cronConfig.js"

const app = express();
connectDb();

app.use(cors({
    origin: 'http://localhost:3000'
}))

app.use(express.json())
app.get('/getCoin', getCoins)
app.get('/getPrice', getPriceDetail)
app.get('/getPrice/:id', getPriceDetail)

const server = app.listen(5000, ()=>console.log(`running at port: 5000`));

server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
    });
});