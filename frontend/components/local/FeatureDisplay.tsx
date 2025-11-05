"use client";

import Image from "next/image";
import { useState } from "react";

const data = [
  {
    heading: "GENERATE QUIZ",
    value: "generate",
    title: "Create Smart Quizzes in Seconds",
    description:
      "Turn any idea or topic into a ready-to-use quiz instantly. Just type a prompt, choose difficulty, and let AI handle the rest, questions, options, and answers, all generated for you.",
    src: "/images/generate.webp",
  },
  {
    heading: "HOST & SHARE",
    value: "host",
    title: "Host Live Quizzes Effortlessly",
    description:
      "Launch your quiz for participants in one click. Share links publicly or privately, and watch responses update live — no setup, no hassle.",
    src: "/images/host.webp",
  },
  {
    heading: "REAL-TIME ATTEMPTS",
    value: "attempts",
    title: "Track Every Attempt in Real Time",
    description:
      "Monitor who’s taking your quiz and how they perform. Get instant scores, analytics, and insights to see top performers and participation trends.",
    src: "/images/attempts.webp",
  },
  //   {
  //     heading: "SECURE & FAIR",
  //     value: "security",
  //     title: "Keep Quizzes Private and Protected",
  //     description:
  //       "Only you can access results for your quizzes. Participants can view only their own attempts — ensuring privacy and fairness for everyone.",
  //     src: "/images/security.webp",
  //   },
  //   {
  //     heading: "ANALYTICS & PERFORMANCE",
  //     value: "analytics",
  //     title: "Visualize Results with Smart Analytics",
  //     description:
  //       "Get a clear picture of overall performance through automatic ranking, scoring breakdowns, and participant comparisons — all in one dashboard.",
  //     src: "/images/analytics.webp",
  //   },
];

export default function FeatureDisplay() {
  const [active, setActive] = useState(0);
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="bg-background p-2 flex flex-row gap-1 rounded  mb-3">
        {data.map((d, i) => (
          <div
            key={d.value}
            onClick={() => setActive(i)}
            className={`font-mono font-semibold ${
              active === i ? "bg-primary/40" : "bg-background"
            } hover:bg-foreground/20 text-lg text-foreground/70 p-2 rounded uppercase`}
          >
            {d.heading}
          </div>
        ))}
      </div>
      <div className="p-5 rounded  w-full flex flex-col sm:flex-row ">
        <div className="rounded-t sm:rounded-l bg-background/10 flex flex-col gap-5 p-10 pr-7 text-background font-anton tracking-wider">
          <p className="text-3xl">{data[active].title}</p>
          <p className="font-sans leading-7 w-full max-w-[350px]">
            {data[active].description}
          </p>
        </div>
        <div>
          <Image
            className="rounded w-full"
            src={data[active].src}
            alt={data[active].value}
            height={500}
            width={500}
          />
        </div>
      </div>
      ;
    </div>
  );
}
