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

function DetailBarang() {
    const [role, setRole] = useState('');
    const [nama_user, setNama] = useState('');

    axios.defaults.withCredentials = true;
    const navigate = useNavigate()

    const { id } = useParams();

    useEffect(() => {
        fetchAuth()
        fetchBarangId()
    }, [])

    const [values, setValues] = useState(initialState)

    const fetchBarangId = async () => {
        await axios.get(API_URL + `barang/show/` + id)
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
                                    <h3>Detail Data Barang</h3>
                                </div>
                                <div className="col-12 col-md-6 order-md-2 order-first">
                                    <nav aria-label="breadcrumb" className="breadcrumb-header float-start float-lg-end">
                                        <ol className="breadcrumb">
                                            <li className="breadcrumb-item"><a href="#">Detail Data</a></li>
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
                                            <Link to='/barang' className='btn btn-primary'>
                                                <i className='fa fa-undo'></i>Kembali
                                            </Link>
                                        </div>
                                        <div className="card-content">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md 6 col-12">
                                                        <div className="table-responsive">
                                                            <table className="table table-lg">
                                                                <tr>
                                                                    <td>Kode Barang</td>
                                                                    <td>: {values.kd_barang}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Nama Barang</td>
                                                                    <td>: {values.nama_barang}</td>
                                                                </tr>
                                                            </table>
                                                        </div>
                                                    </div>
                                                    <div className="col-md 6 col-12">
                                                        <div className="table-responsive">
                                                            <table className="table table-lg">
                                                                <tr>
                                                                    <td>Merk</td>
                                                                    <td>: {values.merk}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Stok</td>
                                                                    <td>: {values.stok} PCS</td>
                                                                </tr>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr/>
                                                <div className="table-responsive">
                                                    <table className="table table-bordered">
                                                        <tr>
                                                            <th>Spesifikasi</th>
                                                            <th>Foto Barang</th>
                                                        </tr>
                                                        <tr>
                                                            <td>{values.spesifikasi}</td>
                                                            <td><img src= {API_URL+'images/'+values.foto_barang} width={150} height={150}/></td>
                                                        </tr>
                                                    </table>
                                                </div>
                                            </div>
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

export default DetailBarang