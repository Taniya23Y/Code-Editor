/* eslint-disable no-unused-vars */
import { useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { ArrowRight, CheckCircle, ChevronRight } from "lucide-react";
import signupPng from "../../../assets/images/signupPng.png";
import editorPng from "../../../assets/images/editorPng.png";
import livePreviewPng from "../../../assets/images/livePreviewPng.png";
import communityPng from "../../../assets/images/communityPng.png";
import profilePng from "../../../assets/images/profilePng.png";

export default function WorkFlow() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  const steps = [
    {
      number: "01",
      title: "Sign Up / Login",
      description:
        "Create an account or log in securely to access the compiler. Start coding in seconds.",
      color: "from-sky-500 to-blue-600",
      image: signupPng,
      features: [
        "Secure authentication with email or GitHub",
        "Quick account creation with minimal info",
        "Access to personalized workspace",
      ],
    },
    {
      number: "02",
      title: "Multi-Language Editor",
      description:
        "Write and run code in multiple programming languages with our powerful online editor.",
      color: "from-purple-500 to-indigo-600",
      image: editorPng,
      features: [
        "Supports JavaScript, Python, C++, Java, and more",
        "Syntax highlighting and auto-completion",
        "Error detection and inline hints",
      ],
    },
    {
      number: "03",
      title: "Live Preview",
      description:
        "See instant output of your code with real-time live preview and error handling.",
      color: "from-pink-500 to-purple-500",
      image: livePreviewPng,
      features: [
        "Real-time code execution",
        "Instant output rendering",
        "Inline debugging for quick fixes",
      ],
    },
    {
      number: "04",
      title: "Developer Community & Snippets",
      description:
        "Save and share code snippets, explore community projects, and collaborate with developers worldwide.",
      color: "from-green-500 to-emerald-600",
      image: communityPng,
      features: [
        "Share code snippets with others",
        "Explore and reuse community projects",
        "Collaborate and comment on shared code",
      ],
    },
    {
      number: "05",
      title: "User Profile",
      description:
        "Manage your profile, track coding history, and personalize your development experience.",
      color: "from-amber-500 to-orange-600",
      image: profilePng,
      features: [
        "View coding history and stats",
        "Manage saved projects and snippets",
        "Customize IDE settings and themes",
      ],
    },
  ];

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative py-24 bg-linear-to-b from-gray-950 via-gray-900 to-gray-950"
    >
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center mb-16 md:mb-24"
        >
          <span className="inline-block px-4 py-1.5 text-xs font-medium text-sky-300 bg-gray-950/50 rounded-full backdrop-blur-sm mb-4">
            Build, Run & Share
          </span>
          <h2 className="text-4xl text-white md:text-5xl font-bold mb-6 tracking-tight">
            How{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#67BCFF] via-[#9C9EFF] to-[#CB86FF]">
              {" "}
              Code.Compiler
            </span>{" "}
            Streamlines Your Coding Workflow
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            A seamless five-step process to sign up, code in multiple languages,
            preview results, share with the developer community, and manage your
            profile.
          </p>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-linear-to-r from-[#67BCFF] via-[#9C9EFF] to-[#CB86FF] rounded-full transform -translate-x-1/2" />

          <div className="space-y-20 md:space-y-32">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { duration: 0.8, delay: index * 0.2 },
                  },
                }}
                initial="hidden"
                animate={mainControls}
                className={`flex flex-col ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } items-center gap-6 md:gap-12`}
              >
                <div className="relative shrink-0 z-10">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-900 rounded-full border-2 border-purple-500 flex items-center justify-center shadow-lg shadow-purple-900/20">
                    <span className="text-2xl md:text-3xl font-bold bg-linear-to-r from-[#67BCFF] via-[#9C9EFF] to-[#CB86FF] bg-clip-text text-transparent">
                      {step.number}
                    </span>
                  </div>

                  <div className="absolute -inset-3 z-0">
                    <div className="absolute inset-0 rounded-full bg-purple-500/20 animate-ping opacity-50" />
                    <div className="absolute inset-0 rounded-full bg-linear-to-r from-sky-500/20 to-purple-500/20 blur-sm" />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="relative bg-gray-900/90 backdrop-blur-md rounded-xl overflow-hidden md:max-w-[90%]">
                    <div className="absolute inset-0 bg-linear-to-br from-sky-800/20 via-transparent to-purple-800/20 opacity-50" />
                    <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-[#67BCFF] via-[#9C9EFF] to-[#CB86FF]" />

                    <div className="p-6 md:p-8 relative">
                      <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start">
                        <div className="flex-1">
                          <h3 className="text-2xl bg-linear-to-r from-[#67BCFF] via-[#9C9EFF] to-[#CB86FF] bg-clip-text text-transparent font-bold mb-3">
                            {step.title}
                          </h3>
                          <p className="text-gray-300">{step.description}</p>

                          <ul className="mt-5 space-y-2">
                            {step.features.map((feature, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-purple-400 mt-0.5 shrink-0" />
                                <span className="text-sm text-gray-300">
                                  {feature}
                                </span>
                              </li>
                            ))}
                          </ul>

                          <div className="mt-6">
                            <a
                              href="#"
                              className="inline-flex items-center text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors"
                            >
                              Learn more about this step{" "}
                              <ChevronRight className="ml-1 h-4 w-4" />
                            </a>
                          </div>
                        </div>

                        <div className="relative shrink-0 md:w-1/2 w-full rounded-lg overflow-hidden">
                          <div className="absolute inset-0  z-10 pointer-events-none" />
                          <img
                            src={step.image || "/placeholder.svg"}
                            alt={step.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="relative inline-block">
            <div className="absolute -inset-1 bg-linear-to-r from-purple-600 to-pink-600 rounded-lg blur-md opacity-70" />
            <a
              href="#"
              className="relative inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-linear-to-r from-[#67BCFF] via-[#9C9EFF] to-[#CB86FF] text-white font-medium text-lg hover:from-purple-500 hover:to-pink-500 transition-all shadow-lg shadow-purple-900/30"
            >
              Try it Now! <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
