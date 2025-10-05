"use client"

import { useState } from "react"
import Image from "next/image"
import { Bell, Plus, Trash2, TrendingDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'

interface Alert {
  id: string
  alertName: string
  productLink: string
  currentPrice: number
  isActive: boolean
  createdAt: Date
  priceHistory?: { date: string; price: number }[]
}

const mockAlerts: Alert[] = [
  {
    id: "1",
    alertName: "Wireless Headphone Alert",
    productLink: "https://www.amazon.com/dp/B0BP9LHL3P",
    currentPrice: 89.99,
    isActive: true,
    createdAt: new Date("2024-01-15"),
    priceHistory: [
      { date: "2024-01-15", price: 95.00 },
      { date: "2024-02-15", price: 92.50 },
      { date: "2024-03-15", price: 90.00 },
      { date: "2024-04-15", price: 89.99 },
      { date: "2024-05-15", price: 87.50 },
      { date: "2024-06-15", price: 85.00 },
    ],
  },
  {
    id: "2",
    alertName: "Fitness Tracker Alert",
    productLink: "https://www.temu.com/goods/6010000000000000.html",
    currentPrice: 129.99,
    isActive: true,
    createdAt: new Date("2024-01-10"),
    priceHistory: [
      { date: "2024-01-10", price: 135.00 },
      { date: "2024-02-10", price: 132.00 },
      { date: "2024-03-10", price: 130.00 },
      { date: "2024-04-10", price: 129.99 },
      { date: "2024-05-10", price: 128.00 },
      { date: "2024-06-10", price: 125.00 },
    ],
  },
  {
    id: "3",
    alertName: "Phone Charger Alert",
    productLink: "https://www.shein.com/Portable-Charger-p-1234567.html",
    currentPrice: 29.99,
    isActive: false,
    createdAt: new Date("2024-01-05"),
    priceHistory: [
      { date: "2024-01-05", price: 32.00 },
      { date: "2024-02-05", price: 31.00 },
      { date: "2024-03-05", price: 30.00 },
      { date: "2024-04-05", price: 29.99 },
      { date: "2024-05-05", price: 28.00 },
      { date: "2024-06-05", price: 27.00 },
    ],
  },
]

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [openChartId, setOpenChartId] = useState<string | null>(null)
  const [newAlert, setNewAlert] = useState({
    productLink: "",
    alertName: "",
  })

  const handleCreateAlert = () => {
    if (!newAlert.productLink || !newAlert.alertName) return

    const alert: Alert = {
      id: Date.now().toString(),
      alertName: newAlert.alertName,
      productLink: newAlert.productLink,
      currentPrice: Math.random() * 100 + 20,
      isActive: true,
      createdAt: new Date(),
    }

    setAlerts(prev => [alert, ...prev])
    setNewAlert({ productLink: "", alertName: "" })
    setIsDialogOpen(false)
  }

  const handleDeleteAlert = (id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id))
  }

  const formatPrice = (price: number) => `$${price.toFixed(2)}`
  const getSavingsNeeded = (current: number, target: number) => current - target

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Image 
              src="/logo.png" 
              alt="OptiBuy Logo" 
              width={32} 
              height={32}
              className="h-8 w-8 object-contain"
            />
            <Bell className="h-8 w-8 text-primary" />
            Price Alerts
          </h1>
          <p className="text-muted-foreground mt-2">
            Get notified when prices drop to your target amount
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Alert
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Price Alert</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Product Link</label>
                <Input
                  placeholder="Enter product link"
                  value={newAlert.productLink}
                  onChange={(e) => setNewAlert(prev => ({ ...prev, productLink: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Alert Name</label>
                <Input
                  placeholder="Enter alert name"
                  value={newAlert.alertName}
                  onChange={(e) => setNewAlert(prev => ({ ...prev, alertName: e.target.value }))}
                />
              </div>
              <Button onClick={handleCreateAlert} className="w-full">
                Create Alert
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold">Your Alerts</h2>
          {alerts.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No alerts yet</h3>
                <p className="text-muted-foreground mb-4">
                  Create your first price alert to get notified when prices drop
                </p>
                <Button onClick={() => setIsDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Alert
                </Button>
              </CardContent>
            </Card>
          ) : (
            alerts.map((alert) => (
              <Card key={alert.id} className="cursor-pointer" onClick={() => setOpenChartId(openChartId === alert.id ? null : alert.id)}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">{alert.alertName}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Link: <a href={alert.productLink} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{alert.productLink.substring(0, 30)}...</a></span>
                        <span>•</span>
                        <span>Created: {alert.createdAt.toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">
                        {formatPrice(alert.currentPrice)}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 ml-4">
                      <Badge variant={alert.isActive ? "default" : "secondary"}>
                        {alert.isActive ? "Active" : "Paused"}
                      </Badge>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeleteAlert(alert.id)
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  {openChartId === alert.id && alert.priceHistory && (
                    <div className="mt-4 h-48">
                      <h4 className="text-lg font-semibold mb-2">Price History</h4>
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={alert.priceHistory}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
                          <Line type="monotone" dataKey="price" stroke="#8884d8" activeDot={{ r: 8 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingDown className="h-5 w-5" />
                Quick Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {alerts.filter(a => a.isActive).length}
                </div>
                <div className="text-sm text-muted-foreground">Active Alerts</div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>How it works</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <span>Paste a product link to create an alert</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <span>We monitor prices across all platforms</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <span>Get instant notifications when prices drop by 10% or more</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <span>Never miss a great deal again!</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
