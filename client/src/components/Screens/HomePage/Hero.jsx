/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Star, Sparkles } from "lucide-react";
import heroCodeImage from "../../../assets/images/codeCompiler-heroImage.png";
import gridSvg from "../../../assets/svg/grid.svg";
import { Button } from "../../commons/Buttons";

const Hero = () => {
  const parallaxRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!parallaxRef.current || window.innerWidth < 768) return;

      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      const moveX = (clientX - innerWidth / 2) / 50;
      const moveY = (clientY - innerHeight / 2) / 50;

      parallaxRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative container mx-auto flex items-center pt-20 md:pt-20 overflow-hidden bg-black">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-black via-black to-black/90"></div>

        <div className="absolute top-1/3 left-1/3 w-75 sm:w-125 h-75 sm:h-125 rounded-full bg-sky-500/20 blur-[100px] animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 right-1/3 `w-62.5 sm:w-100 h-62.5 sm:h-100 rounded-full bg-purple-500/20 blur-[100px] animate-pulse-slow delay-1000"></div>

        <div
          className="absolute inset-0 bg-repeat opacity-10"
          style={{ backgroundImage: `url(${gridSvg.src})` }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 py-8 sm:py-0">
          {/* Hero content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-[#b892ff28] backdrop-blur-md border border-purple-400/50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6 text-xs sm:text-sm shadow-lg shadow-purple-500/10"
            >
              <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-amber-400" />
              <span className="font-medium">
                Introducing Code.Compiler AI Assistant
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-4xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 leading-tight"
            >
              <span className="block">Empower Your Code.</span>
              <span className="bg-linear-to-r from-[#67BCFF] via-[#9C9EFF] to-[#CB86FF] bg-clip-text text-transparent">
                Compile. Run. Share.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg lg:text-xl text-white/70 mb-6 sm:mb-8 max-w-xl mx-auto lg:mx-0"
            >
              A powerful online IDE for developers, offering multi-language
              support, code snippets, community collaboration, and seamless
              sharing — all in one platform.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-[80%] mx-auto justify-center md:justify-start"
            >
              <Button className="bg-linear-to-r from-[#67BCFF] via-[#9C9EFF] to-[#CB86FF] hover:from-purple-600 hover:to-sky-600 cursor-pointer text-white border-0 h-10 sm:h-12 px-6 sm:px-8 text-sm sm:text-base">
                Start Coding Now
                <ArrowRight className="ml-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </Button>
              <Button
                variant="outline"
                className="border-white/20 cursor-pointer text-white hover:bg-white/10 h-10 sm:h-12 px-6 sm:px-8 text-sm sm:text-base"
              >
                Watch Demo
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-6 sm:mt-8 flex items-center justify-center lg:justify-start gap-2 sm:gap-4 flex-wrap sm:flex-nowrap"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-black bg-gray-800 flex items-center justify-center text-xs"
                  >
                    {i}
                  </div>
                ))}
              </div>
              <div className="text-xs sm:text-sm">
                <span className="text-white/70">Trusted by</span>{" "}
                <span className="font-bold">100+</span>{" "}
                <span className="text-white/70">Developers</span>
              </div>
              <div className="flex items-center gap-0.5 sm:gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-3 w-3 sm:h-4 sm:w-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
            </motion.div>
          </div>

          <div className="flex-1 relative mt-8 lg:mt-0 max-w-[90%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-full mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative z-10"
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-linear-to-r from-[#67BCFF] via-[#9C9EFF] to-[#CB86FF] rounded-2xl blur-lg opacity-70"></div>
                <div
                  ref={parallaxRef}
                  className="relative bg-black/80 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden"
                >
                  <img
                    src={heroCodeImage}
                    alt="Dashboard Preview"
                    width={600}
                    height={400}
                    className="w-full h-auto rounded-lg"
                  />

                  {/* Floating elements */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-black/50 backdrop-blur-md border border-white/10 rounded-lg p-2 sm:p-3 shadow-lg hidden xs:flex"
                  >
                    <div className="flex items-center gap-1 sm:gap-2">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-sky-200"></div>
                      <span className="text-xs sm:text-sm font-medium">
                        System Online
                      </span>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 bg-black/50 backdrop-blur-md border border-white/10 rounded-lg p-2 sm:p-3 shadow-lg hidden xs:flex"
                  >
                    <div className="flex items-center gap-1 sm:gap-2">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#B12FA2] animate-pulse"></div>
                      <span className="text-xs">Processing data...</span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            <div className="absolute -top-5 sm:-top-10 -right-5 sm:-right-10 w-10 h-10 sm:w-20 sm:h-20 border border-white/10 rounded-full hidden sm:block"></div>
            <div className="absolute -bottom-3 sm:-bottom-5 -left-3 sm:-left-5 w-6 h-6 sm:w-10 sm:h-10 border border-white/10 rounded-full hidden sm:block"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
