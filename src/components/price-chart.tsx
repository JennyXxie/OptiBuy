"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PriceData {
  date: string;
  amazon: number;
  temu: number;
  shein: number;
}

interface PriceChartProps {
  data?: PriceData[];
  productName: string;
}

// 🧩 Generate demo data (remove this once real DB data is ready)
const generateMockData = (): PriceData[] => {
  const data: PriceData[] = [];
  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - 6); // 6 months ago

  for (let i = 0; i < 180; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);

    const baseAmazon = 89.99 + Math.sin(i * 0.02) * 10 + Math.random() * 5;
    const baseTemu = 45.99 + Math.sin(i * 0.03) * 8 + Math.random() * 3;
    const baseShein = 52.99 + Math.sin(i * 0.025) * 6 + Math.random() * 4;

    data.push({
      date: date.toISOString().split("T")[0],
      amazon: Math.round(baseAmazon * 100) / 100,
      temu: Math.round(baseTemu * 100) / 100,
      shein: Math.round(baseShein * 100) / 100,
    });
  }

  return data;
};

export function PriceChart({
  data = generateMockData(),
  productName = "Sample Product",
}: PriceChartProps) {
  const formatPrice = (value: number) => `$${value.toFixed(2)}`;
  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

  // 🧠 Calculate trends
  const current = data[data.length - 1];
  const thirtyDaysAgo = data[Math.max(0, data.length - 30)];

  const changes = {
    amazon: current.amazon - thirtyDaysAgo.amazon,
    temu: current.temu - thirtyDaysAgo.temu,
    shein: current.shein - thirtyDaysAgo.shein,
  };

  const getBestPrice = () => {
    const prices = [current.amazon, current.temu, current.shein];
    const platforms = ["amazon", "temu", "shein"];
    const minPrice = Math.min(...prices);
    const bestPlatform = platforms[prices.indexOf(minPrice)];
    return { platform: bestPlatform, price: minPrice };
  };

  const best = getBestPrice();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Price History — {productName}</CardTitle>
        <div className="flex items-center space-x-3 text-sm text-muted-foreground">
          <span>6 months of data</span>
          <span>•</span>
          <span className="text-green-600">
            Best price: {best.platform} at {formatPrice(best.price)}
          </span>
        </div>
      </CardHeader>

      <CardContent>
        {/* 📈 Chart */}
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis
                dataKey="date"
                tickFormatter={formatDate}
                tick={{ fontSize: 12 }}
                interval="preserveStartEnd"
              />
              <YAxis
                tickFormatter={formatPrice}
                tick={{ fontSize: 12 }}
                width={70}
              />
              <Tooltip
                labelFormatter={(date) => formatDate(date)}
                formatter={(value: number, name: string) => [
                  formatPrice(value),
                  name.charAt(0).toUpperCase() + name.slice(1),
                ]}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="amazon"
                stroke="#FF9900"
                strokeWidth={2}
                dot={false}
                name="Amazon"
              />
              <Line
                type="monotone"
                dataKey="temu"
                stroke="#FF6B6B"
                strokeWidth={2}
                dot={false}
                name="Temu"
              />
              <Line
                type="monotone"
                dataKey="shein"
                stroke="#4ECDC4"
                strokeWidth={2}
                dot={false}
                name="Shein"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* 💰 Quick price summary */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          {(["amazon", "temu", "shein"] as const).map((platform) => (
            <div
              key={platform}
              className="text-center p-3 bg-muted/50 rounded-lg transition-colors hover:bg-muted"
            >
              <div className="text-lg font-semibold">
                {formatPrice(current[platform])}
              </div>
              <div className="text-sm text-muted-foreground capitalize">
                {platform}
              </div>
              <div
                className={`text-xs ${
                  changes[platform] >= 0 ? "text-red-500" : "text-green-500"
                }`}
              >
                {changes[platform] >= 0 ? "+" : ""}
                {formatPrice(changes[platform])} (30d)
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
