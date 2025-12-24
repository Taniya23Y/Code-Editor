/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "../../commons/Buttons";

export default function Testimonials() {
  const testimonials = [
    {
      quote:
        "Code.Compiler has completely changed how I write and test code. The multi-language support is seamless, and the live preview is super helpful!",
      author: "Ananya Singh",
      role: "Frontend Developer",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3",
      rating: 5,
    },
    {
      quote:
        "I love the developer community and snippet sharing features on Code.Compiler. It's easy to collaborate and learn from other developers.",
      author: "Ram Kapoor",
      role: "Full Stack Developer",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3",

      rating: 5,
    },
    {
      quote:
        "The user profile on Code.Compiler keeps track of my coding history perfectly. I can manage my projects and preferences without any hassle.",
      author: "Priya Sud",
      role: "Software Engineer",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3",
      rating: 5,
    },
    {
      quote:
        "Signing up on Code.Compiler was fast, and I immediately had access to a powerful code editor. Running multiple languages and seeing live results is amazing.",
      author: "Aditya Vakhani",
      role: "Backend Developer",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3",
      rating: 5,
    },
  ];

  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoplay, testimonials.length]);

  const next = () => {
    setAutoplay(false);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setAutoplay(false);
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section
      id="testimonials"
      className="py-16 sm:py-20 md:py-24 bg-black relative overflow-hidden"
      aria-labelledby="testimonials-heading"
    >
      {/* Background elements */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-purple-500/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-sky-500/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-5 sm:px-6 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <h2
            id="testimonials-heading"
            className="text-2xl bg-linear-to-r from-[#67BCFF] via-[#9C9EFF] to-[#CB86FF] bg-clip-text text-transparent sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4"
          >
            What Our Developers Say
          </h2>
          <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto">
            Don&apos;t just take our word for it - hear from our satisfied
            customers.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div
            className="absolute -top-12 -left-12 text-purple-700/20 hidden sm:block"
            aria-hidden="true"
          >
            <Quote size={80} />
          </div>

          <div
            className="sm:hidden flex justify-center mb-4"
            aria-hidden="true"
          >
            <Quote className="h-10 w-10 text-red-500/20" />
          </div>

          <div
            className="min-h-100 flex items-center"
            role="region"
            aria-roledescription="testimonial carousel"
            aria-label="Customer testimonials"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 sm:p-8 md:p-12"
                aria-live="polite"
                role="group"
                aria-roledescription="slide"
                aria-label={`Testimonial ${current + 1} of ${
                  testimonials.length
                }`}
              >
                <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center">
                  <div className="md:w-1/3 w-full">
                    <div className="relative max-w-40 mx-auto">
                      <div
                        className="absolute -inset-1 bg-linear-to-r from-[#67BCFF] via-[#9C9EFF] to-[#CB86FF]  rounded-full blur-sm"
                        aria-hidden="true"
                      ></div>
                      <div className="relative h-20 w-20 sm:h-24 sm:w-24 mx-auto overflow-hidden rounded-full">
                        <img
                          src={
                            testimonials[current].avatar || "/placeholder.svg"
                          }
                          alt={`Portrait of ${testimonials[current].author}`}
                          className="object-cover w-full h-full rounded-full"
                        />
                      </div>
                    </div>

                    <div className="text-center text-white mt-4">
                      <h4 className="font-bold">
                        {testimonials[current].author}
                      </h4>
                      <p className="text-white/70 text-sm">
                        {testimonials[current].role}
                      </p>
                      <div
                        className="flex justify-center mt-2"
                        aria-label={`Rated ${testimonials[current].rating} out of 5 stars`}
                      >
                        {[...Array(testimonials[current].rating)].map(
                          (_, i) => (
                            <svg
                              key={i}
                              className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 fill-current"
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                            >
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                          )
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="md:w-2/3 w-full">
                    <p className="text-base text-white sm:text-lg md:text-xl italic mb-4 sm:mb-6 text-center md:text-left">
                      &ldquo;{testimonials[current].quote}&ldquo;
                    </p>
                    <div
                      className="h-px w-16 bg-linear-to-r from-[#67BCFF] via-[#9C9EFF] to-[#CB86FF] mx-auto md:mx-0"
                      aria-hidden="true"
                    ></div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div
            className="flex justify-center mt-6 sm:mt-8 gap-3 sm:gap-4"
            aria-label="Testimonial navigation"
          >
            <Button
              variant="outline"
              size="icon"
              onClick={prev}
              className="h-8 w-8 sm:h-10 sm:w-10 rounded-full cursor-pointer border-white/10 hover:bg-white/10 hover:text-white focus:ring-2 focus:ring-white focus:outline-none"
              aria-label="Previous testimonial"
            >
              <ChevronLeft
                className="h-4 w-4 sm:h-5 sm:w-5"
                aria-hidden="true"
              />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={next}
              className="h-8 w-8 sm:h-10 sm:w-10 cursor-pointer rounded-full border-white/10 hover:bg-white/10 hover:text-white focus:ring-2 focus:ring-white focus:outline-none"
              aria-label="Next testimonial"
            >
              <ChevronRight
                className="h-4 w-4 sm:h-5 sm:w-5"
                aria-hidden="true"
              />
            </Button>
          </div>

          <div className="flex justify-center mt-4 sm:mt-6">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setAutoplay(false);
                  setCurrent(idx);
                }}
                className={`w-1.5 h-1.5 sm:w-2 sm:h-2 mx-1 rounded-full focus:outline-none focus:ring-2 focus:ring-white ${
                  current === idx
                    ? "bg-linear-to-r from-[#67BCFF] via-[#9C9EFF] to-[#CB86FF]"
                    : "bg-white/20"
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
                aria-current={current === idx ? "true" : "false"}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
