'use client'

interface StatsDisplayProps {
  goodLetters: number
  badLetters: number
  formattedTime: string
  wpm: number
}

const StatsDisplay = ({ goodLetters, badLetters, formattedTime, wpm }: StatsDisplayProps) => {
  return (
    <div className="flex gap-3">
      <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg border border-green-300">
        <span className="font-semibold">Good:</span> {goodLetters}
      </div>
      <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg border border-red-300">
        <span className="font-semibold">Bad:</span> {badLetters}
      </div>
      <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg border border-blue-300">
        <span className="font-semibold">Time:</span> {formattedTime}s
      </div>
      <div className="bg-purple-100 text-purple-700 px-4 py-2 rounded-lg border border-purple-300">
        <span className="font-semibold">WPM:</span> {wpm}
      </div>
    </div>
  )
}

export default StatsDisplay
