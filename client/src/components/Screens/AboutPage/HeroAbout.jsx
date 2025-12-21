import React from "react";
import { Link } from "react-router-dom";

const HeroAbout = () => {
  return (
    <section className="relative min-h-svh flex items-center pt-16 sm:pt-20 overflow-hidden bg-black text-white pb-12">
      <div className="container mx-auto flex flex-col gap-20 px-4">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl font-extrabold mb-6">
            About{" "}
            <span className="bg-linear-to-tr from-[#67BCFF] via-[#9C9EFF] to-[#CB86FF] bg-clip-text text-transparent">
              Code.Compiler
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
            We built Code.Compiler to make coding{" "}
            <span className="font-semibold text-white">easier, faster,</span>
            and <span className="font-semibold text-white">accessible</span> for
            everyone.
          </p>
        </div>

        {/* Our Story */}
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 bg-linear-to-r from-[#67BCFF] via-[#9C9EFF] to-[#CB86FF] bg-clip-text text-transparent">
            Our Story
          </h2>
          <p className="text-gray-400 leading-relaxed text-lg">
            Code.Compiler was born out of the belief that coding should be
            simple and available for{" "}
            <span className="text-white font-medium">everyone, everywhere</span>
            . Whether you&apos;re a beginner writing your first &ldquo;Hello
            World&ldquo; or a pro building prototypes, our goal is to provide a
            <span className="text-white font-medium">
              {" "}
              lightweight yet powerful
            </span>{" "}
            environment for coding in multiple languages.
          </p>
        </div>

        {/* Mission, Vision, Values */}
        <div className="grid sm:grid-cols-3 gap-8 text-center">
          {[
            {
              title: "Our Mission",
              desc: "To democratize coding tools and make programming accessible worldwide.",
            },
            {
              title: "Our Vision",
              desc: "Empower learners and developers to bring their ideas to life without barriers.",
            },
            {
              title: "Our Values",
              desc: "Simplicity, accessibility, and innovation are at the heart of everything we do.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-6 bg-[#1d1d1d]/70 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all"
            >
              <h3 className="text-xl font-semibold mb-3 bg-linear-to-r from-[#67BCFF] via-[#9C9EFF] to-[#CB86FF] bg-clip-text text-transparent">
                {item.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Why Choose Us */}
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 bg-linear-to-r from-[#67BCFF] via-[#9C9EFF] to-[#CB86FF] bg-clip-text text-transparent">
            Why Choose Code.Compiler?
          </h2>
          <ul className="text-gray-400 text-lg space-y-3 sm:text-center">
            <li>🚀 Multi-language support in one place</li>
            <li>⚡ Fast, responsive, and secure</li>
            <li>🎓 Perfect for students, teachers, and professionals</li>
          </ul>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to{" "}
            <span className="bg-linear-to-tr from-[#67BCFF] via-[#9C9EFF] to-[#CB86FF] bg-clip-text text-transparent">
              Start Coding?
            </span>
          </h2>
          <Link
            href="/editor"
            className="px-8 py-4 bg-linear-to-tr from-[#67BCFF] via-[#9C9EFF] to-[#CB86FF] text-black font-semibold rounded-xl shadow-lg hover:opacity-90 transition"
          >
            Try Code.Compiler Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroAbout;
