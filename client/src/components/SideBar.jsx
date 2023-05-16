import React, {useState, useEffect} from 'react'
import axios from 'axios'

function SideBar() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/categories')
        .then(res => setCategories(res.data))
        .catch(err => console.log(err))
    }, [])

    return (
        <div className='bg-slate-800 fixed top-[65px] h-[100vh] w-[300px] overflow-auto'>
            <ul>
                <li className='text-white p-3 font-medium'>All</li>
                {categories.map(cat => (
                    <li key={cat.id} className='text-white p-3 font-medium capitalize'>{cat.nom}</li>
                ))}
            </ul>
        </div>
    )
}

export default SideBar