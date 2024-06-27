const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Retrieve all categories records
const index = async (req, res) => {

    try {

        const categories = await prisma.category.findMany();
        res.json(categories); // The response returns the list of categories

    } catch (error) {
        console.log(error); // Catch any errors
    }

}

// Create a new category record
const store = async (req, res) => {

    try {

        const { name } = req.body; // Retrieving data from the body of the request
        const category = await prisma.category.create({ data: { name } }); // Create the new category
        res.json(category); // Response returns the new category

    } catch (error) {
        console.log(error); // Catch any errors
    }

}

// Delete the category with the id specified in the url parameters
const destroy = async (req, res) => {

    try {

        const { id } = req.params; // Retrieve ID from URL params
        await prisma.category.delete({ where: { id: parseInt(id) } }); // Delete the category
        res.json({ message: 'Category deleted successfully' }); // Response returns a success message

    } catch (error) {
        console.error(error); // Catch any errors
    }

}

module.exports = {
    index,
    store,
    destroy
}