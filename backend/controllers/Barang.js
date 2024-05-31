const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

const path = require("path");
const fs   = require("fs");
const { log } = require("console");

//====================Get All Data===================
exports.getAllData = async (req, res) =>{
    try{
        const response = await prisma.tbl_barang.findMany();
        res.status(200).json(response);
    } catch(error){
        res.status(400).json({msg: error.message});
    }
}

//====================Get Data By Id===================
exports.getDataById = async (req, res) =>{
    try{
        const response = await prisma.tbl_barang.findUnique({
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
    if(req.files==null) return res.status(400).json({msg: "No File Uploaded"});
    const {kd_barang, nama_barang, merk, stok, spesifikasi} = req.body;
    const file        = req.files.foto_barang;
    const fileSize    = file.data.length;
    const ext         = path.extname(file.name);
    const fileName    = file.md5 + ext;
    const allowedType = ['.png', '.jpg', 'jpeg'];

    if(!allowedType.includes(ext.toLowerCase()))return res.status(422).json({msg:"Invalid Images"});
    if(fileSize > 10000000) return res.status(422).json({msg: "Image must be less than 10MB"});

    const barang = await prisma.tbl_barang.findFirst({
        where:{
            kd_barang: kd_barang
        }
    })

    if(barang){
        res.status(400).json({msg: "Kode Barang Sudah Ada"});
    }
    else{
        file.mv(`./public/images/${fileName}`,async(err)=>{
            if(err) return res.status(500).json({msg: err.message});
            try{
                await prisma.tbl_barang.create({
                    data:{
                        kd_barang: kd_barang,
                        nama_barang: nama_barang,
                        merk: merk,
                        stok: Number(stok),
                        spesifikasi: spesifikasi,
                        foto_barang: fileName,
                    }
                });
                res.status(201).json({msg: "Data Berhasil Disimpan"});
            }catch(error){
                console.log(error.message);
            }
        })
    }
}

//====================Update Data===================
exports.Update = async (req, res) =>{
    const barang = await prisma.tbl_barang.findUnique({
        where:{
            id: Number(req.params.id)
        }
    });

    if(!barang) return res.status(404).json({msg: "Data Not Found"});

    let fileName= "";
    if(req.files=== null){
        fileName = barang.foto_barang;
    }else{
        const file        = req.files.foto_barang;
        const fileSize    = file.data.length;
        const ext         = path.extname(file.name);
        fileName          = file.md5 + ext;
        const allowedType = ['.png', '.jpg', 'jpeg'];

        if(!allowedType.includes(ext.toLowerCase()))return res.status(422).json({msg:"Invalid Images"});
        if(fileSize > 10000000) return res.status(422).json({msg: "Image must be less than 10MB"});

        const filepath = `./public/images/${barang.foto_barang}`;
        fs.unlinkSync(filepath);

        file.mv(`./public/images/${fileName}`,async(err)=>{
            if(err) return res.status(500).json({msg: err.message});
        });
    }
    const {kd_barang, nama_barang, merk, stok, spesifikasi} = req.body;

    try{
        await prisma.tbl_barang.create({
            data:{
                kd_barang: kd_barang,
                nama_barang: nama_barang,
                merk: merk,
                stok: Number(stok),
                spesifikasi: spesifikasi,
                foto_barang: fileName,
            }
        });
        res.status(200).json({msg: "Data Berhasil Diubah"});
    }catch(error){
        console.log(error.message);
    }
}

//====================Delete Data===================
exports.Destroy = async (req, res) =>{
    const barang = await prisma.tbl_barang.findUnique({
        where:{
            id: Number(req.params.id)
        }
    });
    if(!barang) return res.status(404).json({msg: "Data Not Found"});

    try{
        const filepath = `./public/images/${barang.foto_barang}`;
        fs.unlinkSync(filepath);
        await prisma.tbl_barang.delete({
            where:{
                id: Number(req.params.id)
            }
        });
        res.status(200).json({msg: "Data Berhasil Dihapus"});
    } catch(error){
        console.log(error.message);
    }
}