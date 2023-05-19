import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ArticleCard from './ArticleCard';

const CategorySection = () => {
    const { id } = useParams()
    const [category, setCategory] = React.useState([]);

    React.useEffect(() => {
        axios.get(`http://localhost:3000/categories/${id}`)
        .then(res => setCategory(res.data))
        .catch(err => console.log(err.response.data))
    }, [])

    return (
        <section className="py-16 bg-gray-100">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-6">Category name : {category.nom}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {category.articles.map((article) => (
                        <ArticleCard 
                            key={article.id} 
                            image={article.image} 
                            titre={article.titre}
                            contenu={article.contenu}
                            createdAt={article.createdAt}
                            id={article.id}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategorySection;
