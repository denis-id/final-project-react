import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import author from "../assets/Author/author.jpeg";
import { ArrowLeft, Calendar, Clock, Share2, Facebook, Twitter } from "lucide-react";
import { fadeInLeft, fadeInRight, staggerContainer } from "../utils/animations";
import { useLanguage } from "../context/LanguageContext";
import BackToTop from "../components/BackToTop";
import ChatWhatsApp from "../components/ChatWhatsApp";

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
  console.log("Slug:", slug);
  const navigate = useNavigate();
  const { translations, language } = useLanguage();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { articlesNotFound, backToArticles } = translations[language] || {};

  const [ relatedArticles, setRelatedArticles ] = useState(null);

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

  useEffect(() => {
    setTimeout(() => {
      fetch(`http://localhost:8000/api/articles/${slug}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Article not found");
          }
          return response.json();
        })
        .then((data) => {
          setArticle(data);
        fetch(`http://localhost:8000/api/articles/related/${data.id}`)
        .then((response) => response.json())
        .then((relatedData) => {
          setArticle((prevArticle) => ({
            ...prevArticle,
            relatedArticles: relatedData,
          }));
        });
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }, 1500);
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <ChatWhatsApp />
        <BackToTop />
        <SkeletonLoader />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <ChatWhatsApp />
        <BackToTop />
        <h2 className="text-2xl font-bold mb-4">
          {translations[language]?.articlesNotFound || "Article not found"}
        </h2>
        <button 
          onClick={() => navigate("/articles")} 
          className="text-black hover:underline inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          {translations[language]?.backToArticles || "Back to Articles"}
        </button>
      </div>
    );
  }

  const articleTranslation = translations[language]?.articles?.find((a) => a.slug === article.slug);

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <ChatWhatsApp />
      <BackToTop />
      <button 
        onClick={() => navigate("/articles")} 
        className="mb-8 text-black inline-flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        {translations[language]?.backToArticles || "Back to Articles"}
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
      <DateInfo date={article.date} />
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

const DateInfo = ({ date }) => (
  <div className="flex items-center gap-2">
    <Calendar className="w-4 h-4" />
    {new Date(date).toLocaleDateString()}
  </div>
);

const ReadTimeInfo = ({ readTime }) => (
  <div className="flex items-center gap-2">
    <Clock className="w-4 h-4" />
    {readTime} min read
  </div>
);

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

  const Sidebar = ({ relatedArticles }) => (
    <motion.div
      variants={fadeInRight}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0, transition: { duration: 0.6 } }}
      className="lg:col-span-1"
      relatedsArticles
      >
      <div className="sticky top-24">
        <h2 className="text-2xl font-bold mb-6">
          Related Articles:
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
          <h3 className="font-semibold mb-2 group-hover:text-gray-600 transition-colors">
            {relatedArticle.title || relatedArticle.title}
          </h3>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <DateInfo date={relatedArticle.date} />
            <ReadTimeInfo readTime={relatedArticle.readTime || relatedArticle.read_time} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const BackgroundImage = () => (
  <div className="mt-12 p-6 rounded-xl w-80" style={{ backgroundColor: '#EFE8D9' }}>
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