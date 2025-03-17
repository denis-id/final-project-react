import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Calendar, Clock, ChevronRight } from "lucide-react";
import Hero from "../components/Hero";
import BackToTop from "../components/BackToTop";
import ChatWhatsApp from "../components/ChatWhatsApp";
import { useLanguage } from "../context/LanguageContext";
import { useArticleContext } from "../context/ArticleContext"; 

export default function Articles() {
  const navigate = useNavigate();
  const { articles, loading, error, getArticle } = useArticleContext(); 
  const { translations, language } = useLanguage();
  const featuredArticle = articles.find((article) => article.is_featured === true);
  const regularArticles = articles.filter((article) => !article.featured);

  // get articles if they haven't been loaded yet
  useEffect(() => {
    if (articles.length === 0) {
      getArticle();
    }
  }, [getArticle]);

  const SkeletonArticle = () => (
    <div className="animate-pulse bg-gray-200 h-48 w-full rounded-md" />
  );
  
  const SkeletonText = ({ width }) => (
    <div className={`animate-pulse bg-gray-300 h-4 ${width} rounded-md my-2`} />
  );

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-semibold mb-6">Loading...</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <SkeletonArticle />
              <SkeletonText width="w-3/4" />
              <SkeletonText width="w-1/2" />
              <SkeletonText width="w-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {/* Back to WhatsApp */}
      <ChatWhatsApp />
      {/* Back to Top Button */}
      <BackToTop />
      <Hero
        title={translations[language].articHero}
        description={translations[language].articHeroDesc}
      />
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Featured Article */}
        {featuredArticle && (
          <div className="mb-16">
            <h2 className="text-2xl font-semibold mb-6">
              {translations[language]?.ArticleTitle}
            </h2>
            <div className="grid md:grid-cols-2 gap-8 bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative h-[400px] md:h-auto">
                <img
                  src={featuredArticle.image_url} // Use image_url from API
                  alt={featuredArticle.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 text-gray-500 text-sm mb-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(featuredArticle.published_at).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      {featuredArticle.read_time} {translations[language]?.minRead} {/* Assuming you get read_time in minutes */}
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold mb-4">{featuredArticle.title}</h3>
                  <p className="text-gray-600 mb-4">{featuredArticle.excerpt}</p>
                  <p className="text-gray-500">{translations[language]?.writerArticle}: {featuredArticle.author}</p>
                </div>
                <Link
                  to={`/articleDetail/${featuredArticle.slug}`}
                  className="inline-flex items-center text-black font-semibold hover:underline mt-6"
                >
                  {translations[language]?.readArticle}
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Regular Articles Grid */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">
            {translations[language]?.latestArticle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {regularArticles.slice(0, 6).map((articles) => (
              <div
                key={articles.id}
                className="bg-white rounded-lg shadow-md overflow-hidden group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={articles.image_url} // Use image_url from API
                    alt={articles.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-gray-500 text-sm mb-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(articles.published_at).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      {articles.read_time} {translations[language]?.minRead} {/* Assuming you get read_time in minutes */}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-gray-600 transition-colors">
                    {articles.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{articles.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm">{translations[language]?.writerArticle}: {articles.author}</span>
                    <button
                      onClick={() => navigate(`/articleDetail/${articles.slug}`)}
                      className="text-black font-semibold hover:underline inline-flex items-center"
                    >
                      {translations[language]?.readMoreArticle}
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
