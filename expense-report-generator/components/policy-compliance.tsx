import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

export function PolicyCompliance({ issues, onCheck }) {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Policy Compliance</h2>
      <Button onClick={onCheck}>Check Compliance</Button>
      {issues.length > 0 && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">Issues Found:</h3>
          <ul className="list-disc pl-5">
            {issues.map((issue, index) => (
              <li key={index} className="flex items-center text-red-500">
                <AlertCircle className="mr-2 h-4 w-4" />
                {issue}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

