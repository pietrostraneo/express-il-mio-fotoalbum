const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const index = async (req, res) => {

    try {

        const message = await prisma.message.findMany();
        res.json(message);

    } catch (error) {
        console.log(error);
    }

}


const store = async (req, res) => {

    try {

        const { email, text } = req.body;
        const data = {
            email,
            text
        };

        const message = await prisma.message.create({ data });
        res.json(message);

    } catch (error) {
        console.error(error);
    }

}



module.exports = {
    index,
    store
}