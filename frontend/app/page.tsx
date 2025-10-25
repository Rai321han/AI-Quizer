import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-background tracking-tighter">
      <section className="min-h-screen flex flex-col gap-5 items-center justify-center relative">
        <div className="flex flex-col gap-5 z-1">
          <h1 className="text-6xl md:text-8xl font-bold text-center ">
            AI QUIZER
          </h1>
          <p className="text-center  text-[22px] leading-7 max-w-[700px]">
            Create AI-powered quizzes in seconds. <br /> Challenge. Compete.
            Conquer.
          </p>

          <Link
            href={"/quiz/generate"}
            className="mx-auto max-w-[300px] w-full relative z-10 "
          >
            <Button className="shadow-xl w-full max-w-[300px] cursor-pointer bg-radial border-2 border-border from-[#a083f7] to-[#150349] rounded-full h-12 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="tracking-wider">Generate Quiz</p>
            </Button>
            <div className="bg-[#8c6cee] absolute max-w-[200px] animate-pulse blur-3xl -z-10 h-13 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-full"></div>
          </Link>
        </div>
        <div className="p-2  rounded-lg mt-5 flex flex-row gap-3">
          <div className="w-[150px] -rotate-12 shadow-md translate-x-5 flex flex-col gap-4 bg-card border-1 border-border p-2  h-full rounded-md">
            <div>
              <p className="font-semibold text-sm text-gray-400 tracking-wider">
                SCORE
              </p>
              <div className="flex flex-row gap-2 items-end">
                <p className="text-3xl font-bold text-green-600/60">30</p>
                <p className="text-gray-400">/ 30</p>
              </div>
            </div>
            <div className="text-sm rounded-md p-2 text-zinc-400  ">
              You've done outstanding!
            </div>
          </div>

          <div className="w-[150px] flex -mt-5 shadow-md flex-col gap-4 bg-card border-1 border-border p-2  h-full rounded-md">
            <div>
              <p className="font-semibold text-sm text-gray-400 tracking-wider">
                ATTENDED
              </p>
              <div className="flex flex-row gap-2 items-end">
                <p className="text-3xl font-bold text-green-600/60">19</p>
                {/* <p className="text-gray-400">/ 30</p> */}
              </div>
            </div>
            <div className="text-sm rounded-md p-2 text-zinc-400  ">
              So many more to gooo!
            </div>
          </div>

          <div className="w-[150px] rotate-12 -translate-x-5 shadow-md flex flex-col gap-4 bg-card border-1 border-border p-2  h-full rounded-md">
            <div>
              <p className="font-semibold text-sm text-gray-400 tracking-wider">
                GENERATED
              </p>
              <div className="flex flex-row gap-2 items-end">
                <p className="text-3xl font-bold text-green-600/60">16</p>
              </div>
            </div>
            <div className="text-sm rounded-md p-2 text-zinc-400  ">
              Never stop quizzing!
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
