"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Bell, Plus, Trash2, TrendingDown, ExternalLink, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'
// Assuming useSession is available for auth, if not, hardcode userId for now
import { useSession } from 'next-auth/react';

interface PriceHistoryPoint {
  _id: string;
  price: number;
  timestamp: string;
}

interface Alert {
  _id: string; // MongoDB default ID
  alertName: string;
  productLink: string;
  currentPrice: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  priceHistories: PriceHistoryPoint[]; // Array of price history documents
}

interface RetailerOffer {
  retailer: string;
  price: number;
  link: string;
  delivery?: string;
}

// No mock alerts needed anymore
const mockAlerts: Alert[] = []

export default function AlertsPage() {
  const { data: session } = useSession();
  const userId = 'mockUserId'; // session?.user?.id || 'mockUserId'; // Replace with actual user ID from session

  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [openChartId, setOpenChartId] = useState<string | null>(null)
  const [bestDeals, setBestDeals] = useState<Record<string, RetailerOffer[]>>({})
  const [loadingDeals, setLoadingDeals] = useState<Record<string, boolean>>({})
  const [deletingAlerts, setDeletingAlerts] = useState<Record<string, boolean>>({})
  const [newAlert, setNewAlert] = useState({
    productLink: "",
    alertName: "",
  })

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await fetch('/api/alerts');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setAlerts(result.data);
      } catch (error) {
        console.error("Failed to fetch alerts:", error);
      }
    };
    fetchAlerts();
  }, [userId]);

  const handleCreateAlert = async () => {
    if (!newAlert.productLink || !newAlert.alertName) return

    try {
      const response = await fetch('/api/alerts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newAlert, userId }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const createdAlert = await response.json();
      setAlerts(prev => [createdAlert.data, ...prev]);
      setNewAlert({ productLink: "", alertName: "" });
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Failed to create alert:", error);
    }
  };

  const handleDeleteAlert = async (id: string) => {
    // Prevent multiple delete requests for the same alert
    if (deletingAlerts[id]) {
      return
    }
    
    setDeletingAlerts(prev => ({ ...prev, [id]: true }))
    
    try {
      const response = await fetch(`/api/alerts/${id}`, {
        method: 'DELETE',
      })
      
      // If 404, the alert is already deleted, so just remove from UI
      if (response.status === 404) {
        console.log("Alert already deleted")
        setAlerts(prev => prev.filter(alert => alert._id !== id))
        return
      }
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      // Remove from local state only after successful deletion
      setAlerts(prev => prev.filter(alert => alert._id !== id))
    } catch (error) {
      console.error("Failed to delete alert:", error)
      // Don't show alert for 404 errors (already deleted)
      if (!(error instanceof Error) || !error.message.includes('404')) {
        window.alert("Failed to delete alert. Please try again.")
      }
    } finally {
      setDeletingAlerts(prev => ({ ...prev, [id]: false }))
    }
  }

  const fetchBestDeal = async (alertId: string) => {
    setLoadingDeals(prev => ({ ...prev, [alertId]: true }))
    try {
      const response = await fetch(`/api/alerts/${alertId}/best-deal`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const result = await response.json()
      setBestDeals(prev => ({ ...prev, [alertId]: result.data }))
    } catch (error) {
      console.error("Failed to fetch best deal:", error)
    } finally {
      setLoadingDeals(prev => ({ ...prev, [alertId]: false }))
    }
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
              <Card key={alert._id} className="cursor-pointer" onClick={() => setOpenChartId(openChartId === alert._id ? null : alert._id)}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">{alert.alertName}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Link: <a href={alert.productLink} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{alert.productLink.substring(0, 30)}...</a></span>
                        <span>•</span>
                        <span>Created: {new Date(alert.createdAt).toLocaleDateString()}</span>
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
                          handleDeleteAlert(alert._id)
                        }}
                        disabled={deletingAlerts[alert._id]}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Best Deal Button */}
                  <div className="mt-4 flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        fetchBestDeal(alert._id)
                      }}
                      disabled={loadingDeals[alert._id]}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {loadingDeals[alert._id] ? "Loading..." : "Find Best Deal"}
                    </Button>
                    
                    {bestDeals[alert._id] && bestDeals[alert._id].length > 0 && (
                      <div className="flex-1">
                        <div className="flex items-center gap-2 text-sm">
                          <span className="font-medium">Best Price:</span>
                          <Badge variant="default" className="bg-green-600">
                            {bestDeals[alert._id][0].retailer} - ${bestDeals[alert._id][0].price.toFixed(2)}
                          </Badge>
                          <span className="text-muted-foreground">
                            ({bestDeals[alert._id][0].delivery})
                          </span>
                          <Button
                            variant="link"
                            size="sm"
                            asChild
                            className="h-auto p-0"
                          >
                            <a 
                              href={bestDeals[alert._id][0].link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <ExternalLink className="h-3 w-3 mr-1" />
                              Buy Now
                            </a>
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {openChartId === alert._id && alert.priceHistories && (
                    <div className="mt-4 h-48">
                      <h4 className="text-lg font-semibold mb-2">Price History</h4>
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={alert.priceHistories.map(ph => ({ date: ph.timestamp, price: ph.price }))}>
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
