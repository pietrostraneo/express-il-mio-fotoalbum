const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = async (req, res, next) => {

    const { username: authUser } = req.user;
    const { id } = req.params;

    try {
        // Find the post by ID
        const photo = await prisma.photo.findUnique({
            where: {
                id: id
            },
        });

        const user = await prisma.user.findUnique({
            where: {
                username: authUser
            }
        })

        console.log(`id: ${id} || userId: ${user.id} || photo u-id: ${photo.userId}`)

        // Check if the photo exists
        if (!photo) {
            return res.status(404).json({ message: "photo not found" });
        }

        // Check if the authenticated user is the author of the photo
        if (photo.userId !== user.id) {
            return res.status(403).json({ message: "You are not authorized to modify or delete this photo" });
        }

        // User is authorized
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while checking authorization" });
    }
};
