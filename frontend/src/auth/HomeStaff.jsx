import Layout from '../Layout/Layout'
import Avatar from '../assets/compiled/jpg/1.jpg'

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../API_URL';

function HomeStaff() {

    const [role, setRole] = useState('');
    const [nama_user, setNama] = useState('');

    axios.defaults.withCredentials = true;
    const navigate = useNavigate()
    
    useEffect(()=> {
        fetchAuth()
    }, [])

    const fetchAuth = async () => {
        await axios.get(API_URL)
        .then(res => {
            if(res.data.msg === 'Success') {
                setNama(res.data.nama_user)
                setRole(res.data.role)
            }else {
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
                                <h3>Dashboard</h3>
                            </div>
                            <div className="col-12 col-md-6 order-md-2 order-first">
                                <nav aria-label="breadcrumb" className="breadcrumb-header float-start float-lg-end">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><a href="index.html">Dashboard</a></li>
                                        <li className="breadcrumb-item active" aria-current="page">Dashboard</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <section className="row">
                        <div className="col-12 col-lg-12">
                            <div className="row">
                                <div className="col-6 col-lg-4 col-md-6">
                                    <div className="card">
                                        <div className="card-body px-4 py-4-5">
                                            <div className="row">
                                                <div className="col-md-4 col-lg-12 col-xl-12 col-xxl-5 d-flex justify-content-start ">
                                                    <div className="stats-icon purple mb-2">
                                                        <i className="fa fa-users" />
                                                    </div>
                                                </div>
                                                <div className="col-md-8 col-lg-12 col-xl-12 col-xxl-7">
                                                    <h6 className="text-muted font-semibold">Data User</h6>
                                                    <h6 className="font-extrabold mb-0">11</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6 col-lg-4 col-md-6">
                                    <div className="card">
                                        <div className="card-body px-4 py-4-5">
                                            <div className="row">
                                                <div className="col-md-4 col-lg-12 col-xl-12 col-xxl-5 d-flex justify-content-start ">
                                                    <div className="stats-icon dark mb-2">
                                                        <i className="fa fa-briefcase" />
                                                    </div>
                                                </div>
                                                <div className="col-md-8 col-lg-12 col-xl-12 col-xxl-7">
                                                    <h6 className="text-muted font-semibold">Data Barang</h6>
                                                    <h6 className="font-extrabold mb-0">9</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6 col-lg-4 col-md-6">
                                    <div className="card">
                                        <div className="card-body px-4 py-4-5">
                                            <div className="row">
                                                <div className="col-md-4 col-lg-12 col-xl-12 col-xxl-5 d-flex justify-content-start ">
                                                    <div className="stats-icon green mb-2">
                                                        <i className="fa fa-desktop" />
                                                    </div>
                                                </div>
                                                <div className="col-md-8 col-lg-12 col-xl-12 col-xxl-7">
                                                    <h6 className="text-muted font-semibold">Data Peminjaman</h6>
                                                    <h6 className="font-extrabold mb-0">0</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-6 col-lg-6 col-md-6">
                                    <div className="card">
                                        <div className="card-body px-4 py-4-5">
                                            <div className="row">
                                                <div className="col-md-4 col-lg-12 col-xl-12 col-xxl-5 d-flex justify-content-start ">
                                                    <div className="stats-icon bg-warning mb-2">
                                                        <i className="fa fa-desktop" />
                                                    </div>
                                                </div>
                                                <div className="col-md-8 col-lg-12 col-xl-12 col-xxl-7">
                                                    <h6 className="text-muted font-semibold">Peminjaman Menunggu</h6>
                                                    <h6 className="font-extrabold mb-0">0</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6 col-lg-6 col-md-6">
                                    <div className="card">
                                        <div className="card-body px-4 py-4-5">
                                            <div className="row">
                                                <div className="col-md-4 col-lg-12 col-xl-12 col-xxl-5 d-flex justify-content-start ">
                                                    <div className="stats-icon red mb-2">
                                                        <i className="fa fa-desktop" />
                                                    </div>
                                                </div>
                                                <div className="col-md-8 col-lg-12 col-xl-12 col-xxl-7">
                                                    <h6 className="text-muted font-semibold">Peminjaman Ditolak</h6>
                                                    <h6 className="font-extrabold mb-0">0</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6 col-lg-6 col-md-6">
                                    <div className="card">
                                        <div className="card-body px-4 py-4-5">
                                            <div className="row">
                                                <div className="col-md-4 col-lg-12 col-xl-12 col-xxl-5 d-flex justify-content-start ">
                                                    <div className="stats-icon blue mb-2">
                                                        <i className="fa fa-desktop" />
                                                    </div>
                                                </div>
                                                <div className="col-md-8 col-lg-12 col-xl-12 col-xxl-7">
                                                    <h6 className="text-muted font-semibold">Peminjaman Disetujui</h6>
                                                    <h6 className="font-extrabold mb-0">0</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6 col-lg-6 col-md-6">
                                    <div className="card">
                                        <div className="card-body px-4 py-4-5">
                                            <div className="row">
                                                <div className="col-md-4 col-lg-12 col-xl-12 col-xxl-5 d-flex justify-content-start ">
                                                    <div className="stats-icon green mb-2">
                                                        <i className="fa fa-desktop" />
                                                    </div>
                                                </div>
                                                <div className="col-md-8 col-lg-12 col-xl-12 col-xxl-7">
                                                    <h6 className="text-muted font-semibold">Peminjaman Selesai</h6>
                                                    <h6 className="font-extrabold mb-0">0</h6>
                                                </div>
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

export default HomeStaff