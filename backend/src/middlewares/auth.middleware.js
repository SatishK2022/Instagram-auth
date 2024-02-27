import JWT from 'jsonwebtoken'

function jwtAuth(req, res, next) {
    // 1. Verify the token
    // 2. get the user from the token

    const token = (req.cookies && req.cookies.token) || null

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        })
    }

    try {
        const payload = JWT.verify(token, process.env.JWT_SECRET)
        req.user = {id: payload.id, email: payload.email};
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: error.message
        })
    }

    next();
}

export default jwtAuth