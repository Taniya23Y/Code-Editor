import { Check, X } from "lucide-react";

export default function ComparisonTable() {
  const features = [
    { name: "HTML, CSS, JavaScript Editor", ours: true, others: true },
    { name: "Save & Download Code", ours: true, others: true },
    { name: "Share Code Snippets", ours: true, others: false },
    { name: "Real-time Collaboration", ours: true, others: false },
    { name: "Community Access", ours: true, others: false },
    { name: "Multiple Language Support", ours: true, others: true },
    { name: "Custom Code Templates", ours: true, others: false },
    { name: "Priority Support", ours: true, others: false },
  ];

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-gray-950 via-gray-900 to-gray-950"></div>

      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-purple-500 to-transparent opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-purple-500 to-transparent opacity-30"></div>

      <div className="container relative px-4 md:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-purple-400 font-medium mb-2">Why Choose Us?</p>
          <h2 className="text-3xl bg-linear-to-r from-[#67BCFF] via-[#9C9EFF] to-[#CB86FF] bg-clip-text text-transparent md:text-4xl font-bold mb-6">
            Code.Compiler vs Other Platforms
          </h2>
          <p className="text-gray-400 text-lg">
            Unlike other editors that lock features behind paywalls,{" "}
            <span className="text-white font-semibold">Code.Compiler</span>{" "}
            gives you everything for{" "}
            <span className="text-purple-400">free</span>.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="overflow-x-auto scrollbar-hide">
            <div className="min-w-150">
              {/* Table header */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="col-span-1"></div>
                <div className="col-span-1 text-center">
                  <div className="font-bold text-xl mb-2 text-purple-400">
                    Code.Compiler
                  </div>
                  <div className="text-sm text-gray-400">100% Free Forever</div>
                </div>
                <div className="col-span-1 text-center">
                  <div className="font-bold text-xl mb-2 text-gray-300">
                    Other Platforms
                  </div>
                  <div className="text-sm text-gray-400">Paid / Limited</div>
                </div>
              </div>

              {/* Table body */}
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-3 gap-4 py-4 border-t border-gray-800"
                  >
                    <div className="col-span-1 flex items-center font-medium text-gray-200">
                      {feature.name}
                    </div>
                    <div className="col-span-1 flex justify-center items-center">
                      {feature.ours ? (
                        <Check className="h-5 w-5 text-purple-400" />
                      ) : (
                        <X className="h-5 w-5 text-gray-600" />
                      )}
                    </div>
                    <div className="col-span-1 flex justify-center items-center">
                      {feature.others ? (
                        <Check className="h-5 w-5 text-gray-400" />
                      ) : (
                        <X className="h-5 w-5 text-gray-600" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
