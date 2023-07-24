import React from 'react'
import 'primeicons/primeicons.css';
import { Link } from 'react-router-dom';
import '../CSS files/CRUD.css'


const Navbar = () => {

    return (
        <div className='bg-info d-flex  p-3' >
            <div className='text-start'>
                <Link to="/Tasks">
                    <i className="pi pi-prime text-black" style={{ fontSize: '2rem' }}></i>
                </Link>
            </div>

            <div className='ms-auto'>
            <Link to="/">
                <div className='hitman-logo   float-end  text-center float-right'>

                </div>
                </ Link>

            </div>
            <div className='ms-auto '>
                <Link to='/myform'>
                    <i className="pi pi-spin pi-cog me-auto text-black px-1" style={{ fontSize: '2rem' }}></i>


                </Link>
                <Link to='/login'>
                    <i className="pi  pi-user me-auto text-black px-1" style={{ fontSize: '2rem' }}></i>
                </Link>
            </div>

        </div>
    )
}

export default Navbar