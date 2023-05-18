import React from 'react';
import axios from 'axios';

const SubNavbar = () => {
  const [categories, setCategories] = React.useState([]);

  React.useEffect(() => {
      axios.get('http://localhost:3000/categories')
      .then(res => setCategories(res.data))
      .catch(err => console.log(err))
  }, [])

  return (
    <nav className="bg-gray-800 mt-14">
      <div className="container mx-auto px-4 py-2 flex flex-wrap items-center justify-center">
        {categories.map((cat) => (
          <a
            href="#"
            className="text-white text-sm font-medium mx-2 my-1"
            key={cat.id}
          >
            {cat.nom} ({cat.articleCount})
          </a>
        ))}
      </div>
    </nav>
  );
};

export default SubNavbar;

