import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const ArticleForm = () => {
    const navigate = useNavigate()
    const {currentUser} = useContext(AuthContext)
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [published, setPublished] = useState(true);
    const [categories, setCategories] = useState([]);
    const [cat, setCat] = useState([]);
    
    React.useEffect(() => {
        axios.get('http://localhost:3000/categories')
        .then(res => setCat(res.data))
        .catch(err => console.log(err))
    }, [])
    
    
    if (!currentUser) {
        return navigate("/login");
    }
    var utilisateurId = currentUser.id;

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleImageUrlChange = (e) => {
        setImageUrl(e.target.value);
    };

    const handlePublishedChange = (e) => {
        setPublished(e.target.checked);
    };

    const handleCategoryChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setCategories((prevCategories) => [...prevCategories, parseInt(value)]);
        } else {
            setCategories((prevCategories) =>
                prevCategories.filter((category) => category !== parseInt(value))
            );
        }
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform submission logic here
    try {
        const response = await axios.post('http://localhost:3000/articles', {
            titre: title,
            contenu: content,
            image: imageUrl,
            published: published,
            utilisateurId: utilisateurId,
            categorieIds: categories
        });
        // Reset form fields
        setTitle("");
        setContent("");
        setImageUrl("");
        setPublished(false);
        setCategories([]);
    } catch (error) {
        console.error(error.response.data);
    }
    };
    
    return (
        <div className="flex justify-center items-center min-h-screen my-8">
            <div className="w-4/5 bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Add Article</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="title" className="block font-semibold mb-2">
                        Title
                        </label>
                        <input
                        type="text"
                        id="title"
                        className="w-full border border-gray-300 rounded-lg p-2"
                        value={title}
                        onChange={handleTitleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="content" className="block font-semibold mb-2">
                        Content
                        </label>
                        <textarea
                        id="content"
                        className="w-full border border-gray-300 rounded-lg p-2"
                        rows={4}
                        value={content}
                        onChange={handleContentChange}
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="imageUrl" className="block font-semibold mb-2">
                        Image URL
                        </label>
                        <input
                        type="text"
                        id="imageUrl"
                        className="w-full border border-gray-300 rounded-lg p-2"
                        value={imageUrl}
                        onChange={handleImageUrlChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="published" className="block font-semibold mb-2">
                        Published
                        </label>
                        <input
                        type="checkbox"
                        id="published"
                        className="mr-2"
                        checked={published}
                        onChange={handlePublishedChange}
                        />
                        <span>Yes</span>
                    </div>
                    {/* <div className="mb-4">
                        <label htmlFor="categories" className="block font-semibold mb-2">
                        Categories
                        </label>
                        {cat.map(c => (
                            <div key={c.id}>
                                <label>
                                    <input
                                    type="checkbox"
                                    name="category"
                                    value={c.id}
                                    onChange={handleCategoryChange}
                                    />
                                    {c.nom}
                                </label>
                            </div>
                        ))}
                    </div> */}
                    <div className="mb-4">
    <label htmlFor="categories" className="block font-semibold mb-2">
        Categories
    </label>
    <div className="flex flex-wrap">
        {cat.map((c) => (
            <div key={c.id} className="flex items-center mr-4 mb-2">
                <input
                    type="checkbox"
                    id={`category-${c.id}`}
                    name="category"
                    value={c.id}
                    onChange={handleCategoryChange}
                    className="mr-2"
                />
                <label
                    htmlFor={`category-${c.id}`}
                    className="text-gray-700 cursor-pointer select-none"
                >
                    {c.nom}
                </label>
            </div>
        ))}
    </div>
</div>
                    <button type="submit" className="bg-[#f9c4c8] text-white px-4 py-2 rounded-lg">
                        Add Article
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ArticleForm;
