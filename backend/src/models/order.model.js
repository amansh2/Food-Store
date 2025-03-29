const { model, Schema, Types } = require('mongoose');
const { OrderStatus } = require('../constants/order_status');
const { FoodSchema } = require('./food.model');

const LatLngSchema = new Schema({
    lat: { type: String, required: true },
    lng: { type: String, required: true }
});

const OrderItemSchema = new Schema({
    food: { type: FoodSchema, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true }
});

const orderSchema = new Schema(
    {
        name: { type: String, required: true },
        address: { type: String, required: true },
        addressLatLng: { type: LatLngSchema, required: true },
        paymentId: { type: String },
        totalPrice: { type: Number, required: true },
        items: { type: [OrderItemSchema], required: true },
        status: { type: String, default: OrderStatus.NEW },
        user: { type: Types.ObjectId, required: true }
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true
        },
        toObject: {
            virtuals: true
        }
    }
);

const OrderModel = model('order', orderSchema);

module.exports = OrderModel;
