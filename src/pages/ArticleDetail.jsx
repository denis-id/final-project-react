import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import author from "../assets/Author/author.jpeg";
import { ArrowLeft, Calendar, Clock, Share2, Facebook, Twitter } from "lucide-react";
import { fadeInLeft, fadeInRight, staggerContainer } from "../utils/animations";
import { useLanguage } from "../context/LanguageContext";
import BackToTop from "../components/BackToTop";
import ChatWhatsApp from "../components/ChatWhatsApp";
import PropTypes from 'prop-types';

const RelatedArticleSkeleton = () => (
  <div className="animate-pulse space-y-4">
    <div className="flex gap-4">
      <div className="w-24 h-24 bg-gray-300 rounded-lg"></div>
      <div className="flex-1">
        <div className="w-3/4 h-4 bg-gray-300 rounded mb-2"></div>
        <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
      </div>
    </div>
    <div className="w-full h-4 bg-gray-300 rounded mb-4"></div>
  </div>
);


const SkeletonLoader = () => (
  <div className="animate-pulse">
    <div className="w-full h-[400px] bg-gray-300 rounded-xl mb-8"></div>
    <div className="flex items-center gap-6 mb-6">
      <div className="w-24 h-4 bg-gray-300 rounded"></div>
      <div className="w-16 h-4 bg-gray-300 rounded"></div>
    </div>
    <div className="w-3/4 h-6 bg-gray-300 rounded mb-4"></div>
    <div className="w-full h-4 bg-gray-300 rounded mb-2"></div>
    <div className="w-full h-4 bg-gray-300 rounded mb-2"></div>
    <div className="w-5/6 h-4 bg-gray-300 rounded mb-2"></div>
  </div>
);

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const ArticleDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { translations, language } = useLanguage();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { articlesNotFound, backToArticles } = translations[language] || {};

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/articles/${slug}`);
        if (!response.ok) {
          throw new Error("Article not found");
        }
        const data = await response.json();
        setArticle(data);

        const relatedResponse = await fetch(`http://localhost:8000/api/articles/related/${data.id}`);
        const relatedData = await relatedResponse.json();
        setArticle((prevArticle) => ({
          ...prevArticle,
          relatedArticles: relatedData,
        }));
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    setTimeout(fetchArticle, 1500);
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 white-bg">
        <SkeletonLoader />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">
          {articlesNotFound || "Article not found"}
        </h2>
        <button 
          onClick={() => navigate("/articles")} 
          className="text-black hover:underline inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          {backToArticles || "Back to Articles"}
        </button>
      </div>
    );
  }

  const articleTranslation = translations[language]?.articles?.find((a) => a.slug === article.slug);

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 bg-white">
      <ChatWhatsApp />
      <BackToTop />
      <button 
        onClick={() => navigate("/articles")} 
        className="mb-8 text-black inline-flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        {backToArticles || "Back to Articles"}
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <MainContent article={article} articleTranslation={articleTranslation} />
        <Sidebar relatedArticles={article.relatedArticles || []} articleTranslation={articleTranslation} />
        <AuthorInfo />
      </div>
    </div>
  );
};

const MainContent = ({ article, articleTranslation }) => (
  <motion.div 
    variants={fadeInLeft} 
    initial={{ opacity: 0, x: -50 }}
    animate={{ opacity: 1, x: 0, transition: { duration: 0.6 } }}
    className="lg:col-span-2"
  >
    <motion.img 
      variants={fadeIn}
      src={article.image_url} 
      alt={article.title} 
      className="w-full h-[400px] object-cover rounded-xl mb-8" 
    />
    <div className="flex items-center gap-6 text-gray-600 mb-6">
    <DateInfo date={article.published_at} />
      <ReadTimeInfo readTime={article.read_time} />
    </div>
    <h1 className="text-4xl font-bold mb-6">{article.title}</h1>
    <div className="prose prose-lg max-w-none">
      <p className="text-gray-600 mb-6">{article.excerpt}</p>
      <p className="text-gray-600 mb-6">{article.content}</p>
    </div>
    <ShareSection articleTranslation={articleTranslation} />
  </motion.div>
);

MainContent.propTypes = {
  article: PropTypes.object.isRequired,
  articleTranslation: PropTypes.object,
};

