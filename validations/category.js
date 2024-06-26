const categoryData = {
    name: {
        in: ["body"],
        notEmpty: {
            errorMessage: "Name is required",
            bail: true
        },
        isString: {
            errorMessage: "Name must be a string",
            bail: true
        },
        isLength: {
            options: { min: 3 },
            errorMessage: "Name must be at least 3 characters long",
            bail: true
        }
    }
};

module.exports = {
    categoryData
}
