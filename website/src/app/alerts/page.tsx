"use client"

import { useState } from "react"
import Image from "next/image"
import { Bell, Plus, Trash2, TrendingDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface Alert {
  id: string
  productName: string
  currentPrice: number
  targetPrice: number
  platform: string
  isActive: boolean
  createdAt: Date
}

const mockAlerts: Alert[] = [
  {
    id: "1",
    productName: "Wireless Bluetooth Headphones",
    currentPrice: 89.99,
    targetPrice: 70.00,
    platform: "amazon",
    isActive: true,
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    productName: "Smart Fitness Tracker",
    currentPrice: 129.99,
    targetPrice: 100.00,
    platform: "temu",
    isActive: true,
    createdAt: new Date("2024-01-10"),
  },
  {
    id: "3",
    productName: "Portable Phone Charger",
    currentPrice: 29.99,
    targetPrice: 20.00,
    platform: "shein",
    isActive: false,
    createdAt: new Date("2024-01-05"),
  },
]

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newAlert, setNewAlert] = useState({
    productName: "",
    targetPrice: "",
    platform: "amazon",
  })

  const handleCreateAlert = () => {
    if (!newAlert.productName || !newAlert.targetPrice) return

    const alert: Alert = {
      id: Date.now().toString(),
      productName: newAlert.productName,
      currentPrice: Math.random() * 100 + 20,
      targetPrice: parseFloat(newAlert.targetPrice),
      platform: newAlert.platform,
      isActive: true,
      createdAt: new Date(),
    }

    setAlerts(prev => [alert, ...prev])
    setNewAlert({ productName: "", targetPrice: "", platform: "amazon" })
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
                <label className="text-sm font-medium">Product Name</label>
                <Input
                  placeholder="Enter product name"
                  value={newAlert.productName}
                  onChange={(e) => setNewAlert(prev => ({ ...prev, productName: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Target Price</label>
                <Input
                  type="number"
                  placeholder="Enter target price"
                  value={newAlert.targetPrice}
                  onChange={(e) => setNewAlert(prev => ({ ...prev, targetPrice: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Platform</label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={newAlert.platform}
                  onChange={(e) => setNewAlert(prev => ({ ...prev, platform: e.target.value }))}
                >
                  <option value="amazon">Amazon</option>
                  <option value="temu">Temu</option>
                  <option value="shein">Shein</option>
                </select>
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
              <Card key={alert.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">{alert.productName}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Platform: {alert.platform}</span>
                        <span>•</span>
                        <span>Created: {alert.createdAt.toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">
                        {formatPrice(alert.currentPrice)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Target: {formatPrice(alert.targetPrice)}
                      </div>
                      <div className="text-sm text-green-600">
                        Save {formatPrice(getSavingsNeeded(alert.currentPrice, alert.targetPrice))} when reached
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 ml-4">
                      <Badge variant={alert.isActive ? "default" : "secondary"}>
                        {alert.isActive ? "Active" : "Paused"}
                      </Badge>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDeleteAlert(alert.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
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
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {alerts.filter(a => a.currentPrice <= a.targetPrice).length}
                </div>
                <div className="text-sm text-muted-foreground">Targets Reached</div>
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
                <span>Set a target price for any product</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <span>We monitor prices across all platforms</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <span>Get instant notifications when prices drop</span>
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
