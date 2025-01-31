import { Link } from "react-router-dom";
import { Calendar, Clock, ChevronRight } from "lucide-react";
import { articles } from "../data/products";
import Hero from "../components/Hero";

export default function Articles() {
  const featuredArticle = articles.find((article) => article.featured);
  const regularArticles = articles.filter((article) => !article.featured);

  return (
    <div>
      <Hero
        title={"Fashion Articles"}
        description={"Read our latest fashion articles"}
        image={
          "https://img.freepik.com/premium-vector/businessman-reading-daily-news-articles-tablet-screen-online-newspaper-press-mass-media-concept-desk-top-angle-view-horizontal_48369-29756.jpg?w=1800"
        }
      />
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Featured Article */}
        {featuredArticle && (
          <div className="mb-16">
            <h2 className="text-2xl font-semibold mb-6">Featured Article</h2>
            <div className="grid md:grid-cols-2 gap-8 bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative h-[400px] md:h-auto">
                <img
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 text-gray-500 text-sm mb-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(featuredArticle.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      {featuredArticle.readTime}
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold mb-4">
                    {featuredArticle.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {featuredArticle.excerpt}
                  </p>
                  <p className="text-gray-500">By {featuredArticle.author}</p>
                </div>
                <Link
                  to={`/articles/${featuredArticle.id}`}
                  className="inline-flex items-center text-black font-semibold hover:underline mt-6"
                >
                  Read Article
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Regular Articles Grid */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Latest Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {regularArticles.slice(0, 6).map((article) => (
              <div
                key={article.id}
                className="bg-white rounded-lg shadow-md overflow-hidden group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-gray-500 text-sm mb-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(article.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      {article.readTime}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-gray-600 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {article.excerpt}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm">
                      By {article.author}
                    </span>
                    <Link
                      to={`/articles/${article.id}`}
                      className="text-black font-semibold hover:underline inline-flex items-center"
                    >
                      Read More
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
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
