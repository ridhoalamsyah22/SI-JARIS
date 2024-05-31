import Layout from '../../Layout/Layout';
import Avatar from '../../assets/compiled/jpg/2.jpg';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../API_URL';
import useSWR, { useSWRConfig } from 'swr';
import Swal from 'sweetalert2';


function Laporan() {

    const [role, setRole] = useState('');
    const [nama_user, setNama] = useState('');

    axios.defaults.withCredentials = true;
    const navigate = useNavigate()

    useEffect(() => {
        fetchAuth()
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
                                    <h3>Data Laporan</h3>
                                </div>
                                <div className="col-12 col-md-6 order-md-2 order-first">
                                    <nav aria-label="breadcrumb" className="breadcrumb-header float-start float-lg-end">
                                        <ol className="breadcrumb">
                                            <li className="breadcrumb-item"><a href="#">Data</a></li>
                                            <li className="breadcrumb-item active" aria-current="page">Data Laporan</li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                        <section className="section">
                            <div className="card">
                                <div className="card-header">
                                    <h4 className='card-tittle'>Data Laporan</h4>
                                </div>
                                <div className="card-body">
                                    <form>
                                        <div className="row">
                                            <div className="col-md-4 col-12">
                                                <div className="form-group">
                                                    <label>Tgl Mulai</label>
                                                    <input type='date' className='form-control' name='tgl_mulai' required />
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-12">
                                                <div className="form-group">
                                                    <label>Tgl Selesai</label>
                                                    <input type='date' className='form-control' name='tgl_selesai' required />
                                                </div>
                                            </div>
                                            <div className="col-md-2 col-12">
                                                <div className="form-group">
                                                    <button type='submit' style={{ marginTop: '25px' }} className='btn btn-primary'>
                                                        <i className='fa fa-print'></i>Search
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="col-md-2 col-12">
                                                <div className="form-group">
                                                    <button type='submit' style={{ marginTop: '25px' }} className='btn btn-primary'>
                                                        <i className='fa fa-print'></i>Cetak Data
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </section>
                        <section className="section">
                            <div className="card">
                                <center>
                                    <br/>
                                    <br/>
                                    <h5>SISTEM INFORMASI PEMINJAMAN INVENTARIS</h5>
                                    <h5>FASILKOM UNSIKA</h5>
                                    <hr width="96%" height="2px"></hr>
                                    <p style={{fontSize: '19px'}}>LAPORAN PEMINJAMAN</p>
                                </center>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-bordered" style={{width: '100%'}}>
                                            <thead>
                                                <tr>
                                                    <th>No</th>
                                                    <th>User</th>
                                                    <th>Barang</th>
                                                    <th>Tgl Pinjam</th>
                                                    <th>Tgl Selesai</th>
                                                    <th>Qty</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>1</td>
                                                    <td>User</td>
                                                    <td>Stop Kontak</td>
                                                    <td>2024-04-28</td>
                                                    <td>2024-04-28</td>
                                                    <td>2 PCS</td>
                                                    <td>
                                                        <div className="badge bg-warning">Menunggu</div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
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

export default Laporan