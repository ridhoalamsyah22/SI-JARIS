const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

const bcrypt = require('bcrypt');

const salt = 10;

//====================Get All Data===================
exports.getAllData = async (req, res) =>{
    try{
        const response = await prisma.tbl_user.findMany();
        res.status(200).json(response);
    } catch(error){
        res.status(400).json({msg: error.message});
    }
}

//====================Get Data By Id===================
exports.getDataById = async (req, res) =>{
    try{
        const response = await prisma.tbl_user.findUnique({
            where:{
                id: Number(req,params.id)
            }
        });
        res.status(200).json(response);
    } catch(error){
        res.status(400).json({msg: error.message});
    }
}

//====================Insert Data===================
exports.Store = async (req, res) =>{
    const {nama_user, email, password, role}= req.body;
    const hashPassword = await bcrypt.hash(password.toString(),salt);

    const user = await prisma.tbl_user.findFirst({
        where:{
            email: email
        }
    });

    if(user){
        res.status(400).json({msg: "Email Sudah Terdaftar"});
    } else{
        try{
            await prisma.tbl_user.create({
                data:{
                    nama_user: nama_user,
                    email: email,
                    password: hashPassword,
                    role: role,
                }
            });
            res.status(200).json({msg: "Data Berhasil Disimpan"});
        } catch(error){
            res.status(400).json({msg: error.message});
        }
    }
}

//====================Update Data===================
exports.Update = async (req, res) =>{
    const user = await prisma.tbl_user.findUnique({
        where:{
            id: Number(req.params.id)
        }
    });

    if(!user) return res.status(404).json({msg: "Data Not Found"});
    const {nama_user, email, password, role}= req.body;

    let hashPassword;
    if(password=== ""||password=== null){
        hashPassword = user.password
    }else{
        hashPassword = await bcrypt.hash(password.toString(), salt);
    }
    
    try{
        await prisma.tbl_user.update({
            where:{
                id: Number(req.params.id)
            },
            data:{
                nama_user: nama_user,
                email: email,
                password: hashPassword,
                role: role,
            }
        });
        res.status(200).json({msg: "Data Berhasil Diubah"});
    } catch(error){
        res.status(400).json({msg: error.message});
    }
}

//====================Delete Data===================
exports.Destroy = async (req, res) =>{
    try{
        await prisma.tbl_user.delete({
            where:{
                id: Number(req.params.id)
            }
        });
        res.status(200).json({msg: "Data Berhasil Dihapus"});
    } catch(error){
        res.status(400).json({msg: error.message});
    }
}