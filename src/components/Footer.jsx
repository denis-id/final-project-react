import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function Footer() {
  const { language, translations } = useLanguage();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString("id-ID", { timeZone: "Asia/Makassar" });

  const {
    footerTitle,
    footerDesc,
    footerShop,
    footerContact,
    quickLinks,
    customerService,
    footerShippingInfo,
    footerReturns,
    footerGuide,
    contactUs,
    copyright,
    privacyPolicy,
    termsService,
    cookiePolicy,
  } = translations[language] || {};

  const links = useMemo(
    () => [
      { to: "/menu", text: footerShop },
      { to: "/contact", text: footerContact },
      { to: "/articles", text: "Blog" },
    ],
    [footerShop, footerContact]
  );

  const serviceLinks = useMemo(
    () => [footerShippingInfo, footerReturns, footerGuide],
    [footerShippingInfo, footerReturns, footerGuide]
  );

  const contactInfo = [
    { Icon: MapPin, text: "Jl.Padang Galak, Sanur, Denpasar Bali" },
    { Icon: Phone, text: "+62 (823) 409-7518" },
    { Icon: Mail, text: "denisryana2012@gmail.com" },
  ];

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
          {/* About Section */}
          <div>
            <h3 className="text-2xl font-bold mb-4">{footerTitle}</h3>
            <p className="text-gray-400 mb-4">{footerDesc}</p>
            <div className="flex space-x-4 mt-4">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, id) => (
                <a key={id} href="#" className="hover:text-gray-300 transition" aria-label="Social Link">
                  <Icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">{quickLinks}</h3>
            <ul className="space-y-3 text-gray-400">
              {links.map(({ to, text }, id) => (
                <li key={id}>
                  <Link to={to} className="hover:text-white transition">
                    {text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-xl font-semibold mb-4">{customerService}</h3>
            <ul className="space-y-3 text-gray-400">
              {serviceLinks.map((text, id) => (
                <li key={id}>
                  <a href="#" className="hover:text-white transition">
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">{contactUs}</h3>
            <ul className="space-y-4 text-gray-400">
              {contactInfo.map(({ Icon, text }, id) => (
                <li key={id} className="flex items-center space-x-3">
                  <Icon className="w-5 h-5" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
            {/* Live Clock for Denpasar, Bali */}
            <div className="mt-6 text-yellow-400 font-semibold text-lg">
              {translations[language]?.currentTime} Denpasar, Bali: {formattedTime}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-700 mt-12 pt-6 text-gray-400 text-sm flex flex-col sm:flex-row justify-between items-center">
          <p>© 2024 𝗞𝗼𝗵𝗶 𝗖𝗮𝗳é𝘀. {copyright}</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            {[privacyPolicy, termsService, cookiePolicy].map((text, id) => (
              <a key={id} href="#" className="hover:text-white transition">
                {text}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
