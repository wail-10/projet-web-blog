import React from 'react';
import axios from 'axios';
import ArticleCard from './ArticleCard';

const ArticleSection = () => {
    const [articles, setArticles] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(0);

    React.useEffect(() => {
        fetchArticles();
    }, [page]);

    const fetchArticles = () => {
        axios
        .get('http://localhost:3000/articles', {
            params: {
            page,
            },
        })
        .then((res) => {
            setArticles(res.data.articles);
            setTotalPages(Math.ceil(res.data.totalCount / 12)); // Assuming 12 articles per page
        })
        .catch((err) => console.log(err));
    };

    const handlePreviousPage = () => {
        if (page > 1) {
        setPage((prevPage) => prevPage - 1);
        }
    };

    const handleNextPage = () => {
        if (page < totalPages) {
        setPage((prevPage) => prevPage + 1);
        }
    };

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
                author={article.utilisateur.nom}
                />
            ))}
            </div>
            <div className="flex justify-center mt-6">
            <button
                className="bg-[#ebcdcf] hover:bg-[#f9c4c8] text-white font-bold py-2 px-4 mr-2"
                onClick={handlePreviousPage}
                disabled={page === 1}
            >
                Previous Page
            </button>
            <button
                className="bg-[#ebcdcf] hover:bg-[#f9c4c8] text-white font-bold py-2 px-4"
                onClick={handleNextPage}
                disabled={page === totalPages}
            >
                Next Page
            </button>
            </div>
        </div>
        </section>
    );
};

export default ArticleSection;
