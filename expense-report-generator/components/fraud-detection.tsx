import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

export function FraudDetection({ alerts, onDetect }) {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Fraud Detection</h2>
      <Button onClick={onDetect}>Detect Fraud</Button>
      {alerts.length > 0 && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">Fraud Alerts:</h3>
          <ul className="list-disc pl-5">
            {alerts.map((alert, index) => (
              <li key={index} className="flex items-center text-yellow-500">
                <AlertTriangle className="mr-2 h-4 w-4" />
                {alert}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

