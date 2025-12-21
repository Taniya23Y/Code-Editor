import { BriefcaseBusiness, Edit, Github, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/10 py-8 sm:py-16 px-3 sm:px-6 lg:px-8">
      <div className="container mx-auto px-4">
        {/* first half */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-12">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 bg-linear-to-r from-[#67BCFF] via-[#9C9EFF] to-[#CB86FF] rounded-lg rotate-45 transform origin-center"></div>
                <div className="absolute inset-0.75 bg-black rounded-lg flex items-center justify-center text-white font-bold">
                  {"{}"}
                </div>
              </div>
              <span className="text-[15px] md:text-2xl font-bold bg-linear-to-r from-[#67BCFF] via-[#9C9EFF] to-[#CB86FF] bg-clip-text text-transparent">
                Code.Compiler
              </span>
            </Link>

            <p className="text-white/70 mb-6">
              Empowering developers to write, run, and share code instantly
              across multiple languages, while building a thriving community of
              code snippets
            </p>

            <div className="flex space-x-4">
              <Link
                href="https://hashnode.com/@Taniya23"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-white transition-colors"
              >
                <Edit className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="https://taniyay-portfolio.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-white transition-colors"
              >
                <BriefcaseBusiness className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>

              <Link
                href="https://linkedin.com/in/taniyay"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-white transition-colors"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <a
                href="https://github.com/Taniya23Y/Code.Compiler"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-white transition-colors"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Product</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#features"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#editors"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Editor
                </Link>
              </li>
              <li>
                <Link
                  href="/developer-snippets"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Snippets
                </Link>
              </li>
              <li>
                <Link
                  href="/developer-snippets"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Community
                </Link>
              </li>
              <li>
                <Link
                  href="https://roadmap.sh/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Roadmap
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/aboutus"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="https://taniya23y.hashnode.dev/javascript-closure"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Customers
                </Link>
              </li>
              <li>
                <Link
                  href="https://taniyay-portfolio.vercel.app/#contact"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="https://github.com/Taniya23Y/Code.Compiler/blob/main/README.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="https://linkedin.com/in/taniyay"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="https://code.visualstudio.com/api/references/vscode-api"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  API Reference
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Community
                </Link>
              </li>
              <li>
                <h1>
                  💜 Developed by{" "}
                  <span className="text-purple-400">Taniya Yadav</span>
                </h1>
              </li>
            </ul>
          </div>
        </div>

        {/* last half */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/50 text-sm mb-4 md:mb-0">
            © 2024-{new Date().getFullYear()} Code.Compiler. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="#"
              className="text-white/50 hover:text-white text-sm transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-white/50 hover:text-white text-sm transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              className="text-white/50 hover:text-white text-sm transition-colors"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
