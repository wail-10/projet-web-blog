import React from 'react';
import axios from 'axios';
import ArticleCard from './ArticleCard';
import { useParams } from 'react-router-dom';

const CategorySection = () => {
    const { id } = useParams()
    const [categories, setCategories] = React.useState([]);

    React.useEffect(() => {
        axios.get(`http://localhost:3000/categories/${id}`)
        .then(res => setCategories(res.data))
        .catch(err => console.log(err.response.data))
    }, [])

    return (
        <section className="py-16 bg-gray-100">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-6">Categories</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories.map((category) => (
                        <ArticleCard 
                            key={category.id} 
                            image={category.image} 
                            titre={category.titre}
                            contenu={category.contenu}
                            createdAt={category.createdAt}
                            id={category.id}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategorySection;
