const jwt    = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

const salt = 10;

// ================ AUTHENTICATION ==================
exports.Me = async (req, res) =>{
    return res.json({msg: "Success", id: req.id, nama_user: req.nama_user, role: req.role});
}

// ================ REGISTER DATA ==================
exports.Register = async(req, res) => {
    const {nama_user, email, password, role} = req.body;
    const hashPassword = await bcrypt.hash(password.toString(), salt);

    if (!nama_user || !email || !password || !role) {
        return res.status(400).json({ msg: "All fields are required" });
    }

    try {
        await prisma.tbl_user.create({
            data:{
                nama_user: nama_user,
                email: email,
                password: hashPassword,
                role: role,
            }
        });
        res.status(201).json({msg: "Register Berhasil"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

// ================ LOGIN DATA ==================
exports.Login = async (req, res) =>{
    const user = await prisma.tbl_user.findFirst({
        where: {
            email: req.body.email
        }
    });

    if(!user) return res.status(404).json({msg: "Email Salah"});
    const match = await bcrypt.compare(req.body.password.toString(), user.password);
    if(!match) return res.status(400).json({msg: "Password Salah"});
    
    const id        = user.id;
    const nama_user = user.nama_user;
    const role      = user.role;
    
    const token = jwt.sign({id, nama_user, role}, "jwt-secret-key", {expiresIn: '1d'});
    res.cookie('token', token);

    res.status(201).json({msg: "Success", role});
}

// ================ LOGOUT DATA ==================
exports.Logout = async (req, res) =>{
    res.clearCookie('token');
    res.status(201).json({msg: "Logout Berhasil"});
}