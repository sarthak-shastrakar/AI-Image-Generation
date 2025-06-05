import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useState, useEffect, useRef } from "react";
import {
  Play,
  Download,
  ExternalLink,
  Sparkles,
  Zap,
  ImageIcon,
  Palette,
  Star,
  Users,
  Clock,
  ArrowRight,
  ChevronDown,
  Wand2,
  Layers,
  Maximize,
  Heart,
  Share2,
  Eye,
  Menu,
  X,
  Pause,
} from "lucide-react";
import Button from "@mui/material/Button";
import "./Mainpage.css";

export default function AIImageGeneratorLanding() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedImage, setSelectedImage] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);

  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleVideoPlay = () => {
    setShowVideoModal(true);
    setIsVideoPlaying(true);
  };

  const handleVideoClose = () => {
    setShowVideoModal(false);
    setIsVideoPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const toggleVideoPlayback = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  const cardVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.05,
      y: -10,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const features = [
    {
      icon: <Wand2 className="w-8 h-8" />,
      title: "Magic AI Generation",
      description:
        "Transform your wildest ideas into stunning visuals with our advanced AI models",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Speed",
      description:
        "Generate high-quality images in under 3 seconds with our optimized infrastructure",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Layers className="w-8 h-8" />,
      title: "Style Layers",
      description:
        "Mix and match artistic styles, apply filters, and create unique compositions",
      color: "from-green-500 to-emerald-500",
    },
  ];

  const stats = [
    {
      icon: <Users className="w-6 h-6" />,
      number: "150K+",
      label: "Active Creators",
      color: "text-blue-500",
    },
    {
      icon: <ImageIcon className="w-6 h-6" />,
      number: "5M+",
      label: "Images Generated",
      color: "text-purple-500",
    },
    {
      icon: <Star className="w-6 h-6" />,
      number: "4.9",
      label: "User Rating",
      color: "text-yellow-500",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      number: "2.8s",
      label: "Avg Speed",
      color: "text-green-500",
    },
  ];

  const galleryImages = [
    {
      id: 1,
      image: "/images/ai_image.webp",
      prompt: "Sci-fi cityscapes, magical forests, and imaginative scenes.",
      category: "landscape",
      likes: 1247,
      views: 8934,
    },
    {
      id: 2,
      image: "/images/1286x0w_(3)[1].png",
      prompt: "Abstract digital art with neon colors",
      category: "abstract",
      likes: 892,
      views: 5621,
    },
    {
      id: 3,
      image: "/images/ai_image_2.webp",
      prompt: "Perfect for baby portraits, family visuals, and storybook-style images.",
      category: "fantasy",
      likes: 2156,
      views: 12847,
    },
    {
      id: 4,
      image: "/images/ai-gallery-4.png",
      prompt: "Cyberpunk character portrait",
      category: "portrait",
      likes: 1834,
      views: 9876,
    },
    {
      id: 5,
      image: "/images/ai-gallery-5.png",
      prompt: "Surreal landscape with floating islands",
      category: "landscape",
      likes: 967,
      views: 6543,
    },
    {
      id: 6,
      image: "/images/laptop-image.webp",
      prompt: "Vintage sci-fi movie poster style",
      category: "vintage",
      likes: 1456,
      views: 8234,
    },
  ];

  const filterCategories = [
    { id: "all", label: "All Styles" },
    { id: "landscape", label: "Landscapes" },
    { id: "portrait", label: "Portraits" },
    { id: "abstract", label: "Abstract" },
    { id: "fantasy", label: "Fantasy" },
    { id: "vintage", label: "Vintage" },
  ];

  const filteredImages =
    activeFilter === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeFilter);

  return (
    <div className="ai-generator-landing" ref={containerRef}>
      {/* Custom Cursor */}
      <motion.div
        className="custom-cursor"
        animate={{
          x: mousePosition.x - 10,
          y: mousePosition.y - 10,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />

      {/* Floating Navigation */}
      <motion.nav
        className="floating-nav"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <div className="nav-container">
          <motion.div className="nav-logo" whileHover={{ scale: 1.05 }}>
            <Sparkles className="w-6 h-6" />
            <span>Visionary AI</span>
          </motion.div>

          <div className="nav-links">
            <motion.a
              href="#features"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Features
            </motion.a>
            <motion.a
              href="#gallery"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Gallery
            </motion.a>
            <motion.a
              href="#demo"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Demo
            </motion.a>
          </div>

          {/* <motion.button
            className="nav-cta"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a
              href="https://apps.apple.com/us/app/visionary-ai-aiimage-generator/id6739939911"
              target="_blank"
            >
              Get Started
            </a>
          </motion.button> */}

          <motion.button
            className="mobile-menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <a href="#features" onClick={() => setIsMenuOpen(false)}>
              Features
            </a>
            <a href="#gallery" onClick={() => setIsMenuOpen(false)}>
              Gallery
            </a>
            <a href="#demo" onClick={() => setIsMenuOpen(false)}>
              Demo
            </a>
            <Button className="mobile-cta">Get Started</Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animated Background */}
      <div className="interactive-background">
        <motion.div className="bg-gradient-1" style={{ y }} />
        <motion.div
          className="bg-gradient-2"
          style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]) }}
        />
        <motion.div
          className="bg-gradient-3"
          style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "70%"]) }}
        />

        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="floating-particle"
            initial={{
              x:
                Math.random() *
                (typeof window !== "undefined" ? window.innerWidth : 1200),
              y:
                Math.random() *
                (typeof window !== "undefined" ? window.innerHeight : 800),
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <motion.section
        className="hero-section-interactive"
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        <div className="hero-content-interactive">
          <motion.div
            variants={itemVariants}
            className="hero-badge-interactive"
          >
            <motion.div
              className="badge-interactive"
              whileHover={{ scale: 1.05 }}
              animate={{
                boxShadow: [
                  "0 0 20px rgba(139, 92, 246, 0.3)",
                  "0 0 30px rgba(139, 92, 246, 0.5)",
                  "0 0 20px rgba(139, 92, 246, 0.3)",
                ],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <ImageIcon className="w-4 h-4" />
              <span>AI-Powered Creation Studio</span>
              <motion.div
                className="badge-glow"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />
            </motion.div>
          </motion.div>

          <motion.h1 className="hero-title-interactive" variants={itemVariants}>
            Create <span className="gradient-text-animated">Impossible</span>
            <br />
            Art with AI
          </motion.h1>

          <motion.p
            className="hero-description-interactive"
            variants={itemVariants}
          >
            Transform your imagination into stunning visuals using the power of
            artificial intelligence. Our AI Image Generator allows you to enter
            a text prompt and instantly generate high-quality, realistic images.
            <span> Try it now and turn words into visuals instantly!</span>
          </motion.p>

          <motion.div
            className="hero-buttons-interactive"
            variants={itemVariants}
          >
            <motion.button
              className="primary-button-interactive"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(139, 92, 246, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <ExternalLink className="w-5 h-5" />
              <span>
                {" "}
                <a
                  href="https://apps.apple.com/us/app/visionary-ai-aiimage-generator/id6739939911"
                  target="_blank"
                >
                  Start Creating
                </a>
              </span>
              <motion.div
                className="button-glow"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
            </motion.button>

            <motion.button
              className="secondary-button-interactive"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleVideoPlay}
            >
              <Play className="w-5 h-5" />
              <span>Watch Demo</span>
            </motion.button>
          </motion.div>

          <motion.div
            className="scroll-indicator-interactive"
            variants={itemVariants}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <ChevronDown className="w-6 h-6" />
            <span>Scroll to explore</span>
          </motion.div>
        </div>

        {/* Interactive Hero Visual */}
        <motion.div className="hero-visual-interactive" variants={itemVariants}>
          <motion.div
            className="hero-image-container"
            whileHover={{ rotateY: 5, rotateX: 5 }}
            transition={{ duration: 0.3 }}
          >
            <img src="/images/image.png" alt="AI Generated Art" />
            <motion.div
              className="image-glow"
              animate={{
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.05, 1],
              }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            />
          </motion.div>

          {/* Floating UI Elements */}
          <motion.div
            className="floating-ui-element ui-1"
            animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
          >
            <Palette className="w-4 h-4" />
            <span>Style: Cyberpunk</span>
          </motion.div>

          <motion.div
            className="floating-ui-element ui-2"
            animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: 1,
            }}
          >
            <Zap className="w-4 h-4" />
            <span>Generated in 2.3s</span>
          </motion.div>

          <motion.div
            className="floating-ui-element ui-3"
            animate={{ y: [0, -15, 0], rotate: [0, 3, 0] }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              delay: 2,
            }}
          >
            <Star className="w-4 h-4" />
            <span>4K Quality</span>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Interactive Stats */}
      <motion.section
        className="stats-section-interactive"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="stats-container-interactive">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="stat-card-interactive"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.05,
                y: -5,
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
              }}
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
            >
              <motion.div
                className={`stat-icon-interactive ${stat.color}`}
                animate={
                  hoveredCard === index ? { rotate: 360 } : { rotate: 0 }
                }
                transition={{ duration: 0.6 }}
              >
                {stat.icon}
              </motion.div>
              <motion.div
                className="stat-number-interactive"
                animate={hoveredCard === index ? { scale: 1.1 } : { scale: 1 }}
              >
                {stat.number}
              </motion.div>
              <div className="stat-label-interactive">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Interactive Features */}
      <motion.section
        className="features-section-interactive"
        id="features"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="section-container">
          <motion.div
            className="section-header-interactive"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title-interactive">Powerful AI Features</h2>
            <p className="section-description-interactive">
              Experience the next generation of creative tools powered by
              artificial intelligence
            </p>
          </motion.div>

          <div className="features-grid-interactive">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card-interactive"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className={`feature-icon-interactive bg-gradient-to-r ${feature.color}`}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="feature-title-interactive">{feature.title}</h3>
                <p className="feature-description-interactive">
                  {feature.description}
                </p>

                <motion.div
                  className="feature-hover-effect"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Demo Video Section */}
      <motion.section
        className="demo-section-interactive"
        id="demo"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="section-container">
          <motion.div
            className="section-header-interactive"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title-interactive">
              See AI Magic in Action
            </h2>
            <p className="section-description-interactive">
              Watch how our AI transforms simple text prompts into stunning
              artwork in real-time
            </p>
          </motion.div>

          <motion.div
            className="demo-video-container"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="video-preview" onClick={handleVideoPlay}>
              <video className="preview-video" muted loop autoPlay playsInline>
                <source src="/videos/ai-demo-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <motion.div
                className="video-overlay"
                whileHover={{ opacity: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="play-button-large"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play className="w-12 h-12" />
                </motion.div>
                <div className="video-info">
                  <h3>AI Image Generation Demo</h3>
                  {/* <p>See the complete process from prompt to masterpiece</p> */}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Interactive Gallery */}
      <motion.section
        className="gallery-section-interactive"
        id="gallery"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="section-container">
          <motion.div
            className="section-header-interactive"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title-interactive">AI Art Gallery</h2>
            <p className="section-description-interactive">
              Explore stunning creations from our community of AI artists
            </p>
          </motion.div>

          {/* Interactive Filter */}
          <motion.div
            className="gallery-filters"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {filterCategories.map((category) => (
              <motion.button
                key={category.id}
                className={`filter-button ${
                  activeFilter === category.id ? "active" : ""
                }`}
                onClick={() => setActiveFilter(category.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.label}
              </motion.button>
            ))}
          </motion.div>

          <motion.div className="gallery-grid-interactive" layout>
            <AnimatePresence mode="wait">
              {filteredImages.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="gallery-item-interactive"
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  onClick={() => setSelectedImage(item)}
                >
                  <div className="gallery-image-interactive">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.prompt}
                    />
                    <motion.div
                      className="gallery-overlay-interactive"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="gallery-stats">
                        <div className="stat">
                          <Heart className="w-4 h-4" />
                          <span>{item.likes}</span>
                        </div>
                        <div className="stat">
                          <Eye className="w-4 h-4" />
                          <span>{item.views}</span>
                        </div>
                      </div>
                      <motion.button
                        className="gallery-action"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Maximize className="w-4 h-4" />
                      </motion.button>
                    </motion.div>
                  </div>
                  <div className="gallery-content-interactive">
                    <p className="gallery-prompt">"{item.prompt}"</p>
                    <div className="gallery-actions">
                      {/* <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Heart className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Share2 className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Download className="w-4 h-4" />
                      </motion.button> */}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.section>

      {/* Video Modal */}
      <AnimatePresence>
        {showVideoModal && (
          <motion.div
            className="video-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleVideoClose}
          >
            <motion.div
              className="video-modal-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <video
                ref={videoRef}
                className="modal-video"
                controls
                autoPlay
                onPlay={() => setIsVideoPlaying(true)}
                onPause={() => setIsVideoPlaying(false)}
              >
                <source
                  src="/images/Words to Art Magic-VEED.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>

              <div className="video-controls">
                <motion.button
                  className="video-control-btn"
                  onClick={toggleVideoPlayback}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {isVideoPlaying ? (
                    <Pause className="w-6 h-6" />
                  ) : (
                    <Play className="w-6 h-6" />
                  )}
                </motion.button>

                <div className="video-info-modal">
                  <h3>AI Image Generation Process</h3>
                </div>
              </div>

              <motion.button
                className="modal-close"
                onClick={handleVideoClose}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-6 h-6" />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="image-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="image-modal-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.image || "/placeholder.svg"}
                alt={selectedImage.prompt}
              />
               <div className="modal-info">
                <h3>"{selectedImage.prompt}"</h3>
                <div className="modal-stats">
                  <span>
                    <Heart className="w-4 h-4" /> {selectedImage.likes}
                  </span>
                  <span>
                    <Eye className="w-4 h-4" /> {selectedImage.views}
                  </span>
                </div>
              </div> 
              <motion.button
                className="modal-close"
                onClick={() => setSelectedImage(null)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-6 h-6" />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive CTA */}
      <motion.section
        className="cta-section-interactive"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="cta-container-interactive"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="cta-title-interactive">Ready to Create Magic?</h2>
          <p className="cta-description-interactive">
            Join thousands of creators and bring your imagination to life with
            AI
          </p>

          <div className="cta-buttons-interactive">
            <motion.button
              className="cta-secondary-interactive"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className=" h-5 w-5 " />
              <a
                href="https://apps.apple.com/us/app/visionary-ai-aiimage-generator/id6739939911"
                target="_blank"
                className="download-button"
              >
                Download App
              </a>
            </motion.button>
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
}
