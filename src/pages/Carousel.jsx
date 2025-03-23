import { useState, useEffect } from "react";
import "../styles/Carousel.css"; 
import { useCart } from "react-use-cart";

const slides = [
  {
    id: 1,
    title: "Red Velvet Chocolate, a new product",
    price: "Rp 22500",
    description:
      "Red velvet Chocolate has a unique flavor profile that's often described as a combination of red velvet, chocolate, and a subtle tanginess....",
    image: "https://images.tokopedia.net/img/cache/500-square/VqbcmM/2021/12/29/26fb71c7-6ffd-4b5b-9aba-2e60c964f3f2.png",
    bgColor: "#9c4d2f",
  },
  {
    id: 2,
    title: "Espresso Coffee, a new product",
    price: "Rp 22000",
    description:
      "Espresso is a concentrated coffee drink made by forcing hot water through finely ground coffee beans at high pressure,served in small cups...",
    image: "https://asset.kompas.com/crops/_SfcFYf71wzjEp-eNLHB_subNpI=/0x0:1000x667/750x500/data/photo/2020/10/05/5f7a1e1a209d9.jpg",
    bgColor: "#f5bfaf",
  },
  {
    id: 3,
    title: "Caramel Honey Latte, a new product",
    price: "Rp 23500",
    description:
      "Caramel honey latte is a coffee drink made with espresso, steamed milk, and a honey-caramel sauce....",
    image: "https://www.nespresso.com/shared_res/mos/free_html/au/b2b/recipes/images/caramel-honey-latte-coffee-recipe-menu.jpg",
    bgColor: "#dedfe1",
  },
];

export default function Carousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const autoPlay = setInterval(nextSlide, 5000);
    return () => clearInterval(autoPlay);
  }, [activeIndex]);

  return (
    <div className="carousel relative w-full h-screen overflow-hidden">
      <div className="list h-full relative">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`item absolute w-full h-full transition-all duration-500 ${
              index === activeIndex
                ? "active z-10"
                : index === (activeIndex - 1 + slides.length) % slides.length
                ? "other_1 z-5"
                : "other_2 z-0"
            }`}
          >
            <div className="main-content grid" style={{ backgroundColor: slide.bgColor }}>
              <div className="content p-20">
                <h2 className="text-5xl font-bold">{slide.title}</h2>
                <p className="price text-3xl mt-3">{slide.price}</p>
                <p className="description mt-5">{slide.description}</p>
              </div>
            </div>
            <figure className="image absolute right-0 bottom-0 flex flex-col items-center">
              <img src={slide.image} alt={slide.title} className="w-3/4 drop-shadow-xl" />
              <figcaption className="text-xl font-bold text-right w-3/4">
                {slide.title}
              </figcaption>
            </figure>
          </div>
        ))}
      </div>
      <div className="arrows absolute bottom-5 right-10 flex gap-3">
        <button className="border p-2" onClick={prevSlide}>
          &#60;
        </button>
        <button className="border p-2" onClick={nextSlide}>
          &#62;
        </button>
      </div>
    </div>
  );
}