const createPhoto = {
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
    }
};

const editPhoto = {
    title: {
        in: ["body"],
        optional: true,
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
        optional: true,
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
        optional: true,
        isBoolean: {
            errorMessage: "Visible must be a boolean",
            bail: true
        },
        toBoolean: true // Automatically converts the value to a boolean
    },
    categories: {
        in: ["body"],
        optional: true,
        custom: {
            options: (value, { req }) => {
                if (typeof value === 'string') {
                    try {
                        value = JSON.parse(value); // Converting categories into a Javascript Object
                    } catch (error) {
                        throw new Error("Categories must be a valid JSON string");
                    }
                } else if (Array.isArray(value)) {
                    value = value
                } else {
                    throw new Error("Categories must be a valid JSON string or an array");
                }
            }
        },
        isObject: {
            errorMessage: "Categories must be an object",
            bail: true
        },
        isLength: {
            options: { min: 1 },
            errorMessage: "Categories must have at least one category",
            bail: true
        }
    }
}

module.exports = {
    createPhoto,
    editPhoto
}