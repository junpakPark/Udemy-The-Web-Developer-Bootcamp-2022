// getting-started.js
const mongoose = require('mongoose');
async function main() {
    await mongoose.connect('mongodb://localhost:27017/shopApp');
    // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
  }

main().catch(err => {
    console.log("OH NO ERROR!!!!")
    console.log(err)
});
main().then(() => {
    console.log("CONNECTION OPEN!!!")
})


const productSchema = new mongoose.Schema({
    name: {
        type : String,
        required : true,
        maxlength : 20
    },
    price: {
        type : Number,
        required : true,
        min : [0, 'Price must be positive ya dodo']
    },
    isOnSale: {
        type: Boolean,
        default: false
    },
    categories: [String],
    qty: {
        online: {
            type : Number,
            default: 0
        },
        inStore: {
            type: Number,
            default: 0
        }
    },
    size: {
        type: String,
        enum: ['S', 'M', 'L']
    }
});

productSchema.methods.toggleOnSale = function() {
    this.isOnSale = !this.isOnSale;
    return this.save();
}

productSchema.methods.addCategory = function (newCat) {
    this.categories.push(newCat);
    return this.save();
}

productSchema.statics.fireSale = function (newCat) {
    return this.updateMany({}, {onSale : true, price: 0})
}

// productSchema.methods.greet = function() {
//     console.log("Hello~!")
//     console.log(`- from ${this.name}`)
// }

const Product = mongoose.model('Product', productSchema)

const findProduct = async () => {
    const foundProduct = await Product.findOne({name: 'Mountain Bike'});
    console.log(foundProduct); 
    await foundProduct.toggleOnSale()
    console.log(foundProduct); 
    await foundProduct.addCategory('Outdoors')
    console.log(foundProduct); 
}

Product.fireSale()
    .then(res => console.log(res))

// const bike = new Product({
//     name: 'Cycling Jersey',
//     price: 28.50,
//     categories:['Cycling'],
//     size: 'S'
// })

// bike.save()
//     .then(data => {
//         console.log("It Worked");
//         console.log(data);
//     })
//     .catch(err => {
//         console.log("OH NO ERROR");
//         console.log(err);
//     })
// Product.findOneAndUpdate({name: 'Tire Pump'}, {price: -9}, {new: true, runValidators: true})
//     .then(data => {
//         console.log("It Worked");
//         console.log(data);
//     })
//     .catch(err => {
//         console.log("OH NO ERROR");
//         console.log(err);
//     })