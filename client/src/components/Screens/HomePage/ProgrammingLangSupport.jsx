/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";

const ProgrammingLangSupport = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  const programmingLanguages = [
    {
      name: "C",
      category: "System Programming",
      logo: "https://cdn.simpleicons.org/c",
      snippet: `#include <stdio.h>
int main() {
    printf("Hello World");
    return 0;
}`,
      description: "open it!",
    },
    {
      name: "C++",
      category: "Game Dev / High-Performance",
      logo: "https://cdn.simpleicons.org/cplusplus",
      snippet: `#include <iostream>
int main(){ 
    std::cout << "Hello World"; 
    return 0; 
}`,
      description: "open it!",
    },
    {
      name: "JavaScript",
      category: "Web Development",
      logo: "https://cdn.simpleicons.org/javascript",
      snippet: `console.log("Hello World");`,
      description: "open it!",
    },
    {
      name: "TypeScript",
      category: "Typed Web Development",
      logo: "https://cdn.simpleicons.org/typescript",
      snippet: `let message: string = "Hello World"; 
console.log(message);`,
      description: "open it!",
    },
    {
      name: "Python",
      category: "AI / Data Science",
      logo: "https://cdn.simpleicons.org/python",
      snippet: `print("Hello World")`,
      description: "open it!",
    },
    {
      name: "Go",
      category: "Cloud / Backend",
      logo: "https://cdn.simpleicons.org/go",
      snippet: `package main
import "fmt"
func main(){ fmt.Println("Hello World") }`,
      description: "open it!",
    },
    {
      name: "Ruby",
      category: "Web Frameworks",
      logo: "https://cdn.simpleicons.org/ruby",
      snippet: `puts "Hello World"`,
      description: "open it!",
    },
    {
      name: "Swift",
      category: "iOS Development",
      logo: "https://cdn.simpleicons.org/swift",
      snippet: `print("Hello World")`,
      description: "open it!",
    },
    {
      name: "HTML",
      category: "Markup",
      logo: "https://cdn.simpleicons.org/html5",
      snippet: `<h1>Hello World</h1>`,
      description: "open it!",
    },
    {
      name: "CSS",
      category: "Styling",
      logo: "https://cdn.simpleicons.org/css3",
      snippet: `h1 { color: red; }`,
      description: "open it!",
    },
    {
      name: "C#",
      category: "Enterprise / .NET",
      logo: "https://cdn.simpleicons.org/csharp",
      snippet: `Console.WriteLine("Hello World");`,
      description: "open it!",
    },
    {
      name: "Rust",
      category: "Memory-Safe Systems",
      logo: "https://cdn.simpleicons.org/rust",
      snippet: `fn main(){
   println!("Hello World"); 
}`,
      description: "open it!",
    },
  ];

  return (
    <section
      className="py-12 sm:py-16 md:py-24 bg-black relative overflow-hidden"
      aria-labelledby="integrations-heading"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-sky-500/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-purple-500/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-10 md:mb-16"
        >
          <h2
            id="integrations-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 bg-linear-to-r from-sky-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
          >
            Supported Programming Languages
          </h2>
          <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto">
            Write and execute code in multiple programming languages without
            leaving your browser, and seamlessly build projects with HTML, CSS,
            and JavaScript — complete with a live preview.
          </p>
        </motion.div>

        <div
          className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 sm:gap-4"
          role="list"
          aria-label="Available languages"
        >
          {programmingLanguages.map((language, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: 1.07, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="group cursor-pointer"
              role="listitem"
              onClick={() => setSelectedLanguage(language.name)}
            >
              <div
                className="bg-white/5 hover:bg-linear-to-r from-sky-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-white/10 rounded-xl p-3 flex flex-col items-center justify-center h-full transition-all shadow-lg hover:shadow-2xl focus-within:ring-2 focus-within:ring-purple-400/50"
                tabIndex={0}
              >
                <div className="w-10 h-10 rounded-full bg-linear-to-r from-sky-400/30 via-purple-400/30 to-pink-400/30 flex items-center justify-center mb-2">
                  <img
                    src={language.logo}
                    alt={`${language.name} logo`}
                    className="w-5 h-5 object-contain filter brightness-0 invert"
                  />
                </div>
                <h3 className="font-semibold text-center text-sm sm:text-base text-white">
                  {language.name}
                </h3>
                <p className="text-xs text-white/50 mt-1 text-center group-hover:text-white/80 transition-colors">
                  {language.category}
                </p>
              </div>
              <div className="relative group">
                <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-sky-600/80 text-white text-xs px-1 py-1 rounded-full pointer-events-none">
                  {language.description}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Code Snippet Modal */}
      {selectedLanguage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-black/90 rounded-2xl shadow-2xl w-full max-w-lg relative border border-purple-400/50 backdrop-blur-sm"
          >
            <div className="flex justify-between items-center border-b border-white/20 px-4 py-2 rounded-t-2xl">
              <h3 className="text-white font-bold text-lg">
                {selectedLanguage} Code Snippet
              </h3>
              <button
                onClick={() => setSelectedLanguage(null)}
                className="text-white/70 hover:text-white font-bold text-xl cursor-pointer"
              >
                ✕
              </button>
            </div>

            <pre className="p-4 overflow-x-auto text-sm sm:text-base text-green-400 font-mono max-h-60 sm:max-h-80">
              {
                programmingLanguages.find(
                  (lang) => lang.name === selectedLanguage
                )?.snippet
              }
            </pre>

            <div className="flex justify-end px-4 py-2 border-t border-white/20">
              <button
                onClick={() => setSelectedLanguage(null)}
                className="px-4 py-1.5 rounded-full bg-linear-to-r from-purple-500 to-pink-500 text-white text-sm hover:scale-105 transition-transform cursor-pointer"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default ProgrammingLangSupport;
