const mongoose = require('mongoose');

const equipmentSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
            ref: 'Users',
            index: true
        },
        image: {
            type: String,
            required: true,
            trim: true
        },
        product_name: {
            type: String,
            required: true,
            trim: true
        },
        category: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        description: {
            type: [String],
            required: true
        },
        price: {
            type: String,
            required: true,
            trim: true
        },
        rating: {
            type: Number,
            required: true,
            min: 0,
            max: 5,
            default: 0
        },
        customization: {
            type: String,
            trim: true,
            default: 'None'
        },
        processingTime: {
            type: String,
            trim: true
        },
        stock_status: {
            type: String,
            required: true,
            enum: ['In-stock', 'Out of stock', 'Made to Order'],
            default: 'In-stock'
        },
        dateAdded: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
);

// Index for searching products by name
equipmentSchema.index({ product_name: 'text', description: 'text' });

module.exports = mongoose.model('Equipment', equipmentSchema);
