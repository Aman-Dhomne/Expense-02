"use client"

import { useEffect, useRef } from "react"
import { Chart, type ChartConfiguration } from "chart.js/auto"

export function Dashboard({ receipts, report, complianceIssues, fraudAlerts }) {
  const chartRef = useRef<HTMLCanvasElement | null>(null)
  const chartInstanceRef = useRef<Chart | null>(null)

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d")

      if (ctx) {
        // Destroy the previous chart instance if it exists
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy()
        }

        // Create a new chart
        const newChartInstance = new Chart(ctx, {
          type: "bar",
          data: {
            labels: ["Receipts", "Compliance Issues", "Fraud Alerts"],
            datasets: [
              {
                label: "Expense Report Overview",
                data: [
                  receipts ? receipts.length : 0,
                  complianceIssues ? complianceIssues.length : 0,
                  fraudAlerts ? fraudAlerts.length : 0,
                ],
                backgroundColor: ["rgba(75, 192, 192, 0.6)", "rgba(255, 99, 132, 0.6)", "rgba(255, 206, 86, 0.6)"],
                borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)", "rgba(255, 206, 86, 1)"],
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        } as ChartConfiguration)

        // Store the new chart instance
        chartInstanceRef.current = newChartInstance
      }
    }

    // Cleanup function to destroy the chart when the component unmounts
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy()
      }
    }
  }, [receipts, complianceIssues, fraudAlerts])

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
      <canvas ref={chartRef} width="400" height="200"></canvas>
    </div>
  )
}

