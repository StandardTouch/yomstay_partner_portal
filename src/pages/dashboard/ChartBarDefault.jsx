"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A bar chart";

const chartData = [
  { name: "New-Booking", value: 800 },
  { name: "Schedule-Room", value: 700 },
  { name: "Check-in", value: 400 },
  { name: "Check-out", value: 780 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--bg)",
  },
};

export function ChartBarDefault() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold ">Booking Chart</CardTitle>
        <CardDescription>Details</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            className="p-8"
          >
            <CartesianGrid />
            <XAxis type="number" className="font-semibold" />
            <YAxis dataKey="name" className="font-semibold" type="category" />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey="value" fill="var(--color-desktop)" radius={8} />
          </BarChart>
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
