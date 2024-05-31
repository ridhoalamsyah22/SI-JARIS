import Layout from '../../Layout/Layout';
import Avatar from '../../assets/compiled/jpg/2.jpg';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../API_URL';
import Swal from 'sweetalert2';
import { Modal } from 'react-bootstrap';

import 'jquery/dist/jquery.min.js'
import "datatables.net-dt/js/dataTables.dataTables"
import 'datatables.net-dt/css/dataTables.dataTables.min.css';
import $ from 'jquery';

const initialState = {
    kd_barang: '',
    nama_barang: '',
    merk: '',
    stok: '',
    spesifikasi: '',
    foto_barang: '',
}

function CreatePeminjaman() {
    const [role, setRole] = useState('');
    const [nama_user, setNama] = useState('');

    axios.defaults.withCredentials = true;
    const navigate = useNavigate()

    useEffect(() => {
        fetchAuth()
        $(document).ready(function(){
            setTimeout(function(){
                $('#tabel1').DataTable();
            }, 1000);
        })
    }, [])

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

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
                                    <h3>Create Data Peminjaman</h3>
                                </div>
                                <div className="col-12 col-md-6 order-md-2 order-first">
                                    <nav aria-label="breadcrumb" className="breadcrumb-header float-start float-lg-end">
                                        <ol className="breadcrumb">
                                            <li className="breadcrumb-item"><a href="#">Create Data</a></li>
                                            <li className="breadcrumb-item active" aria-current="page">Data Peminjaman</li>
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
                                            <h4 className="card-title">Create Data Peminjaman</h4>
                                        </div>
                                        <div className="card-content">
                                            <form className="form" data-parsley-validate>
                                                <div className="card-body">
                                                    <div className="divider">
                                                        <div className="divider-text">Data Barang</div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-6 col-12">
                                                            <div className="form-group">
                                                                <label>Nama Barang</label>
                                                                <input type="text" className="form-control" placeholder="Nama Barang..." name='nama_barang' readOnly required />
                                                                <button type='button' className="btn btn-primary" onClick={handleShow}>
                                                                    <i className='fa fa-search'></i>Search
                                                                </button>
                                                            </div>
                                                            <div className="form-group">
                                                                <label>Kode Barang</label>
                                                                <input type="text" className="form-control" placeholder="Kode Barang..." name="kd_barang" readOnly required />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 col-12">
                                                            <div className="form-group">
                                                                <label>Merk</label>
                                                                <input type="text" className="form-control" placeholder="Merk..." name="merk" readOnly required />
                                                            </div>
                                                            <div className="form-group">
                                                                <label>Stok</label>
                                                                <div className="input-group mb-3">
                                                                    <input type="number" className="form-control" placeholder="Stok..." name='stok' readOnly required />
                                                                    <span className="input-group-text" id="basic-addon2"> PCS</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-4 col-12">
                                                            <div className="form-group">
                                                                <label>Tgl Pinjam</label>
                                                                <input type="date" className="form-control" name="tgl_pinjam" required />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4 col-12">
                                                            <div className="form-group">
                                                                <label>Tgl Selesai</label>
                                                                <input type="date" className="form-control" name="tgl_selesai" required />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4 col-12">
                                                            <div className="form-group">
                                                                <label>Qty</label>
                                                                <div className="input-group mb-3">
                                                                    <input type="number" className="form-control" placeholder="Qty..." name='qty' required />
                                                                    <span className="input-group-text" id="basic-addon2"> PCS</span>
                                                                </div>
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
            <Modal show={show} size="lg" onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Tambah Barang</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="table-responsive">
                        <table className="table" id="table1" style={{ width: '100%' }}>
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Kode</th>
                                    <th>Nama</th>
                                    <th>Merk</th>
                                    <th>Stok</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>kode</td>
                                        <td>nama</td>
                                        <td>merk</td>
                                        <td>stok PCS</td>
                                        <td>
                                            <buttoon className="btn btn-primary">
                                                <i className='fa fa-check-circle'></i>Pilih
                                            </buttoon>
                                        </td>
                                    </tr>
                            </tbody>
                        </table>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className='btn btn-danger' type='button' onClick={handleClose}>
                        <i className='fa fa-undo'></i>Close
                    </button>

                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default CreatePeminjaman