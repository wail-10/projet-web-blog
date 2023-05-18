import React from 'react';
import axios from 'axios';
import ArticleCard from './ArticleCard';

const ArticleSection = () => {
    const [articles, setArticles] = React.useState([])

    React.useEffect(() => {
        axios.get('http://localhost:3000/articles')
        .then(res => setArticles(res.data))
        .catch(err => console.log(err))
    }, [])

    return (
        <section className="py-16 bg-gray-100">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-6">Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {articles.map((article) => (
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

export default ArticleSection;
