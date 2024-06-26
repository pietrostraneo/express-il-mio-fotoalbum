const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Retrieve all Photo records
const index = async (req, res) => {

    try {
        const photo = await prisma.photo.findMany({
            include: {
                Category: {
                    select: {
                        name: true // Adds the ability to display the category name
                    }
                },
                User: {
                    select: {
                        username: true // Adds the ability to display the author's username
                    }
                },
            }
        });

        res.json(photo); // The response returns the photos in json format
    } catch (error) {
        console.error(error); // Catch any errors
    }

}

// Shows the photo with the id specified in the url parameters
const show = async (req, res) => {

    // Retrieve ID from URL params
    const { id } = req.params;

    try {
        const photo = await prisma.photo.findUnique({
            where: {
                id: parseInt(id) // Select the post that corresponds to an id
            },
            include: {
                Category: {
                    select: {
                        name: true // Adds the ability to display the category name
                    }
                },
                User: {
                    select: {
                        username: true // Adds the ability to display the author's username
                    }
                },
            }
        })

        // Check that the photo was found
        if (!photo) {
            return res.status(404).json({ message: 'Photo not found' });
        }

        res.json(photo); // The response returns the photos in json format
    } catch (error) {
        console.error(error); // Catch any errors
    }

}

// Create a new Photo record
const store = async (req, res) => {

    try {
        const { title, description, visible, categories, userId } = req.body; // Retrieving from the body of the request all the parameters that will make up the photo
        const { file } = req; // Retrieving the image file from the request

        let parsedCategories = [];
        if (typeof categories === 'string') {
            try {
                parsedCategories = JSON.parse(categories); // Converting categories into a Javascript Object
            } catch (error) {
                return res.status(400).json({ message: "Invalid categories format" });
            }
        } else if (Array.isArray(categories)) {
            parsedCategories = categories;
        } else {
            return res.status(400).json({ message: "categories should be an array" });
        }

        const validCategories = parsedCategories.filter(c => c !== null); // Verify that the data passed is not null

        const data = {
            title,
            description,
            image: file.filename,
            visible: Boolean(visible),
            userId: parseInt(userId),
        }

        // Verify that categories have been assigned and connect the ids to data
        if (validCategories && validCategories.length > 0) {
            data.Category = {
                connect: validCategories.map(c => ({ id: c }))
            };
        }

        const newPhoto = await prisma.photo.create({ data }); // Create new photo
        res.json(newPhoto); // The response returns the new photo in json format

    } catch (error) {
        console.error(error); // Catch any errors
    }

}

// Update the photo with the id specified in the url parameters
const update = async (req, res) => {

    try {
        const { id } = req.params; // Retrieve ID from URL params
        const { title, description, visible, categories } = req.body; // Retrieving from the body of the request all the parameters that will make up the photo
        const { file } = req; // Retrieving the image file from the request

        let parsedCategories = [];
        if (typeof categories === 'string') {
            try {
                parsedCategories = JSON.parse(categories); // Converting categories into a Javascript Object
            } catch (error) {
                return res.status(400).json({ message: "Invalid categories format" });
            }
        } else if (Array.isArray(categories)) {
            parsedCategories = categories;
        } else {
            return res.status(400).json({ message: "categories should be an array" });
        }

        const validCategories = parsedCategories.filter(c => c !== null); // Verify that the data passed is not null

        const data = {
            title,
            description,
            visible: Boolean(visible)
        }

        // Check if a file has been uploaded
        if (file) {
            data.image = file.filename // Adds the image if the file has been uploaded
        }

        // Verify that categories have been assigned and connect the ids to data
        if (validCategories && validCategories.length > 0) {
            data.Category = {
                connect: validCategories.map(c => ({ id: c }))
            };
        }

        const updatedPhoto = await prisma.photo.update({
            where: {
                id: parseInt(id)
            }, data
        }); // Update the photo

        res.json(updatedPhoto); // The response returns the updated photo in json format

    } catch (error) {
        console.error(error); // Catch any errors
    }

}

// Delete the photo with the id specified in the url parameters
const destroy = async (req, res) => {

    try {

        const { id } = req.params; // Retrieve ID from URL params
        await prisma.photo.delete({
            where: {
                id: parseInt(id)
            }
        }); // Delete the photo

        res.json({ message: "Photo deleted successfully" }); // Return a success message

    } catch (error) {
        console.error(error); // Catch any errors
    }

}

module.exports = {
    index,
    show,
    store,
    update,
    destroy
}