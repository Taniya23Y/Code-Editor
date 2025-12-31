import {
  MonitorPlay,
  Languages,
  BookMarked,
  UserRound,
  Download,
  Share2,
  Zap,
  ShieldCheck,
  LineChart,
} from "lucide-react";

export default function Features() {
  const features = [
    {
      title: "Live Preview",
      description:
        "Instantly see results as you code HTML, CSS, and JavaScript in real time.",
      icon: <MonitorPlay className="h-6 w-6" />,
    },
    {
      title: "Multi-Language Support",
      description:
        "Compile and run C, C++, Python, Java, TypeScript, and more in one place.",
      icon: <Languages className="h-6 w-6" />,
    },
    {
      title: "Community Snippets",
      description:
        "Explore, fork, and share reusable code snippets with other developers.",
      icon: <BookMarked className="h-6 w-6" />,
    },
    {
      title: "User Profiles",
      description:
        "Showcase your skills and projects with personalized developer profiles.",
      icon: <UserRound className="h-6 w-6" />,
    },
    {
      title: "Save & Download",
      description:
        "Save your code, download projects locally, and never lose progress.",
      icon: <Download className="h-6 w-6" />,
    },
    {
      title: "One-Click Sharing",
      description:
        "Share your code via unique links and collaborate seamlessly.",
      icon: <Share2 className="h-6 w-6" />,
    },
    {
      title: "Fast & Reliable",
      description:
        "Enjoy a smooth, snappy coding experience with minimal latency.",
      icon: <Zap className="h-6 w-6" />,
    },
    {
      title: "Secure & Private",
      description:
        "Your code is protected with top-grade security and privacy measures.",
      icon: <ShieldCheck className="h-6 w-6" />,
    },
    {
      title: "CRUD Code",
      description:
        "Track your activity, snippet usage, and performance insights.",
      icon: <LineChart className="h-6 w-6" />,
    },
  ];

  return (
    <section id="features" className="relative py-20 md:py-32">
      <div className="absolute inset-0 bg-black"></div>

      <div className="container relative px-4 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-transparent bg-clip-text bg-linear-to-r from-[#67BCFF] via-[#9C9EFF] to-[#CB86FF] mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            Powerful Features
          </h2>
          <p className="mb-16 text-lg text-gray-400">
            Everything you need to write, preview, and share code—packed in one
            place.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative flex flex-col rounded-2xl border border-gray-800 bg-gray-900/60 p-6 backdrop-blur-md transition-all hover:border-purple-500/50 hover:bg-gray-800/60 hover:shadow-lg hover:shadow-purple-500/20"
            >
              <div className="absolute -top-3 -left-3 flex h-8 w-8 items-center justify-center rounded-full bg-purple-400 text-black text-sm font-bold shadow-md">
                {String(index + 1).padStart(2)}
              </div>

              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-r from-[#67BCFF] via-[#9C9EFF] to-[#CB86FF] text-white shadow-md">
                {feature.icon}
              </div>

              <h3 className="mb-2 text-lg font-semibold text-white">
                {feature.title}
              </h3>

              <p className="text-sm text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
