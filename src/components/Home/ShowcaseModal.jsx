import React, { useEffect } from 'react';
import "./HomeComponents.css";
import ShowcaseThreeItem from '../ShowcaseThree/ShowcaseThreeItem';

const ShowcaseModal = ({ isOpen, onClose, data }) => {
    const handleEscKeyPress = (e) => {
        if (e.key === 'Escape') {
            onClose();
        }
    };
    useEffect(() => {
        document.addEventListener('keydown', handleEscKeyPress);
        return () => {
            document.removeEventListener('keydown', handleEscKeyPress);
        };
    }, []);

    if (!isOpen || !data) return null;

    const { _id, caption, likes, comments, image, postedBy, savedBy, createdAt } = data;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
            <button onClick={onClose} className="absolute top-4 right-4 text-white text-2xl cursor-pointer">X</button>
            <div className="bg-white w-7/10 h-7/10 overflow-auto flex">
                <div className="w-2/3 flex justify-center items-center">
                    {/* <img
                        src={image}
                        alt="Showcase"
                        draggable="false"
                        loading="lazy"
                        style={{ width: '1200px', height: '800px', objectFit: 'cover' }}
                    /> */}
                    <ShowcaseThreeItem _id={_id} image={image} />
                </div>
                <div className="w-1/3 p-4">
                    <h2 className="text-xl font-bold">{postedBy.username}</h2>
                    <p>{caption}</p>
                    {/* Additional content like comments */}
                </div>
            </div>
        </div>
    );
};

export default ShowcaseModal;
