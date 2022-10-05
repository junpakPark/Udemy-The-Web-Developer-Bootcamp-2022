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

const personSchema = new mongoose.Schema({
    first: String,
    last: String
})

personSchema.virtual('fullName').get(function() {
    return `${this.first} ${this.last}`
})

personSchema.pre('save', async function(){
    this.first = 'YO';
    this.last = 'MAMA';
    console.log("About to Save");
})

personSchema.post('save', async function(){
    console.log("Just Saved");
})

const Person = mongoose.model('Person', personSchema);