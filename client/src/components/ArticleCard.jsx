import React from 'react';
import { Link } from 'react-router-dom';

const ArticleCard = (props) => {

    return (
        <div className="bg-white rounded shadow">
            <img
                src={props.image}
                alt={props.titre}
                className="h-48 w-full object-cover object-center rounded-t"
            />
            <div className="p-6">
                <div className='min-h-[100px] max-h-[100px]'>
                    <h3 className="text-xl font-bold mb-2">{props.titre}</h3>
                </div>
                <p className="text-gray-600">{props.contenu.slice(0, 60)}...</p>
                <div className="flex items-center mt-4">
                    <p className="text-sm text-gray-500">{props.createdAt.slice(0, 10)}</p>
                    {/* <span className="mx-2 text-gray-300">|</span> */}
                    {/* <p className="text-sm text-gray-500">{author}</p> */}
                </div>
                <Link
                    to={`/articles/${props.id}`}
                    className="mt-4 inline-block px-4 py-2 bg-[#ebcdcf] text-white rounded hover:bg-[#f9c4c8]"
                >
                    Read More
                </Link>
            </div>
        </div>
    );
};

export default ArticleCard;
