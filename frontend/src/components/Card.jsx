import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ title, description, image }) => {
    return (
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-xs flex flex-col items-center text-center transition-transform duration-300 hover:scale-105">

        {/* Image within Card Component */}
        <img src={image} alt={title} className="w-full h-48 object-cover rounded-lg mb-2" />

        {/* Text within the Card Component */}
        <div className="w-full">
            <div className="flex-grow flex flex-col justify-between">
                <h3 className="text-lg font-semibold mt-4 break-words">{title}</h3>
                <p className="text-gray-600 mt-2 break-words text-sm leading-normal">
                {description}
                </p>
            </div>
        </div>
      </div>
    );
  };

  Card.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  };
  
export default Card;