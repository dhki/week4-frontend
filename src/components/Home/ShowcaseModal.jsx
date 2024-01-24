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

    const { _id, title, likes, comments, title_image, owner, savedBy, createdAt } = data;

    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
                <button onClick={onClose} className="absolute top-4 right-4 text-white text-lg cursor-pointer">Close</button>
                <div className="bg-white w-7/10 h-7/10 overflow-auto flex rounded-2xl">
                    {/* <div className="w-2/3 flex justify-center items-center"> */}
                    <div className="flex justify-center items-center">
                        {/* <img
                        src={image}
                        alt="Showcase"
                        draggable="false"
                        loading="lazy"
                        style={{ width: '1200px', height: '800px', objectFit: 'cover' }}
                    /> */}
                        <ShowcaseThreeItem _id={_id} imageUrl={title_image} position={0} />
                    </div>
                    {/* <div className="w-1/3 p-4">
                    <h2 className="text-xl font-bold">{owner.username}</h2>
                    <p>{title}</p>
                </div> */}

                </div>
            </div>
        </>
    );
};

export default ShowcaseModal;
