'use client'
import Button from '@/components/ui/Button'

interface ResultPanelProps {
  formattedTime: string
  wpm: number
  goodLetters: number
  badLetters: number
  onSave: () => void
}

const ResultPanel = ({ formattedTime, wpm, goodLetters, badLetters, onSave }: ResultPanelProps) => {
  return (
    <div className="mt-6 bg-base-200 p-8 rounded-lg shadow-lg">
      <h3 className="text-3xl font-bold text-center mb-6 text-success">
        Text Finished!
      </h3>
      <div className="stats stats-vertical lg:stats-horizontal shadow w-full">
        <div className="stat">
          <div className="stat-title">Time</div>
          <div className="stat-value text-primary">{formattedTime}s</div>
        </div>
        <div className="stat">
          <div className="stat-title">WPM</div>
          <div className="stat-value text-secondary">{wpm}</div>
        </div>
        <div className="stat">
          <div className="stat-title">Correct Letters</div>
          <div className="stat-value text-success">{goodLetters}</div>
        </div>
        <div className="stat">
          <div className="stat-title">Errors</div>
          <div className="stat-value text-error">{badLetters}</div>
        </div>
      </div>
      <div className="flex justify-center mt-6">
        <Button className='btn btn-success btn-lg gap-2 text-white' onClick={onSave}>
          Save Results
        </Button>
      </div>
    </div>
  )
}

export default ResultPanel
