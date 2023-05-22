import React, { useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

const BlogArticlePage = () => {
    const {currentUser} = useContext(AuthContext)
    const { id } = useParams()
    const [article, setArticle] = React.useState({});
    const [comments, setComments] = React.useState([]);
    const [commentContent, setCommentContent] = React.useState('');


    React.useEffect(() => {
        axios.get(`http://localhost:3000/articles/${id}`)
        .then(res => {
            setArticle(res.data)
            setComments(res.data.commentaires || [])
        })
        .catch(err => console.log(err.response.data))
    }, [id])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/comments', {
                email: currentUser.email,
                contenu: commentContent,
                articleId: parseInt(id),
            });
            const newComment = response.data;
            setComments([...comments, newComment]);
            setCommentContent('');
        } catch (error) {
            console.error(error.response.data);
        }
    };      
    
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
                    <div className="p-8">
                        <h2 className="text-2xl font-bold mb-4">Comments</h2>
                        {comments.length === 0 ? (
                        <p>No comments available</p>
                        ) : (
                        <ul className="space-y-4">
                            {comments.map(comment => (
                            <li key={comment.id} className="border border-gray-200 p-4 rounded-lg">
                                <div className="flex items-center mb-2">
                                <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center">
                                    <span className="text-white text-lg">{comment.email.charAt(0)}</span>
                                </div>
                                <p className="ml-2 font-semibold">{comment.email}</p>
                                </div>
                                <p>{comment.contenu}</p>
                            </li>
                            ))}
                        </ul>
                        )}
                        {currentUser && 
                            <form onSubmit={handleSubmit} className="mt-4">
                                <div className="mb-4">
                                    <label htmlFor="commentContent" className="block mb-2 text-gray-800">Add a comment:</label>
                                    <textarea
                                        id="commentContent"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#f9c4c8]"
                                        value={commentContent}
                                        onChange={(e) => setCommentContent(e.target.value)}
                                        required
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-white bg-[#f9c4c8] rounded-md hover:bg-[#ebcdcf] focus:outline-none"
                                >
                                Submit Comment
                                </button>
                            </form>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogArticlePage;
