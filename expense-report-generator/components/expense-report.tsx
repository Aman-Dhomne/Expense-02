import { Button } from "@/components/ui/button"

export function ExpenseReport({ report, onGenerate }) {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Expense Report</h2>
      {report ? (
        <div>
          <h3 className="text-xl font-semibold mb-2">Generated Report:</h3>
          <ul className="list-disc pl-5">
            {report.expenses.map((expense, index) => (
              <li key={index} className="mb-2">
                <strong>{expense.category}:</strong> ${expense.amount} - {expense.vendor} ({expense.date})
                <p className="text-sm text-gray-600">{expense.justification}</p>
              </li>
            ))}
          </ul>
          <p className="mt-4">
            <strong>Total:</strong> ${report.total}
          </p>
        </div>
      ) : (
        <div>
          <h3 className="text-xl font-semibold mb-2">Processed Receipts:</h3>
          <ul className="list-disc pl-5">
            {report && report.expenses ? (
              report.expenses.map((expense, index) => (
                <li key={index} className="mb-2">
                  <strong>{expense.category}:</strong> ${expense.amount} - {expense.vendor} ({expense.date})
                </li>
              ))
            ) : (
              <li>No receipts processed yet</li>
            )}
          </ul>
          <Button onClick={onGenerate} className="mt-4">
            Generate Full Report
          </Button>
        </div>
      )}
    </div>
  )
}

