import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
} from "lucide-react";
import { articles } from "../data/products";
import {
  fadeIn,
  fadeInLeft,
  fadeInRight,
  staggerContainer,
} from "../utils/animations";

export default function ArticleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const article = articles.find((a) => a.id === parseInt(id));
  const relatedArticles = articles
    .filter((a) => a.id !== parseInt(id))
    .slice(0, 3);

  if (!article) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Article not found</h2>
        <button
          onClick={() => navigate("/articles")}
          className="text-black hover:underline inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Articles
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <button
        variants={fadeIn}
        initial="initial"
        animate="animate"
        onClick={() => navigate("/articles")}
        className="mb-8 text-gray-600 hover:text-black inline-flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Articles
      </button>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div
          variants={fadeInLeft}
          initial="initial"
          animate="animate"
          className="lg:col-span-2"
        >
          <img
            variants={fadeIn}
            src={article.image}
            alt={article.title}
            className="w-full h-[400px] object-cover rounded-xl mb-8"
          />

          <div className="flex items-center gap-6 text-gray-600 mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {new Date(article.date).toLocaleDateString()}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {article.readTime}
            </div>
          </div>

          <h1 className="text-4xl font-bold mb-6">{article.title}</h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <h2 className="text-2xl font-bold mt-8 mb-4">
              The Evolution of Fashion
            </h2>
            <p className="text-gray-600 mb-6">
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit
              anim id est laborum.
            </p>
            <blockquote className="border-l-4 border-black pl-4 italic my-8">
              "Fashion is not something that exists in dresses only. Fashion is
              in the sky, in the street, fashion has to do with ideas, the way
              we live, what is happening."
            </blockquote>
            <p className="text-gray-600 mb-6">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo.
            </p>
          </div>

          {/* Share Section */}
          <div className="border-t border-gray-200 mt-12 pt-8">
            <div className="flex items-center gap-4">
              <span className="font-semibold flex items-center gap-2">
                <Share2 className="w-5 h-5" />
                Share this article
              </span>
              <div className="flex gap-4">
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <Facebook className="w-5 h-5" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <Twitter className="w-5 h-5" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <Linkedin className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div
          variants={fadeInRight}
          initial="initial"
          animate="animate"
          className="lg:col-span-1"
        >
          <div className="sticky top-24">
            <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
            <div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="space-y-6"
            >
              {relatedArticles.map((relatedArticle) => (
                <div
                  key={relatedArticle.id}
                  variants={fadeIn}
                  className="group"
                >
                  <Link
                    to={`/articles/${relatedArticle.id}`}
                    className="flex gap-4"
                  >
                    <div className="w-24 h-24 overflow-hidden rounded-lg">
                      <img
                        src={relatedArticle.image}
                        alt={relatedArticle.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2 group-hover:text-gray-600 transition-colors">
                        {relatedArticle.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(relatedArticle.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {relatedArticle.readTime}
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            {/* Author Info */}
            <div className="mt-12 p-6 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100"
                  alt={article.author}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold">{article.author}</h3>
                  <p className="text-gray-600 text-sm">Fashion Writer</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                A passionate fashion writer with over 10 years of experience in
                the industry. Specializes in sustainable fashion and emerging
                trends.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
