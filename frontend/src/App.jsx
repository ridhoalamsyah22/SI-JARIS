import {BrowserRouter, Routes, Route} from 'react-router-dom'

// Authentication
import Login from './auth/Login'

// Akses Admin
import HomeAdmin from './auth/HomeAdmin'
import ListUser from './admin/user/ListUser'

import ListBarang from './admin/barang/ListBarang'
import EditBarang from './admin/barang/EditBarang'
import CreateBarang from './admin/barang/CreateBarang'
import DetailBarang from './admin/barang/DetailBarang'

import ListPeminjaman from './admin/peminjaman/ListPeminjaman'
import CreatePeminjaman from './admin/peminjaman/CreatePeminjaman'

import Laporan from './admin/laporan/Laporan'

// Akses Staff
import HomeStaff from './auth/HomeStaff'

// Akses User
import HomeUser from './auth/HomeUser'

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Login />}></Route>
            
            {/* Akses Admin */}
            <Route path='/homeAdmin' element={<HomeAdmin />}></Route>
            <Route path='/user' element={<ListUser />}></Route>
            <Route path='/barang' element={<ListBarang />}></Route>
            <Route path='/barang/create' element={<CreateBarang />}></Route>
            <Route path='/barang/edit/:id' element={<EditBarang />}></Route>
            <Route path='/barang/detail/:id' element={<DetailBarang />}></Route>
            <Route path='/peminjaman' element={<ListPeminjaman />}></Route>
            <Route path='/peminjaman/create' element={<CreatePeminjaman />}></Route>
            <Route path='/laporan' element={<Laporan />}></Route>

            {/* Akses Staff */}
            <Route path='/homeStaff' element={<HomeStaff />}></Route>

            {/* Akses User */}
            <Route path='/homeUser' element={<HomeUser />}></Route>
        </Routes>
        
    </BrowserRouter>
  )
}

export default App
