"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";

const ImageSlider = () => {
  const slides = [
    {
      id: 1,
      url: "/download (5).jpeg",
      alt: "Delicious pizza display",
    },
    {
      id: 2,
      url: "/download (4).jpeg",

      alt: "Gourmet shawarmas",
    },
    {
      id: 3,
      url: "/download (3).jpeg",

      alt: "Burger platter",
    },
    {
      id: 4,
      url: "/download (1).jpeg",

      alt: "Pepperoni pizza",
    },
    {
      id: 5,
      url: "/download (6).jpeg",

      alt: "Fast food assortment",
    },
  ];

  const promotions = [
    {
      id: 1,
      text: "Pizza Perfection: The Art of Perfect Dough",
      subtext: "Learn the secrets behind amazing pizza crust",
      type: "pizza",
    },
    {
      id: 2,
      text: "Shawarma Mastery: Authentic Middle Eastern Flavors",
      subtext: "Discover the perfect blend of spices and techniques",
      type: "shawarma",
    },
    {
      id: 3,
      text: "Burger Science: The Perfect Patty Every Time",
      subtext: "Why your brain loves juicy burgers and how to make them better",
      type: "burger",
    },
    {
      id: 4,
      text: "Fast Food Innovation: Healthy Options That Taste Great",
      subtext: "Delicious meals that won't compromise your health goals",
      type: "health",
    },
    {
      id: 5,
      text: "The Chemistry of Perfect Fast Food",
      subtext: "How ingredients interact to create amazing flavors",
      type: "science",
    },
    {
      id: 6,
      text: "Global Flavors: Pizza Around The World",
      subtext: "Traditional pizza styles from different countries",
      type: "global",
    },
    {
      id: 7,
      text: "The Psychology of Fast Food Marketing",
      subtext: "Why fast food looks and tastes so appealing",
      type: "psychology",
    },
    {
      id: 8,
      text: "Grilling & Smoking: The Science of Perfect Meat",
      subtext: "How heat transforms meat into delicious fast food",
      type: "science",
    },
    {
      id: 9,
      text: "Fast Food & The Microbiome: Latest Research",
      subtext: "How different foods affect your gut health",
      type: "health",
    },
    {
      id: 10,
      text: "Future of Fast Food: Innovation & Trends",
      subtext: "Where technology meets food artistry",
      type: "innovation",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPromoIndex, setCurrentPromoIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [sliderHeight, setSliderHeight] = useState(640);
  const [isMounted, setIsMounted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPromoTransitioning, setIsPromoTransitioning] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const promoTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const calculateHeight = useCallback(() => {
    if (typeof window === "undefined") return 640;
    const maxHeight = Math.min(window.innerHeight * 0.8, 800);
    const aspectRatio = 16 / 9;
    const calculatedHeight = Math.min(
      window.innerWidth / aspectRatio,
      maxHeight
    );
    return Math.max(calculatedHeight, 300);
  }, []);

  useEffect(() => {
    setIsMounted(true);
    setSliderHeight(calculateHeight());

    const handleResize = () => {
      setSliderHeight(calculateHeight());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [calculateHeight]);

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  }, [slides.length, isTransitioning]);

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (slideIndex: number) => {
    if (isTransitioning || slideIndex === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(slideIndex);
  };

  const nextPromo = useCallback(() => {
    setIsPromoTransitioning(true);
    setCurrentPromoIndex((prevIndex) =>
      prevIndex === promotions.length - 1 ? 0 : prevIndex + 1
    );

    if (promoTimeoutRef.current) {
      clearTimeout(promoTimeoutRef.current);
    }
    promoTimeoutRef.current = setTimeout(() => {
      setIsPromoTransitioning(false);
    }, 1000);
  }, [promotions.length]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isAutoPlaying) {
      intervalId = setInterval(() => {
        nextSlide();
        nextPromo();
      }, 3000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [currentIndex, isAutoPlaying, nextSlide, nextPromo]);

  useEffect(() => {
    if (isTransitioning) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setIsTransitioning(false);
      }, 1200);

      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }
  }, [isTransitioning]);

  const getSlideAnimationClass = (slideIndex: number) => {
    if (currentIndex === slideIndex) {
      return "opacity-100 blur-0 will-change-auto";
    }
    return "opacity-0 blur-sm will-change-auto";
  };

  return (
    <div className="w-full mx-auto -mt-6">
      {/* Combined Slider with Promotions Overlay */}
      <div
        className={`relative w-full mx-auto overflow-hidden will-change-transform ${isMounted ? "animate-fadeInScale" : "opacity-0 scale-95"
          }`}
        style={{ height: `${sliderHeight}px` }}
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
        onTouchStart={() => setIsAutoPlaying(false)}
        onTouchEnd={() => setIsAutoPlaying(true)}
      >
        {/* Slides Container */}
        <div className="relative w-full h-full overflow-hidden">
          {slides.map((slide, slideIndex) => (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full transition-all duration-[1200ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${getSlideAnimationClass(
                slideIndex
              )}`}
            >
              {/* Background image without blur */}
              <Image
                src={slide.url}
                alt={slide.alt}
                fill
                className="object-cover"
                priority={currentIndex === slideIndex}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1400px"
              />

              {/* Pink overlay instead of dark overlay */}
              <div className="absolute inset-0 "></div>
            </div>
          ))}
        </div>

        {/* Promotions Overlay - Positioned absolutely over the slides */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div className="relative w-full max-w-6xl px-4 md:px-6">
            {promotions.map((promo, index) => (
              <div
                key={promo.id}
                className={`text-center transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${currentPromoIndex === index
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4 absolute top-0 left-0 right-0"
                  } ${isPromoTransitioning ? "scale-95" : "scale-100"}`}
              >
                <div className="inline-block backdrop-blur-[5px]  px-6 py-4 md:px-8 md:py-6 rounded-2xl border border-pink-200/50">
                  <p className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 md:mb-3 drop-shadow-lg">
                    <span
                      className={`inline-block ${currentPromoIndex === index ? "animate-textGlow" : ""
                        }`}
                      style={{
                        textShadow:
                          currentPromoIndex === index
                            ? "0 0 8px rgba(219, 50, 80, 0.8), 0 0 16px rgba(219, 50, 80, 0.6)"
                            : "none",
                      }}
                    >
                      {promo.text}
                    </span>
                  </p>
                  <p className="text-sm md:text-base lg:text-lg text-pink-800 italic">
                    {promo.subtext}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Promotion Navigation Dots - Positioned at the top */}
        <div className="absolute top-4 left-0 right-0 flex justify-center items-center z-20 space-x-2 pointer-events-auto">
          {promotions.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentPromoIndex(index);
                setIsPromoTransitioning(true);
                setTimeout(() => setIsPromoTransitioning(false), 700);
              }}
              className={`relative rounded-full transition-all duration-300 ease-out ${currentPromoIndex === index
                ? "w-4 h-2 bg-pink-500 shadow-[0_0_8px_2px_rgba(219,50,80,0.7)]"
                : "w-2 h-2 bg-white/50 hover:bg-white/70"
                }`}
              aria-label={`Go to promotion ${index + 1}`}
            />
          ))}
        </div>

        {/* Navigation Arrows - Now Responsive */}
        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-4 cursor-pointer top-1/2 -translate-y-1/2 z-20 bg-pink-100/30 text-pink-900 p-2 sm:p-3 rounded-full hover:bg-pink-200/40 transition-all duration-300 backdrop-blur-lg border border-pink-200/30 hover:border-pink-300/40 shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 disabled:opacity-50"
          aria-label="Previous slide"
          disabled={isTransitioning}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 transition-transform duration-300 hover:scale-125"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-2 cursor-pointer sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-pink-100/30 text-pink-900 p-2 sm:p-3 rounded-full hover:bg-pink-200/40 transition-all duration-300 backdrop-blur-lg border border-pink-200/30 hover:border-pink-300/40 shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 disabled:opacity-50"
          aria-label="Next slide"
          disabled={isTransitioning}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 transition-transform duration-300 hover:scale-125"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>

        {/* Slide Dot Indicators */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center z-20 space-x-2 md:space-x-3">
          {slides.map((slide, slideIndex) => (
            <button
              key={slide.id}
              onClick={() => goToSlide(slideIndex)}
              className={`relative rounded-full transition-all duration-500 ease-out ${currentIndex === slideIndex
                ? "w-6 h-2 md:w-8 md:h-2 bg-pink-400 shadow-[0_0_10px_2px_rgba(219,50,80,0.5)]"
                : "w-2 h-2 md:w-3 md:h-3 bg-white/50 hover:bg-white/70 hover:shadow-[0_0_8px_1px_rgba(219,50,80,0.3)]"
                }`}
              aria-label={`Go to slide ${slideIndex + 1}`}
              disabled={isTransitioning}
            >
              {currentIndex === slideIndex && (
                <span className="absolute top-0 left-0 h-full bg-pink-200/40 rounded-full animate-pulse duration-1000" />
              )}
            </button>
          ))}
        </div>

        {/* Add custom animation to Tailwind config */}
        <style jsx global>{`
          @keyframes fadeInScale {
            from {
              opacity: 0;
              transform: scale(0.98);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
          .animate-fadeInScale {
            animation: fadeInScale 800ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
          }

          @keyframes textGlow {
            0% {
              text-shadow: 0 0 5px rgba(219, 50, 80, 0.5),
                0 0 10px rgba(219, 50, 80, 0.3);
            }
            50% {
              text-shadow: 0 0 10px rgba(219, 50, 80, 0.8),
                0 0 20px rgba(219, 50, 80, 0.6);
            }
            100% {
              text-shadow: 0 0 5px rgba(219, 50, 80, 0.5),
                0 0 10px rgba(219, 50, 80, 0.3);
            }
          }
          .animate-textGlow {
            animation: textGlow 3s ease-in-out infinite;
          }
        `}</style>
      </div>
    </div>
  );
};

export default ImageSlider;