const DateInfo = ({ date }) => (
  <div className="flex items-center gap-2">
    <Calendar className="w-4 h-4" />
    {new Date(date).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })}
  </div>
);


DateInfo.propTypes = {
  date: PropTypes.string.isRequired,
};

const ReadTimeInfo = ({ readTime }) => (
  <div className="flex items-center gap-2">
    <Clock className="w-4 h-4" />
    {readTime} min read
  </div>
);

ReadTimeInfo.propTypes = {
  readTime: PropTypes.number.isRequired,
};

const ShareSection = ({ articleTranslation }) => (
  <div className="border-t border-gray-200 mt-12 pt-8">
    <div className="flex items-center gap-4">
      <span className="font-semibold flex items-center gap-2">
        <Share2 className="w-5 h-5" />
        {articleTranslation?.shareArticles || "Share this article"}
      </span>
      <div className="flex gap-4">
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <Facebook className="w-5 h-5" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <Twitter className="w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
);

ShareSection.propTypes = {
  articleTranslation: PropTypes.object,
};

const Sidebar = ({ relatedArticles, translations, language }) => (
  <motion.div
    variants={fadeInRight}
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0, transition: { duration: 0.6 } }}
    className="lg:col-span-1"
  >
    <div className="sticky top-24 bg-white/30 backdrop-blur-sm shadow-xl rounded-lg p-4 drop-shadow-2xl">
        <h2 className="text-2xl font-bold mb-6 drop-shadow-xl"> 
          {translations?.[language]?.relatedsArticles || "𝐑𝐞𝐥𝐚𝐭𝐞𝐝 𝐀𝐫𝐭𝐢𝐜𝐥𝐞𝐬"}:
        </h2>
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="space-y-6"
      >
        {relatedArticles ? (
          relatedArticles.map((relatedArticle) => (
            <RelatedArticle key={relatedArticle.slug} relatedArticle={relatedArticle} />
          ))
        ) : (
          <RelatedArticleSkeleton />
        )}
      </motion.div>
    </div>
    <BackgroundImage />
  </motion.div>
);

Sidebar.propTypes = {
  relatedArticles: PropTypes.array,
};

const RelatedArticle = ({ relatedArticle }) => {
  const { translations, language } = useLanguage();
  const articleTranslation = translations[language]?.articles?.find((item) => item.slug === relatedArticle.slug);
  return (
    <motion.div variants={fadeIn} className="group">
      <Link to={`/articles/${relatedArticle.slug}`} className="flex gap-4">
        <div className="w-24 h-24 overflow-hidden rounded-lg">
          <img
            src={relatedArticle.image_url}
            alt={relatedArticle.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>
        <div className="flex-1">
          <h3 className="font-bold mb-2 group-hover:text-gray-600 transition-colors">
            {relatedArticle.title}
          </h3>
          <div className="flex items-center gap-4 text-sm text-gray-800">
          <div className="flex items-center gap-4 text-sm text-gray-800">
          <DateInfo date={relatedArticle.published_at} />
            <ReadTimeInfo readTime={relatedArticle.read_time} />
          </div>
        </div>
        </div>
      </Link>
    </motion.div>
  );
};

RelatedArticle.propTypes = {
  relatedArticle: PropTypes.object.isRequired,
};

const BackgroundImage = () => (
  <div className="mt-12 p-6 rounded-xl w-80" style={{ backgroundColor: 'white' }}>
    <div>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxQH8Hzyv8Lq0Wq3EgMP-UHuz_jKbbArerIQ&s" className="rounded-full object-cover" alt="" />
    </div>
  </div>
);

const AuthorInfo = () => {
  const { translations, language } = useLanguage();

  return (
    <div className="flex justify-end">
      <div className="mt-12 p-6 bg-gray-50 rounded-xl w-80">
        <div className="flex items-center gap-4 mb-4">
          <img
            src={author}
            alt="Author"
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold">Denis</h3>
            <p className="text-gray-600 text-sm">{translations[language]?.founderKohi || "Founder of Kohi"}</p>
          </div>
        </div>
        <p className="text-gray-600 text-sm">
          {translations[language]?.founderKohiDesc || "Description of the founder"}
        </p>
      </div>
    </div>
  );
};

export default ArticleDetail;