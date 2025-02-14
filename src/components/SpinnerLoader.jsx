import React, { useEffect, useState } from 'react';
import loader from '../assets/images/loader.gif';

export default function SPLoader() {
  const [showImg, setShowImg] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowImg(false); // Hide the image after 5 seconds
    }, 5000);

    // clear timeout to avoid memory leaks
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex justify-center items-center w-screen h-screen overflow-hidden bg-[#F9F1C9]">
      {showImg && (
        <img
          src={loader}
          alt="Loading..."
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
}
