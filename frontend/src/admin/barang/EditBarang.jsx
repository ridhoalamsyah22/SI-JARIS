import Layout from '../../Layout/Layout';
import Avatar from '../../assets/compiled/jpg/2.jpg';

import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../API_URL';
import Swal from 'sweetalert2';

const initialState = {
    kd_barang: '',
    nama_barang: '',
    merk: '',
    stok: '',
    spesifikasi: '',
    foto_barang: '',
}

function EditBarang() {
    const [role, setRole] = useState('');
    const [nama_user, setNama] = useState('');

    axios.defaults.withCredentials = true;
    const navigate = useNavigate()

    const { id } = useParams();

    useEffect(() => {
        fetchAuth()
        fetchBarangId()
    }, [])

    const fetchBarangId = async () => {
        await axios.get(API_URL+`barang/update/`+id)
            .then(res => {
                console.log(res)
                setValues({
                    ...values,
                    kd_barang: res.data.kd_barang,
                    nama_barang: res.data.nama_barang,
                    merk: res.data.merk,
                    stok: res.data.stok,
                    spesifikasi: res.data.spesifikasi,
                    foto_barang: res.data.foto_barang,
                });
            })
            .then(err => console.log(err));
    }

    const fetchAuth = async () => {
        await axios.get(API_URL)
            .then(res => {
                if (res.data.msg === 'Success') {
                    setNama(res.data.nama_user)
                    setRole(res.data.role)
                } else {
                    navigate('/')
                }
            })
            .then(err => console.log(err));
    }

    const [values, setValues] = useState(initialState)

    const [foto_barang, setFoto] = useState('');
    const [preview, setPreview] = useState('');

    const loadImage = (e) =>{
        const image = e.target.files[0];
        setFoto(image);
        setPreview(URL.createObjectURL(image));
    }

    const handleUpdate = async (event) => {
        event.preventDefault();
        try{
            const formData = new formData();

            formData.append('kd_barang', values.kd_barang);
            formData.append('nama_barang', values.nama_barang);
            formData.append('merk', values.merk);
            formData.append('stok', values.stok);
            formData.append('spesfikasi', values.spesifikasi);
            formData.append('foto_barang', foto_barang);

            await axios.put(API_URL+"barang/update/"+id, formData, {
                headers:{
                    "Content-type": "multipart/form-data"
                },
            }).then(res =>{
                Swal.fire({
                    icon:"success",
                    tittle:"SUCCESS",
                    text:res.data.msg
                })
                navigate('/barang');
            })
        }catch(error){
            if(error.response){
                Swal.fire({
                    icon:"error",
                    tittle:"ERROR",
                    text:error.response.data.msg
                })
            }
        }
    }

    return (
        <div id="app">
            <Layout />
            <div id="main" className="layout-navbar">
                <header className="mb-3">
                    <nav className="navbar navbar-expand navbar-light navbar-top">
                        <div className="container-fluid">
                            <a href="#" className="burger-btn d-block">
                                <i className="bi bi-justify fs-3" />
                            </a>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon" />
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav ms-auto mb-lg-0"></ul>
                                <div className="dropdown">
                                    <a href="#" aria-expanded="false">
                                        <div className="user-menu d-flex">
                                            <div className="user-name text-end me-3">
                                                <h6 className="mb-0 text-gray-600">{nama_user}</h6>
                                                <p className="mb-0 text-sm text-gray-600">{role}</p>
                                            </div>
                                            <div className="user-img d-flex align-items-center">
                                                <div className="avatar avatar-md">
                                                    <img src={Avatar} />
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </nav>
                </header>
                <div id="main-content">
                    <div className="page-heading">
                        <div className="page-title">
                            <div className="row">
                                <div className="col-12 col-md-6 order-md-1 order-last">
                                    <h3>Edit Data Barang</h3>
                                </div>
                                <div className="col-12 col-md-6 order-md-2 order-first">
                                    <nav aria-label="breadcrumb" className="breadcrumb-header float-start float-lg-end">
                                        <ol className="breadcrumb">
                                            <li className="breadcrumb-item"><a href="#">Edit Data</a></li>
                                            <li className="breadcrumb-item active" aria-current="page">Data Barang</li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                        <section id="multiple-column-form">
                            <div className="row match-height">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <h4 className="card-title">Edit Data Barang</h4>
                                        </div>
                                        <div className="card-content">
                                            <form onSubmit={handleUpdate} className="form" data-parsley-validate>
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col-md-6 col-12">
                                                            <div className="form-group">
                                                                <label>Kode Barang</label>
                                                                <input type="text" className="form-control" placeholder="Kode Barang..." name="kd_barang" onChange={(e) => onChangeText(e.target.name, e.target.value)} value={values.kd_barang} required />
                                                            </div>
                                                            <div className="form-group">
                                                                <label>Nama Barang</label>
                                                                <input type="text" className="form-control" placeholder="Nama Barang..." name="nama_barang" onChange={(e) => onChangeText(e.target.name, e.target.value)} value={values.nama_barang} required />
                                                            </div>
                                                            <div className="form-group">
                                                                <label>Merk</label>
                                                                <input type="text" className="form-control" placeholder="Merk..." name="merk" onChange={(e) => onChangeText(e.target.name, e.target.value)} value={values.merk} required />
                                                            </div>
                                                            <div className="form-group">
                                                                <label>Stok</label>
                                                                <div className="input-group mb-3">
                                                                    <input type="number" className="form-control" placeholder="Stok..." name='stok' onChange={(e) => onChangeText(e.target.name, e.target.value)} value={values.stok} required />
                                                                    <span className="input-group-text" id="basic-addon2">PCS</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 col-12">
                                                            <div className="form-group">
                                                                <label>Spesifikasi</label>
                                                                <textarea  className="form-control" placeholder="Spesifikasi..." rows={7} name="spesifikasi" onChange={(e) => onChangeText(e.target.name, e.target.value)} value={values.spesifikasi} required />
                                                            </div>
                                                            <div className="form-group">
                                                                <label>Foto barang</label>
                                                                <input type="file" className="form-control" name="foto_barang" accept='images/*' onChange={loadImage} />
                                                            </div>
                                                            <div className="form-group">
                                                                {preview?(
                                                                    <figure className='image is-128x128'>
                                                                        <center><img src={preview} alt='Preview Image' width='150' height='150'/></center>
                                                                    </figure>
                                                                ):(
                                                                    <center><img src={API_URL+'images/'+values.foto_barang} alt='Preview Image' width='150' height='150'/></center>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card-footer">
                                                    <div className="col-12 d-flex justify-content-end">
                                                        <button type="submit" className="btn btn-primary">
                                                        <i className='fa fa-save'></i>Save Changes
                                                        </button>&nbsp;
                                                        <link to='/barang' className="btn btn-danger">
                                                            <i className='fa fa-undo'></i>Kembali
                                                        </link>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditBarang