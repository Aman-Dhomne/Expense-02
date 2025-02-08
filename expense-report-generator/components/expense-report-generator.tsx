"use client"

import { useState } from "react"
import { ReceiptUploader } from "./receipt-uploader"
import { ExpenseReport } from "./expense-report"
import { PolicyCompliance } from "./policy-compliance"
import { FraudDetection } from "./fraud-detection"
import { Dashboard } from "./dashboard"
import { ApprovalWorkflow } from "./approval-workflow"

export function ExpenseReportGenerator() {
  const [receipts, setReceipts] = useState([])
  const [expenseReport, setExpenseReport] = useState(null)
  const [complianceIssues, setComplianceIssues] = useState([])
  const [fraudAlerts, setFraudAlerts] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const handleReceiptsUploaded = async (uploadedReceipts) => {
    setIsLoading(true)
    try {
      const formData = new FormData()
      uploadedReceipts.forEach((receipt) => {
        formData.append("receipts", receipt)
      })

      const response = await fetch("/api/process-receipts", {
        method: "POST",
        body: formData,
      })
      const { processedReceipts } = await response.json()
      setReceipts(processedReceipts)
      console.log("Processed receipts:", processedReceipts)
    } catch (error) {
      console.error("Error processing receipts:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGenerateReport = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/generate-report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ processedReceipts: receipts }),
      })
      const { report } = await response.json()
      setExpenseReport(report)
      console.log("Generated report:", report)
    } catch (error) {
      console.error("Error generating report:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCheckCompliance = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/check-compliance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ report: expenseReport }),
      })
      const { violations } = await response.json()
      setComplianceIssues(violations)
      console.log("Compliance issues:", violations)
    } catch (error) {
      console.error("Error checking compliance:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDetectFraud = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/detect-fraud", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ report: expenseReport }),
      })
      const { fraudAlerts } = await response.json()
      setFraudAlerts(fraudAlerts)
      console.log("Fraud alerts:", fraudAlerts)
    } catch (error) {
      console.error("Error detecting fraud:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-4xl">
      <ReceiptUploader onUpload={handleReceiptsUploaded} />
      {isLoading && <p>Loading...</p>}
      {receipts.length > 0 && (
        <>
          <ExpenseReport report={expenseReport} onGenerate={handleGenerateReport} />
          <PolicyCompliance issues={complianceIssues} onCheck={handleCheckCompliance} />
          <FraudDetection alerts={fraudAlerts} onDetect={handleDetectFraud} />
          <Dashboard
            receipts={receipts}
            report={expenseReport}
            complianceIssues={complianceIssues}
            fraudAlerts={fraudAlerts}
          />
          <ApprovalWorkflow report={expenseReport} />
        </>
      )}
    </div>
  )
}

