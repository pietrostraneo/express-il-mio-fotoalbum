const messageData = {
    email: {
        in: ["body"],
        notEmpty: {
            errorMessage: "Email is required",
            bail: true
        },
        isEmail: {
            errorMessage: "Email must be a valid email address",
            bail: true
        }
    },
    text: {
        in: ["body"],
        notEmpty: {
            errorMessage: "Message text is required",
            bail: true
        },
        isString: {
            errorMessage: "Message text must be a string",
            bail: true
        },
        isLength: {
            options: { min: 5 },
            errorMessage: "Message text must be at least 5 characters long",
            bail: true
        }
    }
};

module.exports = {
    messageData
}