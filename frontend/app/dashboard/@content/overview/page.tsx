"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A line chart with dots";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export default function page() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="flex flex-col gap-5 bg-green-400/30 p-5  rounded text-sm sm:text-base">
          <div className="bg-card rounded font-mono p-4 max-w-[200px] flex-1">
            <p className="text-foreground/40">GENERATED</p>
            <p className="text-green-800 text-2xl">50</p>
          </div>
          <div className="bg-card rounded font-mono p-4 max-w-[200px] flex-1">
            <p className="text-foreground/40">PARTICIPATED</p>
            <p className="text-green-800 text-2xl">12</p>
          </div>
        </div>
        <div className="w-full">
          <ChartLineDots />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="w-full font-mono flex flex-col gap-3 p-5">
          <p className="text-foreground/60 uppercase">Generated Quizes</p>
          <div className="flex flex-col gap-1 max-h-[40vh] overflow-y-auto">
            <div className="p-3 bg-card border-1 border-border/20  rounded-sm flex flex-col  ">
              <p className="text-foreground/50">Operating System</p>
              <div className="w-full flex flex-row gap-2">
                <p className="text-foreground/50 text-sm">10 OCT, 2025</p>
                <p className="text-foreground/50 text-sm">12:30 PM</p>
              </div>
            </div>
            <div className="p-3 bg-card border-1 border-border/20  rounded-sm flex flex-col  ">
              <p className="text-foreground/50">Operating System</p>
              <div className="w-full flex flex-row gap-2">
                <p className="text-foreground/50 text-sm">10 OCT, 2025</p>
                <p className="text-foreground/50 text-sm">12:30 PM</p>
              </div>
            </div>
            <div className="p-3 bg-card border-1 border-border/20  rounded-sm flex flex-col  ">
              <p className="text-foreground/50">Operating System</p>
              <div className="w-full flex flex-row gap-2">
                <p className="text-foreground/50 text-sm">10 OCT, 2025</p>
                <p className="text-foreground/50 text-sm">12:30 PM</p>
              </div>
            </div>
            <div className="p-3 bg-card border-1 border-border/20  rounded-sm flex flex-col  ">
              <p className="text-foreground/50">Operating System</p>
              <div className="w-full flex flex-row gap-2">
                <p className="text-foreground/50 text-sm">10 OCT, 2025</p>
                <p className="text-foreground/50 text-sm">12:30 PM</p>
              </div>
            </div>
            <div className="p-3 bg-card border-1 border-border/20  rounded-sm flex flex-col  ">
              <p className="text-foreground/50">Operating System</p>
              <div className="w-full flex flex-row gap-2">
                <p className="text-foreground/50 text-sm">10 OCT, 2025</p>
                <p className="text-foreground/50 text-sm">12:30 PM</p>
              </div>
            </div>
            <div className="p-3 bg-card border-1 border-border/20  rounded-sm flex flex-col  ">
              <p className="text-foreground/50">Operating System</p>
              <div className="w-full flex flex-row gap-2">
                <p className="text-foreground/50 text-sm">10 OCT, 2025</p>
                <p className="text-foreground/50 text-sm">12:30 PM</p>
              </div>
            </div>
            <div className="p-3 bg-card border-1 border-border/20  rounded-sm flex flex-col  ">
              <p className="text-foreground/50">Operating System</p>
              <div className="w-full flex flex-row gap-2">
                <p className="text-foreground/50 text-sm">10 OCT, 2025</p>
                <p className="text-foreground/50 text-sm">12:30 PM</p>
              </div>
            </div>
            <div className="p-3 bg-card border-1 border-border/20  rounded-sm flex flex-col  ">
              <p className="text-foreground/50">Operating System</p>
              <div className="w-full flex flex-row gap-2">
                <p className="text-foreground/50 text-sm">10 OCT, 2025</p>
                <p className="text-foreground/50 text-sm">12:30 PM</p>
              </div>
            </div>
            <div className="p-3 bg-card border-1 border-border/20  rounded-sm flex flex-col  ">
              <p className="text-foreground/50">Operating System</p>
              <div className="w-full flex flex-row gap-2">
                <p className="text-foreground/50 text-sm">10 OCT, 2025</p>
                <p className="text-foreground/50 text-sm">12:30 PM</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full font-mono flex flex-col gap-3 p-5">
          <p className="text-foreground/60 uppercase">Participated Quizes</p>
          <div className="flex flex-col gap-1 max-h-[40vh] overflow-y-auto">
            <div className="p-3 bg-card border-1 border-border/20  rounded-sm flex flex-col  ">
              <p className="text-foreground/50">Operating System</p>
              <div className="w-full flex flex-row gap-2">
                <p className="text-foreground/50 text-sm">10 OCT, 2025</p>
                <p className="text-foreground/50 text-sm">12:30 PM</p>
              </div>
            </div>
            <div className="p-3 bg-card border-1 border-border/20  rounded-sm flex flex-col  ">
              <p className="text-foreground/50">Operating System</p>
              <div className="w-full flex flex-row gap-2">
                <p className="text-foreground/50 text-sm">10 OCT, 2025</p>
                <p className="text-foreground/50 text-sm">12:30 PM</p>
              </div>
            </div>
            <div className="p-3 bg-card border-1 border-border/20  rounded-sm flex flex-col  ">
              <p className="text-foreground/50">Operating System</p>
              <div className="w-full flex flex-row gap-2">
                <p className="text-foreground/50 text-sm">10 OCT, 2025</p>
                <p className="text-foreground/50 text-sm">12:30 PM</p>
              </div>
            </div>
            <div className="p-3 bg-card border-1 border-border/20  rounded-sm flex flex-col  ">
              <p className="text-foreground/50">Operating System</p>
              <div className="w-full flex flex-row gap-2">
                <p className="text-foreground/50 text-sm">10 OCT, 2025</p>
                <p className="text-foreground/50 text-sm">12:30 PM</p>
              </div>
            </div>
            <div className="p-3 bg-card border-1 border-border/20  rounded-sm flex flex-col  ">
              <p className="text-foreground/50">Operating System</p>
              <div className="w-full flex flex-row gap-2">
                <p className="text-foreground/50 text-sm">10 OCT, 2025</p>
                <p className="text-foreground/50 text-sm">12:30 PM</p>
              </div>
            </div>
            <div className="p-3 bg-card border-1 border-border/20  rounded-sm flex flex-col  ">
              <p className="text-foreground/50">Operating System</p>
              <div className="w-full flex flex-row gap-2">
                <p className="text-foreground/50 text-sm">10 OCT, 2025</p>
                <p className="text-foreground/50 text-sm">12:30 PM</p>
              </div>
            </div>
            <div className="p-3 bg-card border-1 border-border/20  rounded-sm flex flex-col  ">
              <p className="text-foreground/50">Operating System</p>
              <div className="w-full flex flex-row gap-2">
                <p className="text-foreground/50 text-sm">10 OCT, 2025</p>
                <p className="text-foreground/50 text-sm">12:30 PM</p>
              </div>
            </div>
            <div className="p-3 bg-card border-1 border-border/20  rounded-sm flex flex-col  ">
              <p className="text-foreground/50">Operating System</p>
              <div className="w-full flex flex-row gap-2">
                <p className="text-foreground/50 text-sm">10 OCT, 2025</p>
                <p className="text-foreground/50 text-sm">12:30 PM</p>
              </div>
            </div>
            <div className="p-3 bg-card border-1 border-border/20  rounded-sm flex flex-col  ">
              <p className="text-foreground/50">Operating System</p>
              <div className="w-full flex flex-row gap-2">
                <p className="text-foreground/50 text-sm">10 OCT, 2025</p>
                <p className="text-foreground/50 text-sm">12:30 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChartLineDots() {
  return (
    <Card className="rounded-md max-w-[500px] font-mono border-0">
      <CardHeader>
        <p className="text-foreground/60 uppercase">Performance</p>
        <CardDescription className="text-foreground/40">
          January - June 2024
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="desktop"
              type="natural"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-desktop)",
              }}
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter> */}
    </Card>
  );
}
