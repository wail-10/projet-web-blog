import React, {useState, useEffect} from 'react'
import axios from 'axios'

function SubNavBar() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/categories')
        .then(res => setCategories(res.data))
        .catch(err => console.log(err))
    }, [])

    return (
        <nav className="bg-gray-50 dark:bg-gray-700 absolute top-[65px] w-full">
            <div className="max-w-screen-xl px-4 py-3 mx-auto">
                <div className="flex items-center">
                    <ul className="flex flex-row font-medium mt-0 mr-6 space-x-8 text-sm">
                    {categories.map(cat => (
                        <li key={cat.id}>
                            <a href="#" className="text-gray-900 dark:text-white hover:underline" aria-current="page">{cat.nom}</a>
                        </li>
                    ))}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default SubNavBar