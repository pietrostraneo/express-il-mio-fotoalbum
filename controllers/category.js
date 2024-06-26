const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const index = async (req, res) => {

    try {

        const categories = await prisma.category.findMany();
        res.json(categories);

    } catch (error) {
        console.log(error);
    }

}

const store = async (req, res) => {

    try {

        const { name } = req.body;
        const category = await prisma.category.create({ data: { name } });
        res.json(category);

    } catch (error) {
        console.log(error);
    }

}

const destroy = async (req, res) => {

    try {

        const { id } = req.params;
        await prisma.category.delete({ where: { id: parseInt(id) } });
        res.json({ message: 'Category deleted successfully' });

    } catch (error) {
        console.error(error);
    }

}

module.exports = {
    index,
    store,
    destroy
}