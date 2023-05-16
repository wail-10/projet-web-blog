import React from 'react'
import Switch from '@mui/material/Switch';

function NavBar() {
    return (
        <nav className='bg-slate-800 h-[100px] flex items-center justify-between p-5'>
            <h1 className='text-white text-3xl font-bold'>LOGO</h1>
            <Switch></Switch>
        </nav>
    )
}

export default NavBar