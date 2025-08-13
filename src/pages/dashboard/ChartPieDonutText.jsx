"use client";

import * as React from "react";
import { PieChart, Pie, Label } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A donut chart with text";

const chartData = [
  { browser: "Confirmed", visitors: 100, fill: "#008236" },
  { browser: "Pending", visitors: 43, fill: "#fe9a00" },
  { browser: "Cancelled", visitors: 15, fill: "#fb2c36" },
];

const chartConfig = {
  visitors: { label: "Visitors" },
  Confirmed: { label: "Confirmed" },
  Pending: { label: "Pending" },
  Cancelled: { label: "Cancelled" },
};

export function ChartPieDonutText() {
  const totalVisitors = React.useMemo(
    () => chartData.reduce((acc, curr) => acc + curr.visitors, 0),
    []
  );

  return (
    <div>
      <Card className="flex flex-col w-full h-full ">
        <CardHeader className="items-center pb-0">
          <CardTitle className="text-xl font-semibold ">
            Booking Chart
          </CardTitle>
          {/* <CardDescription>January - June 2024</CardDescription> */}
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className="h-[250px] w-full mx-auto"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="visitors"
                nameKey="browser"
                innerRadius={80}
                outerRadius={120}
                stroke="transparent"
                isAnimationActive={false}
              >
                <Label
                  position="center"
                  content={({ viewBox }) => {
                    if (!(viewBox && "cx" in viewBox && "cy" in viewBox))
                      return null;
                    const { cx, cy } = viewBox;
                    return (
                      <g>
                        <text
                          x={cx}
                          y={cy - 4}
                          textAnchor="middle"
                          dominantBaseline="central"
                          fill="#ffffff" // <-- explicit fill (white)
                          fontSize="20"
                          fontWeight="700"
                        >
                          {totalVisitors.toLocaleString()}
                        </text>
                        <text
                          x={cx}
                          y={cy + 18}
                          textAnchor="middle"
                          dominantBaseline="central"
                          fill="#cbd5e1" // <-- light gray
                          fontSize="12"
                          className="uppercase z-30"
                        >
                          Visitors
                        </text>
                      </g>
                    );
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="text-muted-foreground leading-none">
            Showing total visitors
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
