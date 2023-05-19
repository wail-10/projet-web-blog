import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SubNavbar = () => {
  const [categories, setCategories] = React.useState([]);
  const [cat, setCat] = React.useState();

  React.useEffect(() => {
      axios.get('http://localhost:3000/categories')
      .then(res => setCategories(res.data))
      .catch(err => console.log(err))
  }, [])

  function changeCat(id) {
    cat = id;
  }

  return (
    <nav className="bg-gray-800 mt-14">
      <div className="container mx-auto px-4 py-2 flex flex-wrap items-center justify-center">
        {categories.map((cat) => (
          <Link to={`categories/${cat.id}`} onClick={() => changeCat(cat.id)} key={cat.id} className="text-white text-sm font-medium mx-2 my-1">{cat.nom} ({cat.articleCount})</Link>
        ))}
      </div>
    </nav>
  );
};

export default SubNavbar;

