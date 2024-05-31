import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import axios from 'axios';
import { API_URL } from '../../API_URL';
import Swal from 'sweetalert2';
import { useSWRConfig } from "swr";

const initialState = {
    nama_user: '',
    email: '',
    password: '',
    role: '',
};

function CreateUser() {

    const [values, setValues] = useState(initialState)
    const onChangeText = (key, value) => {
        setValues({...values, [key]:value})
    }
    const { mutate } = useSWRConfig();
    
    const handleSave = async (event) => {
        event.preventDefault();
        try{
            const formData = new formData();

            formData.append('nama_user', values.nama_user);
            formData.append('email', values.email);
            formData.append('password', values.password);
            formData.append('role', values.role);

            await axios.post(API_URL+"user/store", formData, {
                headers:{
                    "Content-type": "multipart/form-data"
                },
            }).then(res =>{
                Swal.fire({
                    icon:"success",
                    tittle:"SUCCESS",
                    text:res.data.msg
                })
                setShow(false)
                mutate("user");
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

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <button className='btn tbn-sm btn-primary' onClick={handleShow}>
                <i className='fa fa-plus'></i>Tambah Data
            </button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Data User</Modal.Title>
                </Modal.Header>
                <form onSubmit={handleSave}>
                <Modal.Body>
                    <div className='row'>
                        <div className='col-md-12 col-12'>
                            <div className='form-group mb-3'>
                                <label>Nama Lengkap</label>
                                <input type='text' className='form-control' name='nama_user' placeholder='Nama Lengkap...' onChange={(e) => onChangeText(e.target.name, e.target.value)} value={values.nama_user} required/>
                            </div>
                            <div className='form-group mb-3'>
                                <label>Email</label>
                                <input type='email' className='form-control' name='email' placeholder='Email...' onChange={(e) => onChangeText(e.target.name, e.target.value)} value={values.email}  required/>
                            </div>
                            <div className='form-group mb-3'>
                                <label>Password</label>
                                <input type='password' className='form-control' name='password' placeholder='Password...' onChange={(e) => onChangeText(e.target.name, e.target.value)} value={values.password}  required/>
                            </div>
                            <div className='form-group mb-3'>
                                <label>Role</label>
                                <select className="form-select" name='role' onChange={(e) => onChangeText(e.target.name, e.target.value)} value={values.role} required>
                                    <option value="" hidden>-- Pilih Role --</option>
                                    <option value="Admin">Admin</option>
                                    <option value="Staff">Staff</option>
                                    <option value="User">User</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className='btn btn-danger' type='button' onClick={handleClose}>
                        <i className='fa fa-undo'></i>Close
                    </button>
                    <button className='btn btn-primary'type='submit'>
                        <i className='fa fa-save'></i>Save Changes
                    </button>
                </Modal.Footer>
                </form>
            </Modal>
        </div>
    )
}

export default CreateUser
