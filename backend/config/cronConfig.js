import cron from "node-cron";
import { getPriceForCoins } from "../controller/stockController.js";

cron.schedule('*/10 * * * * *', () => {
    getPriceForCoins()
});

export default cron