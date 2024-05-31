import Layout from '../../Layout/Layout';
import Avatar from '../../assets/compiled/jpg/2.jpg';

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../API_URL';
import useSWR, { useSWRConfig } from 'swr';
import Swal from 'sweetalert2';
import { Dropdown,DropdownButton, ButtonGroup } from 'react-bootstrap';

import 'jquery/dist/jquery.min.js'
import "datatables.net-dt/js/dataTables.dataTables"
import 'datatables.net-dt/css/dataTables.dataTables.min.css';
import $ from 'jquery';

function ListBarang() {

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

    const { mutate } =useSWRConfig();
    const fetcher = async() => {
        const response = await axios.get(API_URL+"barang");
        return response.data;
    }

    const { data } = useSWR("barang", fetcher);
    if (!data) return'';

    const handleDelete = async(id) =>{
        const isConfirm = await Swal.fire({
            title: 'WARNING',
            text: "Hapus Data Ini ?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Hapus'
        }).then((result) => {
            return result.isConfirmed
        });

        if(!isConfirm){
            return;
        }

        try{
            await axios.delete(API_URL+"barang/destroy/"+id).then(res =>{
                Swal.fire({
                    icon: 'success',
                    title: "SUCCESS",
                    text: res.data.msg
                })
                mutate("barang");
            });
        }catch(error){
            if(error.response){
                Swal.fire({
                    icon: 'error',
                    title: "ERROR",
                    text: error.response.data.msg
                });
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
                                    <h3>Data Barang</h3>
                                </div>
                                <div className="col-12 col-md-6 order-md-2 order-first">
                                    <nav aria-label="breadcrumb" className="breadcrumb-header float-start float-lg-end">
                                        <ol className="breadcrumb">
                                            <li className="breadcrumb-item"><a href="#">Data</a></li>
                                            <li className="breadcrumb-item active" aria-current="page">Data Barang</li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                        <section className="section">
                            <div className="card">
                                <div className="card-header">
                                    <Link className='btn btn-sm btn-primary' to='/barang/create'>
                                        <i className='fa fa-plus'></i>Tambah Data
                                    </Link>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table" id="table1" style={{width: '100%'}}>
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
                                                {data.map((row, key) => (
                                                    <tr key={key}>
                                                        <td>{key + 1}</td>
                                                        <td>{row.kd_barang}</td>
                                                        <td>{row.nama_barang}</td>
                                                        <td>{row.merk}</td>
                                                        <td>{row.stok} PCS</td>
                                                        <td>
                                                            <div className="mb-2">
                                                                {['start'].map(
                                                                    (direction) => (
                                                                        <DropdownButton
                                                                            as={ButtonGroup}
                                                                            key={direction}
                                                                            id={`dropdown-button-drop-${direction}`}
                                                                            drop={direction}
                                                                            variant="primary"
                                                                            title={`Action`}
                                                                            size='sm'
                                                                        >
                                                                            <Dropdown.Item href={`/barang/detail/${row.id}`}>
                                                                                <i className='fa fa-list'></i>Detail Data
                                                                            </Dropdown.Item>
                                                                            <Dropdown.Item href={`/barang/edit/${row.id}`}>
                                                                                <i className='fa fa-edit'></i>Edit Data
                                                                            </Dropdown.Item>
                                                                            <Dropdown.Item onClick={() => handleDelete(row.id)}>
                                                                                <i className='fa fa-trash'></i>Hapus Data
                                                                            </Dropdown.Item>
                                                                        </DropdownButton>
                                                                    ),
                                                                )}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
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

export default ListBarang