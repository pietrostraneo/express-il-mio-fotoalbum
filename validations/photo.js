const photoData = {
    title: {
        in: ["body"],
        notEmpty: {
            errorMessage: "Title is required",
            bail: true
        },
        isString: {
            errorMessage: "Title must be a string",
            bail: true
        },
        isLength: {
            options: { min: 3 },
            errorMessage: "Title must be at least 3 characters long",
            bail: true
        }
    },
    description: {
        in: ["body"],
        notEmpty: {
            errorMessage: "Description is required",
            bail: true
        },
        isString: {
            errorMessage: "Description must be a string",
            bail: true
        },
        isLength: {
            options: { min: 5 },
            errorMessage: "Description must be at least 5 characters long",
            bail: true
        }
    },
    visible: {
        in: ["body"],
        isBoolean: {
            errorMessage: "Visible must be a boolean",
            bail: true
        },
        toBoolean: true // Automatically converts the value to a boolean
    },
    categories: {
        in: ["body"],
        isArray: {
            errorMessage: "Categories must be an array",
            bail: true
        }
    }
};

module.exports = {
    photoData
}