"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface PriceData {
  date: string
  amazon: number
  temu: number
  shein: number
}

interface PriceChartProps {
  data: PriceData[]
  productName: string
}

// Generate mock data for demonstration
const generateMockData = (): PriceData[] => {
  const data: PriceData[] = []
  const startDate = new Date()
  startDate.setMonth(startDate.getMonth() - 6) // 6 months ago

  for (let i = 0; i < 180; i++) {
    const date = new Date(startDate)
    date.setDate(date.getDate() + i)
    
    // Simulate realistic price fluctuations
    const baseAmazon = 89.99 + Math.sin(i * 0.02) * 10 + Math.random() * 5
    const baseTemu = 45.99 + Math.sin(i * 0.03) * 8 + Math.random() * 3
    const baseShein = 52.99 + Math.sin(i * 0.025) * 6 + Math.random() * 4

    data.push({
      date: date.toISOString().split('T')[0],
      amazon: Math.round(baseAmazon * 100) / 100,
      temu: Math.round(baseTemu * 100) / 100,
      shein: Math.round(baseShein * 100) / 100,
    })
  }

  return data
}

export function PriceChart({ data = generateMockData(), productName = "Sample Product" }: PriceChartProps) {
  const formatPrice = (value: number) => `$${value.toFixed(2)}`
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    })
  }

  // Calculate price trends
  const currentPrices = data[data.length - 1]
  const previousPrices = data[Math.max(0, data.length - 30)] // 30 days ago
  
  const amazonChange = currentPrices.amazon - previousPrices.amazon
  const temuChange = currentPrices.temu - previousPrices.temu
  const sheinChange = currentPrices.shein - previousPrices.shein

  const getBestPrice = () => {
    const prices = [currentPrices.amazon, currentPrices.temu, currentPrices.shein]
    const minPrice = Math.min(...prices)
    const platforms = ['amazon', 'temu', 'shein']
    const bestPlatform = platforms[prices.indexOf(minPrice)]
    return { platform: bestPlatform, price: minPrice }
  }

  const bestPrice = getBestPrice()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Price History - {productName}</CardTitle>
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <span>6 months of data</span>
          <span>•</span>
          <span className="text-green-600">
            Best price: {bestPrice.platform} at {formatPrice(bestPrice.price)}
          </span>
        </div>
      </CardHeader>
      <CardContent>
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
              />
              <Tooltip 
                labelFormatter={(date) => formatDate(date)}
                formatter={(value: number, name: string) => [
                  formatPrice(value), 
                  name.charAt(0).toUpperCase() + name.slice(1)
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
        
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="text-lg font-semibold">{formatPrice(currentPrices.amazon)}</div>
            <div className="text-sm text-muted-foreground">Amazon</div>
            <div className={`text-xs ${amazonChange >= 0 ? 'text-red-500' : 'text-green-500'}`}>
              {amazonChange >= 0 ? '+' : ''}{formatPrice(amazonChange)} (30d)
            </div>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="text-lg font-semibold">{formatPrice(currentPrices.temu)}</div>
            <div className="text-sm text-muted-foreground">Temu</div>
            <div className={`text-xs ${temuChange >= 0 ? 'text-red-500' : 'text-green-500'}`}>
              {temuChange >= 0 ? '+' : ''}{formatPrice(temuChange)} (30d)
            </div>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="text-lg font-semibold">{formatPrice(currentPrices.shein)}</div>
            <div className="text-sm text-muted-foreground">Shein</div>
            <div className={`text-xs ${sheinChange >= 0 ? 'text-red-500' : 'text-green-500'}`}>
              {sheinChange >= 0 ? '+' : ''}{formatPrice(sheinChange)} (30d)
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
