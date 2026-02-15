const { COOKIE_SECURE, FRONTEND_URL } = require("../config/serverConfig");
const { loginUser } = require("../services/authService");
const { findUser } = require("../repositories/userRepository");

const frontendDomain = new URL(process.env.FRONTEND_URL).hostname;
async function logout(req, res) {

    console.log("Cookie from frontend", req.cookies);

    res.cookie("authToken", "", {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 7 * 24 * 60 * 60 * 1000,
     //   domain: frontendDomain
    });
    return res.status(200).json({
        success: true,
        message: "Log out successfull",
        error: {},
        data: {}
    });
}
async function login(req, res) {


    
    try {
        const loginPayload = req.body;

        const response = await loginUser(loginPayload);

        res.cookie("authToken", response.token, {
            httpOnly: true,
            secure:  true,
            sameSite: "None",
       //     domain: frontendDomain,
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json({
            success: true,
            message: 'Logged in successfully',
            data: {
                userRole: response.userRole,
                userData: response.userData
            },
            error: {}
        })
} catch(error) {
    console.error("Login Error:", error);  // optional but helpful
    return res.status(error.statusCode || 500).json({
        success: false,
        data: {},
        message: error.message || "Internal Server Error",
        error: error
    });
}
}

async function checkAuth(req, res) {
    try {
        const user = await findUser({ email: req.user.email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User not found',
                data: {},
                error: {}
            });
        }
        const userRole = user.role ? user.role : 'USER';
        return res.status(200).json({
            success: true,
            message: 'Authenticated',
            data: {
                user: {
                    email: user.email,
                    firstName: user.firstName,
                    role: userRole
                }
            },
            error: {}
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Something went wrong',
            data: {},
            error: error
        });
    }
}

module.exports = {
    login, logout, checkAuth
}