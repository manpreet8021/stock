import mongoose from "mongoose";

const priceSchema =  new mongoose.Schema({
    coin_id: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    market_cap: {
        type: Number,
        required: true
    },
    h24_vol: {
        type: Number,
        required: true
    },
    h24_change: {
        type: Number,
        required: true
    },
    last_updated_at: {
        type: Date,
        required: true
    }
},{
    timestamps: true
})

const priceModel = mongoose.model('Price', priceSchema)

export default priceModel;

export const getPriceByParams = (value) => priceModel.find(value).sort({createdAt: 'desc'}).limit(20).select('coin_id price market_cap h24_vol h24_change last_updated_at');
export const insertPrice = (values) => priceModel.insertMany(values)