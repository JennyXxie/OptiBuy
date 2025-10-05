"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export interface DynamicPriceRow { [key: string]: string | number | undefined }

interface PriceChartProps {
  data: DynamicPriceRow[]
  productName: string
}

export function PriceChart({ data, productName }: PriceChartProps) {
  const formatPrice = (value: number) => `$${value.toFixed(2)}`
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    })
  }

  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Price History - {productName}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">No price history available yet.</div>
        </CardContent>
      </Card>
    )
  }

  // Determine platform keys (all keys except 'date')
  const allKeys = Object.keys(data[0]).filter(k => k !== 'date')

  // Compute best price on the most recent row
  const lastRow = data[data.length - 1]
  const lastPrices = allKeys
    .map(key => ({ key, value: typeof lastRow[key] === 'number' ? (lastRow[key] as number) : Number.NaN }))
    .filter(p => Number.isFinite(p.value))
  const bestEntry = lastPrices.length > 0 ? lastPrices.reduce((min, p) => (p.value < min.value ? p : min)) : { key: 'N/A', value: 0 }

  // Compute 30d change per platform
  const monthAgoRow = data[Math.max(0, data.length - 30)]
  const changes = allKeys.map(key => {
    const current = typeof lastRow[key] === 'number' ? (lastRow[key] as number) : Number.NaN
    const prev = typeof monthAgoRow[key] === 'number' ? (monthAgoRow[key] as number) : current
    return { key, change: current - prev, current }
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Price History - {productName}</CardTitle>
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <span>Historical data</span>
          <span>•</span>
          <span className="text-green-600">
            Best price: {bestEntry.key} at {formatPrice((bestEntry.value as number) || 0)}
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
                  name
                ]}
              />
              <Legend />
              {allKeys.map((key, idx) => (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={["#FF9900", "#4ECDC4", "#FF6B6B", "#5B8DEF", "#E17CFD"][idx % 5]}
                  strokeWidth={2}
                  dot={false}
                  name={key}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
        {changes.length > 0 && (
          <div className="grid grid-cols-3 gap-4 mt-6">
            {changes.slice(0, 3).map(({ key, change, current }) => (
              <div key={key} className="text-center p-3 bg-muted/50 rounded-lg">
                <div className="text-lg font-semibold">{Number.isFinite(current as number) ? formatPrice(current as number) : '—'}</div>
                <div className="text-sm text-muted-foreground">{key}</div>
                {Number.isFinite(change as number) && (
                  <div className={`text-xs ${((change as number) >= 0) ? 'text-red-500' : 'text-green-500'}`}>
                    {((change as number) >= 0) ? '+' : ''}{formatPrice(Math.abs(change as number))} (30d)
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
