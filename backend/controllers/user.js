const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Retrieve all categories records
const index = async (req, res) => {

    const { id } = req.params

    try {

        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(id)
            }
        });
        res.json({
            id: user.id,
            image: user.image,
            username: user.username
        }); // The response returns the user

    } catch (error) {
        console.log(error); // Catch any errors
    }

}

module.exports = {
    index
}