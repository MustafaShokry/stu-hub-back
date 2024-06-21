const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const User = require('./models/userModel');
const Course = require('./models/courseModel');
const Rating = require('./models/ratingModel');
const dbConnect = require('./config/dbconnect');


// Connect to MongoDB
dbConnect('mongodb://localhost:27017/test');

const createDummyUsers = async (numUsers = 10) => {
    const users = [];
    for (let i = 0; i < numUsers; i++) {
        users.push({
            username: faker.internet.userName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            role: faker.helpers.arrayElement(['user', 'admin', 'instructor']),
            image: 'images.png',
            // course: [faker.helpers.arrayElement(await Course.find())._id],
        });
    }
    await User.insertMany(users);
    console.log('Dummy users created');
};

const createDummyCourses = async (numCourses = 10) => {
    const courses = [];
    for (let i = 0; i < numCourses; i++) {
        courses.push({
            // Assuming your Course model has these fields; adjust as necessary
            title: faker.lorem.sentence(),
            description: faker.lorem.paragraph(),
            imageCover: 'images.png',
            videos: [faker.internet.url()],
            price: faker.commerce.price(),
            instructor: faker.helpers.arrayElement(await User.find())._id,
        });
    }
    await Course.insertMany(courses);
    console.log('Dummy courses created');
};

const fillDummyData = async () => {
    await createDummyUsers();
    await createDummyCourses();
    // Close the Mongoose connection
    mongoose.connection.close();
};

fillDummyData().catch(err => {
    console.error(err);
    mongoose.connection.close();
});