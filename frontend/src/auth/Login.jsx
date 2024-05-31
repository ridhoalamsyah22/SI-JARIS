import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';
import Swal from 'sweetalert2';

import { API_URL } from '../API_URL';

const initialState = {
    email: '',
    password: '',
};

function Login() {
    const [values, setValues] = useState(initialState)
    
    const onChangeText = (key, value) => {
        setValues({...values, [key]: value})
    }

    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    
    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            await axios.post(API_URL+"login", values).then(res => {
                if(res.data.msg === "Success") {
                    if(res.data.role === 'Admin') {
                        Swal.fire({
                            icon:"success",
                            title:"SUCCESS",
                            text:'Login Berhasil'
                        })
                        navigate('/homeAdmin');
                    }
                    else if(res.data.role === 'Staff') {
                        Swal.fire({
                            icon:"success",
                            title:"SUCCESS",
                            text:'Login Berhasil'
                        })
                        navigate('/homeStaff');
                    }
                    else if(res.data.role === 'User') {
                        Swal.fire({
                            icon:"success",
                            title:"SUCCESS",
                            text:'Login Berhasil'
                        })
                        navigate('/homeUser');
                    }
                    else {
                        navigate('/')
                    }   
                }
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
<section className="vh-100" style={{backgroundColor: '#9A616D'}}>
        <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col col-xl-6">
                    <div className="card" style={{borderRadius: '1rem'}}>
                        <div className="row g-0">
                            <div className="col-md-6 col-lg-12 d-flex align-items-center">
                                <div className="card-body p-4 p-lg-5 text-black">
                                    <form onSubmit={handleLogin}>
                                        <h4 className="fw-normal mb-3 pb-3" style={{letterSpacing: 1, fontWeight: "bold"}}><center>Silahkan Login</center></h4>
                                        <div className="form-outline mb-4">
                                            <label>Email</label>
                                            <input type="email" name="email" className="form-control form-control-lg" placeholder="Email ..." 
                                            onChange={(e) => onChangeText(e.target.name, e.target.value)} value={values.email} required />
                                        </div>
                                        <div className="form-outline mb-4">
                                            <label>Password</label>
                                            <input type="password" name="password" className="form-control form-control-lg" placeholder="Password ..." 
                                            onChange={(e) => onChangeText(e.target.name, e.target.value)} value={values.password} required />
                                        </div>
                                        <div className="pt-1 mb-4">
                                            <button className="btn btn-primary btn-lg btn-block" type="submit">Login</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
)
}

export default Login