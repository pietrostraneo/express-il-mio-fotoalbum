const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Retrieve all messages records
const index = async (req, res) => {

    try {

        const message = await prisma.message.findMany();
        res.json(message); // The response returns the messages list

    } catch (error) {
        console.log(error); // Catch any errors
    }

}

// Create a new message record
const store = async (req, res) => {

    try {

        const { email, text } = req.body; // Retrieving data from the body of the request
        const data = {
            email,
            text
        };

        const message = await prisma.message.create({ data }); // Create the message record
        res.json(message); // The response returns the new message

    } catch (error) {
        console.error(error); // Catch any errors
    }

}



module.exports = {
    index,
    store
}