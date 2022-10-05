const mongoose = require('mongoose')
const Campground = require('../models/campground')
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers')

async function main() {
    await mongoose.connect('mongodb://localhost:27017/yelp-camp');
  // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
    console.log('Database connected')
}
main().catch(err => {
    console.error.bind(console, "connection error:")
});

const sample = array => array[Math.floor(Math.random() * array.length)]

const seedDB =  async() =>{
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random()* 20) +10;
        const camp = new Campground({
            author: '63242fb8209d43b7832479e8',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea, in, repellat sequi dolore obcaecati possimus debitis assumenda autem molestias aspernatur exercitationem maiores enim earum quia? Dolor corrupti veritatis tempore ut.',
            price,
            geometry: { 
                type: 'Point', 
                coordinates: [
                     cities[random1000].longitude, 
                     cities[random1000].latitude,
                    ] 
            },
            image: [
                {
                    url: 'https://res.cloudinary.com/dxdfxjqvz/image/upload/v1663400228/YelpCamp/hz5kyfd4ex1z8vxor27n.jpg',
                    filename: 'YelpCamp/hz5kyfd4ex1z8vxor27n',
                },
                {
                    url: 'https://res.cloudinary.com/dxdfxjqvz/image/upload/v1663400228/YelpCamp/nxfuk7scjqu97trt8gtp.jpg',
                    filename: 'YelpCamp/nxfuk7scjqu97trt8gtp',
                },
            ],
        })
        await camp.save()
    }
}

seedDB().then(()=>{
    mongoose.connection.close()
})