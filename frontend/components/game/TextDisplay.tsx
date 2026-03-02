'use client'

interface TextDisplayProps {
  text: string
  index: number
  wrongIndexes: number[]
}

const TextDisplay = ({ text, index, wrongIndexes }: TextDisplayProps) => {
  return (
    <div className="bg-base-200 p-6 rounded">
      <p className="text-xl font-mono leading-loose tracking-wide">
        {text.split("").map((char, i) => {
          const isWrong = wrongIndexes.includes(i)
          const isCorrect = i < index && !isWrong
          const isCurrent = i === index

          return (
            <span key={i} className="relative">
              {isCurrent && (
                <span className="absolute -top-3.5 -left-0.5 animate-bounce text-sm text-primary">●</span>
              )}
              <span className={
                isWrong ? 'text-red-500' :
                isCorrect ? 'text-green-500' :
                'text-gray-500'
              }>
                {char}
              </span>
            </span>
          )
        })}
      </p>
    </div>
  )
}

export default TextDisplay
