"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const mongoose_1 = require("mongoose");
const postSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    description: {
        type: String,
    },
    category_name: {
        type: String,
        enum: [
            'Technology',
            'LifeStyle',
            'Photography',
            'Health and Fitness',
            'Business',
            'Marketing',
        ],
    },
    user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    data: [
        {
            image: {
                type: String,
            },
            name: {
                type: String,
                required: true,
            },
            details: {
                type: String,
            },
            id: {
                type: String,
            },
        },
    ],
}, {
    timestamps: true,
});
exports.Post = (0, mongoose_1.model)('Post', postSchema);
