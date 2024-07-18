import mongoose from "mongoose";

const coinSchema =  new mongoose.Schema({
    coin_id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    symbol: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    }
},{
    timestamps: true
})

const coinModel = mongoose.model('Coin', coinSchema)

export default coinModel;

export const getCoinById = (id) => coinModel.findById(id).select('coin_id name symbol thumbnail');
export const deleteCoinById = (id) => coinModel.findOneAndDelete({ _id: id });
export const getCoinByParams = (value) => coinModel.find(value).select('coin_id name symbol thumbnail')
export const insertCoins = (data) => coinModel.insertMany(data)