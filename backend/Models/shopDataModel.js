const mongoose = require('mongoose')
const slugify = require('slugify')
const validator = require('validator')


const shopDataSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, '缺少id'],
        },
        imageUrl: {
            type: String,
            required: [true, '缺少title'],
        },
        price: {
            type: Number,
            required: [true, '缺少price'],
        },

        description: {
            type: String,
            required: [true, '缺少description'],
        }

    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
)


shopDataSchema.pre('save', function (next) {
    this.slug = slugify(this.title, { lower: true })
    next()
})


const ShopData = mongoose.model('cloths', shopDataSchema)

module.exports = ShopData