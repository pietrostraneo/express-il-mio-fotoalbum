const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const index = async (req, res) => {

    try {
        const photo = await prisma.photo.findMany({
            include: {
                Category: {
                    select: {
                        name: true
                    }
                },
                User: {
                    select: {
                        username: true
                    }
                },
            }
        });
        res.json(photo);
    } catch (error) {
        console.error(error);
    }

}

const show = async (req, res) => {

    const { id } = req.params;

    try {
        const photo = await prisma.photo.findUnique({
            where: {
                id: parseInt(id)
            },
            include: {
                Category: {
                    select: {
                        name: true
                    }
                },
                User: {
                    select: {
                        username: true
                    }
                },
            }
        })

        if (!photo) {
            return res.status(404).json({ message: 'Photo not found' });
        }

        res.json(photo);
    } catch (error) {
        console.error(error);
    }

}

const store = async (req, res) => {

    try {
        const { title, description, visible, categories, userId } = req.body;
        const { file } = req;

        let parsedCategories = [];
        if (typeof categories === 'string') {
            try {
                parsedCategories = JSON.parse(categories);
            } catch (error) {
                return res.status(400).json({ message: "Invalid categories format" });
            }
        } else if (Array.isArray(categories)) {
            parsedCategories = categories;
        } else {
            return res.status(400).json({ message: "categories should be an array" });
        }

        const validCategories = parsedCategories.filter(c => c !== null);

        const data = {
            title,
            description,
            image: file.filename,
            visible: Boolean(visible),
            userId: parseInt(userId),
        }

        if (validCategories && validCategories.length > 0) {
            data.Category = {
                connect: validCategories.map(c => ({ id: c }))
            };
        }

        const newPhoto = await prisma.photo.create({ data })
        res.json(newPhoto);

    } catch (error) {
        console.error(error);
    }

}

const update = async (req, res) => {

    try {
        const { id } = req.params;
        const { title, description, visible, categories } = req.body;
        const { file } = req;

        let parsedCategories = [];
        if (typeof categories === 'string') {
            try {
                parsedCategories = JSON.parse(categories);
            } catch (error) {
                return res.status(400).json({ message: "Invalid categories format" });
            }
        } else if (Array.isArray(categories)) {
            parsedCategories = categories;
        } else {
            return res.status(400).json({ message: "categories should be an array" });
        }

        const validCategories = parsedCategories.filter(c => c !== null);

        const data = {
            title,
            description,
            visible: Boolean(visible)
        }

        if (file) {
            data.image = file.filename
        }

        if (validCategories && validCategories.length > 0) {
            data.Category = {
                connect: validCategories.map(c => ({ id: c }))
            };
        }

        const updatedPhoto = await prisma.photo.update({
            where: {
                id: parseInt(id)
            }, data
        })

        res.json(updatedPhoto);

    } catch (error) {
        console.error(error);
    }

}

const destroy = async (req, res) => {

    try {

        const { id } = req.params;
        await prisma.photo.delete({
            where: {
                id: parseInt(id)
            }
        });
        res.json({ message: "Photo deleted successfully" });

    } catch (error) {
        console.error(error);
    }

}

module.exports = {
    index,
    show,
    store,
    update,
    destroy
}