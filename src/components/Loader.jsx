import { useState, useEffect } from 'react';

const Loader = ({ imageUrl, altText }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;

    // When the image is loaded, set loading to false
    img.onload = () => setLoading(false);

    // You can add an error handler in case the image fails to load
    img.onerror = () => setLoading(false);  // Set loading to false if image fails to load

  }, [imageUrl]);  // Re-run this effect when imageUrl changes

  return (
    <div className="relative w-full h-full">
      {loading && (
        <div className="absolute inset-0 flex justify-center items-center bg-gray-50 bg-opacity-75">
          {/* Spinner */}
          <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        </div>
      )}

      {!loading && (
        <img
          src={imageUrl}
          alt={altText}
          className="w-full h-auto"
        />
      )}
    </div>
  );
};

export default Loader;
