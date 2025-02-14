import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import author from "../assets/Author/author.jpeg";
import { ArrowLeft, Calendar, Clock, Share2, Facebook, Twitter, Linkedin } from "lucide-react";
import { articles } from "../data/menu";
import { fadeInLeft, fadeInRight, staggerContainer } from "../utils/animations";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function ArticleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const article = articles.find((a) => a.id === parseInt(id));
  const relatedArticles = articles.filter((a) => a.id !== parseInt(id)).slice(0, 3);

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
    {/* back to articles button */}
      <button
        onClick={() => navigate("/articles")}
        className="mb-8 text-gray-600 hover: underline text-black inline-flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Articles
      </button>     
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
      {/* main content */}
        <motion.div
          variants={fadeInLeft}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0, transition: { duration: 0.6 } }}
          className="lg:col-span-2"
        >
          <motion.img
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
            <p className="text-gray-600 mb-6">{article.excerpt}</p>
            <p className="text-gray-600 mb-6">{article.content}</p>
          </div>

          {/* share section */}
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
        </motion.div>

        {/* sidebar */}
        <motion.div
          variants={fadeInRight}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0, transition: { duration: 0.6 } }}
          className="lg:col-span-1"
        >
          <div className="sticky top-24">
            <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="space-y-6"
            >
              {relatedArticles.map((relatedArticle) => (
                <motion.div key={relatedArticle.id} variants={fadeIn} className="group">
                  <Link to={`/articles/${relatedArticle.id}`} className="flex gap-4">
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
                </motion.div>
              ))}
            </motion.div>
          </div>
            {/* background */}
            <div className="mt-12 p-6rounded-xl w-80" style={{backgroundColor:'#EFE8D9'}}>          
            <div>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxQH8Hzyv8Lq0Wq3EgMP-UHuz_jKbbArerIQ&s" className="rounded-full object-cover" alt="" />          
            </div>
            </div>      
        </motion.div>
                {/* author info */}
                <div className="flex justify-end">
          <div className="mt-12 p-6 bg-gray-50 rounded-xl w-80">
            <div className="flex items-center gap-4 mb-4">
              <img
              src={author}
              alt={article.author}
              className="w-16 h-16 rounded-full object-cover"
              />
            <div>
              <h3 className="font-semibold">Denis</h3>
              <p className="text-gray-600 text-sm">Founder Kohi Coffeè</p>
            </div>
            </div>
            <p className="text-gray-600 text-sm">
             I'm a Founder of Kohi Coffeè with concept of Japan, a Web Developer and a Digital Marketing for over 5 years in industry.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
