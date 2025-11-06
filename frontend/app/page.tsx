import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import FeatureDisplay from "@/components/local/FeatureDisplay";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-background tracking-tighter">
      <section className="min-h-screen flex flex-col gap-5 items-center justify-center relative">
        <div className="flex flex-col gap-5 z-1">
          <h1 className="text-6xl md:text-8xl  text-center heading-bold tracking-wide">
            AI QUIZER
          </h1>
          <p className="text-center  text-[22px] leading-7 max-w-[700px] font-mono">
            Create AI-powered quizes in seconds. <br /> Challenge. Compete.
            Conquer.
          </p>

          <Link
            href={"/quiz/generate"}
            className="mx-auto max-w-[300px] w-full relative z-10 "
          >
            <Button
              className="shadow-xl w-full max-w-[300px] font-mono font-semibold cursor-pointer bg-radial transition-all duration-75 hover:border-b-1 border-b-4 border-border/20 bg-[#2eff9b] hover:bg-[#2eff9b]/80 text-black rounded-full h-12 
            "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                role="img"
                aria-label="svg of generating quiz"
              >
                <path
                  fillRule="evenodd"
                  d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="tracking-wider">Generate Quiz</p>
            </Button>
          </Link>
        </div>
        <div className="rounded-lg mt-5 flex flex-row gap-3 flex-wrap sm:flex-nowrap justify-center sm:justify-start">
          <div className="w-[150px] -rotate-12 shadow-md translate-x-5 flex flex-col gap-4 bg-card border-1 border-border/30 p-2  h-full rounded-[15px]">
            <div>
              <p className="font-semibold text-sm text-gray-400 tracking-wider font-mono">
                SCORE
              </p>
              <div className="flex flex-row gap-2 items-end">
                <p className="text-3xl font-bold text-[#878784]">30</p>
                <p className="text-gray-400">/ 30</p>
              </div>
            </div>
            <div className="text-sm rounded-md p-2 px-0 text-zinc-400  ">
              You've done outstanding!
            </div>
          </div>

          <div className="w-[150px] flex sm:-mt-5 rotate-12 sm:rotate-none shadow-md flex-col gap-4 bg-card border-1 border-border/30 p-2  h-full rounded-[15px]">
            <div>
              <p className="font-semibold text-sm text-gray-400 tracking-wider font-mono">
                ATTENDED
              </p>
              <div className="flex flex-row gap-2 items-end">
                <p className="text-3xl font-bold text-[#878784]">19</p>
                {/* <p className="text-gray-400">/ 30</p> */}
              </div>
            </div>
            <div className="text-sm rounded-md p-2 px-0 text-zinc-400  ">
              So many more to gooo!
            </div>
          </div>

          <div className="w-[150px] sm:rotate-12 sm:-translate-x-5 -translate-y-5 sm:translate-y-0 shadow-md flex flex-col gap-4 bg-card border-1 border-border/30 p-2  h-full rounded-[15px]">
            <div>
              <p className="font-semibold text-sm text-gray-400 tracking-wider font-mono">
                GENERATED
              </p>
              <div className="flex flex-row gap-2 items-end">
                <p className="text-3xl font-bold text-[#878784]">16</p>
              </div>
            </div>
            <div className="text-sm rounded-md p-2 px-0 text-zinc-400  ">
              Never stop quizzing!
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-foreground py-20 items-center flex flex-col gap-5">
        <div className="max-w-[500px] mx-auto">
          <h1 className="text-6xl font-anton text-background text-center">
            EVERYTHING YOU NEED TO TEST
          </h1>
        </div>
        <div className="p-2 mx-auto ">
          <FeatureDisplay />
        </div>
      </section>
    </main>
  );
}
