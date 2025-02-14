import { useState } from "react";

const DistrictDropdown = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (district) => {
    setOpenDropdown(openDropdown === district ? null : district);
  };

  return (
    <div className="max-w-4xl mx-auto p-6" style={{backgroundColor:'#EFE8D9'}}>
      <h2 className="text-3xl font-bold">OUR DISTRICT</h2>
      <p className="mt-4">
        EJJI COFFEE CORNER adalah pelopor kedai kopi dengan konsep Japanese Style di Surabaya...
      </p>
      
      <img 
        src="/path-to-your-image.jpg" 
        alt="EJJI Coffee Corner" 
        className="w-full h-auto mt-4 rounded-md shadow-lg"
      />

      <div className="mt-6 space-y-2">
        {['Surabaya', 'Bali', 'Temanggung'].map((district, index) => (
          <div key={index} className="border rounded-md">
            <button
              className="w-full p-3 text-left flex justify-between items-center bg-white"
              onClick={() => toggleDropdown(district)}
            >
              {district}
              <span>{openDropdown === district ? '−' : '+'}</span>
            </button>
            {openDropdown === district && (
              <div className="p-4 bg-gray-50">
                {district === 'Temanggung' && (
                  <div>
                    <span className="text-lg font-bold">District 22 - TEMANGGUNG</span>
                    <p>Jalan Brigjend Katamso 30, Temanggung, Jawa Tengah</p>
                    <a href="#" className="text-blue-600">Lihat lokasi</a>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DistrictDropdown;
