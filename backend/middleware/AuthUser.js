const jwt = require('jsonwebtoken');

exports.verifyUser = async (req, res, next) =>{
    const token = req.cookies.token;
    if(!token) {
        return res.json({msg: "You are not authenticated"});
    }else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if(err) {
                return res.json({msg: "Token is not okey"});
            }else {
                req.id        = decoded.id;
                req.nama_user = decoded.nama_user;
                req.role      = decoded.role;
                next();
            }
        })
    }
}

exports.adminOnly = async (req, res, next) =>{
    const token = req.cookies.token;
    if(!token) {
        return res.json({msg: "You are not authenticated"});
    }else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if(err) {
                return res.json({msg: "Token is not okey"});
            }else {
                if(decoded.role === 'Admin') {
                    req.id        = decoded.id;
                    req.nama_user = decoded.nama_user;
                    req.role      = decoded.role;
                    next();
                }else {
                    return res.status(403).json({msg: "Akses terlarang"});
                }
            }
        })
    }
}

exports.staffAndAdminOnly = async (req, res, next) =>{
    const token = req.cookies.token;
    if(!token) {
        return res.json({msg: "You are not authenticated"});
    }else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if(err) {
                return res.json({msg: "Token is not okey"});
            }else {
                if(decoded.role === 'Admin' || decoded.role === 'Staff') {
                    req.id        = decoded.id;
                    req.nama_user = decoded.nama_user;
                    req.role      = decoded.role;
                    next();
                }else {
                    return res.status(403).json({msg: "Akses terlarang"});
                }
            }
        })
    }
}

exports.userAndAdminOnly = async (req, res, next) =>{
    const token = req.cookies.token;
    if(!token) {
        return res.json({msg: "You are not authenticated"});
    }else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if(err) {
                return res.json({msg: "Token is not okey"});
            }else {
                if(decoded.role === 'Admin' || decoded.role === 'User') {
                    req.id        = decoded.id;
                    req.nama_user = decoded.nama_user;
                    req.role      = decoded.role;
                    next();
                }else {
                    return res.status(403).json({msg: "Akses terlarang"});
                }
            }
        })
    }
}

exports.userOnly = async (req, res, next) =>{
    const token = req.cookies.token;
    if(!token) {
        return res.json({msg: "You are not authenticated"});
    }else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if(err) {
                return res.json({msg: "Token is not okey"});
            }else {
                if(decoded.role === 'User') {
                    req.id        = decoded.id;
                    req.nama_user = decoded.nama_user;
                    req.role      = decoded.role;
                    next();
                }else {
                    return res.status(403).json({msg: "Akses terlarang"});
                }
            }
        })
    }
}