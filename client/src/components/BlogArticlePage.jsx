import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const BlogArticlePage = () => {
    const { id } = useParams()
    const [article, setArticle] = React.useState({});

    React.useEffect(() => {
        axios.get(`http://localhost:3000/articles/${id}`)
        .then(res => setArticle(res.data))
        .catch(err => console.log(err.response.data))
    }, [id])
    
    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-3xl mx-auto bg-white rounded-lg shadow">
                    <div className="relative">
                        <img
                            className="w-full h-auto rounded-t-lg"
                            src={article.image}
                            alt={article.titre}
                        />
                        <div className="absolute bottom-0 left-0 p-4 bg-gray-900 text-white">
                            <h1 className="text-3xl font-bold">{article.titre}</h1>
                        </div>
                    </div>
                    <div className="p-8">
                        <p className="text-gray-500 mb-4">Published on {article.createdAt && article.createdAt.slice(0, 10)}</p>
                        <blockquote className="border-l-4 border-[#f9c4c8] pl-4 mt-4">
                            <p> {article.contenu} </p>
                        </blockquote>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogArticlePage;
