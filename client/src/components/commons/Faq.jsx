/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./Accordion";
import React from "react";

const Faq = () => {
  const codeCompilerFaqs = [
    {
      question: "Which programming languages can I code in?",
      answer:
        "Code.Compiler supports multiple programming languages including C, C++, JavaScript, TypeScript, Python, Go, Ruby, Swift, HTML, CSS, C#, and Rust — all within your browser.",
    },
    {
      question: "Can I see live output of my code?",
      answer:
        "Yes! Our platform provides live code execution with real-time preview, so you can instantly see the results of your HTML, CSS, and JavaScript projects.",
    },
    {
      question: "Does Code.Compiler offer code snippet management?",
      answer:
        "Absolutely. You can save, edit, and organize your code snippets in your personal toolkit, making it easy to reuse and share code across projects.",
    },
    {
      question: "Is there a community or collaboration feature?",
      answer:
        "Yes, Code.Compiler has a developer community where you can share snippets, get feedback, and collaborate with other coders on projects.",
    },
    {
      question: "Can I build full projects in the browser?",
      answer:
        "Yes! You can seamlessly develop projects using your favorite languages with live preview, making Code.Compiler a full-featured browser-based IDE.",
    },
    {
      question: "Is my code safe and private?",
      answer:
        "Your code and data are safe. All snippets and projects are securely stored in your account and only accessible to you unless shared.",
    },
  ];

  return (
    <section className="py-4 sm:py-20 md:py-24 bg-black text-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-sky-500/10 rounded-full blur-[100px]"></div>
        <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-purple-500/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 bg-linear-to-r from-sky-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white max-w-2xl mx-auto">
            Have questions about Code.Compiler? Here are answers to common
            queries about our features, tools, and platform.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <Accordion
            type="single"
            collapsible
            className="w-full space-y-3 sm:space-y-4"
          >
            {codeCompilerFaqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="bg-white/5  backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden"
                >
                  <AccordionTrigger className="cursor-pointer text-white px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-lg font-medium hover:no-underline hover:bg-white/5 text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="cursor-pointer px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base text-white">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-8 sm:mt-10 md:mt-12"
        >
          <p className="text-sm sm:text-base text-white/70">
            Still have questions?{" "}
            <a
              href="https://taniyay-portfolio.vercel.app/#contact"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 underline underline-offset-2"
            >
              Please Contact!
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Faq;
