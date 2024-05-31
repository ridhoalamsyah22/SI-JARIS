import Logo from '../asset/Logo1.svg'
import { useNavigate, Link } from 'react-router-dom'

import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../API_URL';
import Swal from 'sweetalert2';

function Layout() {
    const [role, setRole] = useState('');

    axios.defaults.withCredentials = true;
    const navigate = useNavigate()

    useEffect(()=> {
        fetchAuth()
    }, [])

    const fetchAuth = async () => {
        await axios.get(API_URL)
        .then(res => {
            if(res.data.msg === 'Success') {
                setRole(res.data.role)
            }else {
                navigate('/')
            }
        })
        .then(err => console.log(err));
    }

    const handleLogout = async () => {
        try {
            await axios.get(API_URL+"logout").then(res => {
                Swal.fire({
                    icon:"success",
                    title:"SUCCESS",
                    text:res.data.msg
                })
                navigate('/');
            });
        } catch (error) {
            if (error.response) {
                Swal.fire({
                    icon:"error",
                    title:"ERROR",
                    text:error.response.data.msg
                })
            }
        }
    }
    return (
        <div id="sidebar" className="active">
        <div className="sidebar-wrapper active">
            <div className="sidebar-header position-relative">
                <div className="d-flex justify-content-between align-items-center">
                    <div className="logo">
                        <a href="/"><img src={Logo} alt="Logo" srcSet /></a>
                    </div>
                </div>
            </div>
            <div className="sidebar-menu">
                {role === 'Admin' && 
                <ul className="menu">
                    <li className="sidebar-title">Dashboard</li>
                    <li className="sidebar-item">
                        <Link to="/homeAdmin" className="sidebar-link">
                            <i className="bi bi-grid-fill" />
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    <li className="sidebar-title">Component</li>
                    <li className="sidebar-item">
                        <Link to="/user" className="sidebar-link">
                            <i className="bi bi-person-fill" />
                            <span>Data User</span>
                        </Link>
                    </li>
                    <li className="sidebar-item">
                        <a href="/barang" className="sidebar-link">
                            <i className="bi bi-briefcase-fill" />
                            <span>Data Barang</span>
                        </a>
                    </li>
                    <li className="sidebar-item">
                        <Link to="/peminjaman" className="sidebar-link">
                            <i className="bi bi-display" />
                            <span>Data Peminjaman</span>
                        </Link>
                    </li>
                    <li className="sidebar-item">
                        <a href="/laporan" className="sidebar-link">
                            <i className="bi bi-file-earmark-arrow-down-fill" />
                            <span>Data Laporan</span>
                        </a>
                    </li>
                    <li className="sidebar-item">
                        <Link onClick={handleLogout} className="sidebar-link">
                            <i className="bi bi-box-arrow-right" />
                            <span>Logout</span>
                        </Link>
                    </li>
                </ul>
                }
                {role === 'Staff' && 
                <ul className="menu">
                    <li className="sidebar-title">Dashboard</li>
                    <li className="sidebar-item">
                        <Link to="/homeKepala" className="sidebar-link">
                            <i className="bi bi-grid-fill" />
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    <li className="sidebar-title">Component</li>
                    <li className="sidebar-item">
                        <Link to="/peminjaman" className="sidebar-link">
                            <i className="bi bi-display" />
                            <span>Data Peminjaman</span>
                        </Link>
                    </li>
                    <li className="sidebar-item">
                        <Link onClick={handleLogout} className="sidebar-link">
                            <i className="bi bi-box-arrow-right" />
                            <span>Logout</span>
                        </Link>
                    </li>
                </ul>
                }
                {role === 'User' && 
                <ul className="menu">
                    <li className="sidebar-title">Dashboard</li>
                    <li className="sidebar-item">
                        <Link to="/homeUser" className="sidebar-link">
                            <i className="bi bi-grid-fill" />
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    <li className="sidebar-title">Component</li>
                    <li className="sidebar-item">
                        <Link to="/peminjaman" className="sidebar-link">
                            <i className="bi bi-display" />
                            <span>Data Peminjaman</span>
                        </Link>
                    </li>
                    <li className="sidebar-item">
                        <Link onClick={handleLogout} className="sidebar-link">
                            <i className="bi bi-box-arrow-right" />
                            <span>Logout</span>
                        </Link>
                    </li>
                </ul>
                }
            </div>
        </div>
    </div>
);
}

export default Layout