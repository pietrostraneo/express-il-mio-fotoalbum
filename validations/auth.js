const registerData = {
    username: {
        in: ["body"],
        notEmpty: {
            errorMessage: "Username is required",
            bail: true
        },
        isString: {
            errorMessage: "Username must be a string",
            bail: true
        },
        isLength: {
            options: { min: 3 },
            errorMessage: "Username must be at least 3 characters long",
            bail: true
        }
    },
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
    password: {
        in: ["body"],
        notEmpty: {
            errorMessage: "Password is required",
            bail: true
        },
        isString: {
            errorMessage: "Password must be a string",
            bail: true
        },
        isLength: {
            options: { min: 6 },
            errorMessage: "Password must be at least 6 characters long",
            bail: true
        }
    }
};

const loginData = {
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
    password: {
        in: ["body"],
        notEmpty: {
            errorMessage: "Password is required",
            bail: true
        },
        isString: {
            errorMessage: "Password must be a string",
            bail: true
        },
        isLength: {
            options: { min: 6 },
            errorMessage: "Password must be at least 6 characters long",
            bail: true
        }
    }
}

module.exports = {
    registerData,
    loginData
}