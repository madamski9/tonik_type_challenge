'use client'
import Button from '@/components/ui/Button'
import React, { useState, useEffect, KeyboardEvent } from 'react'
import { getCookie } from '@/lib/cookies'

const GamePage = () => {
  const [text, setText] = useState("")
  const [textSnippetId, setTextSnippetId] = useState<number | null>(null)
  const [index, setIndex] = useState(0)
  const [wrongIndexes, setWrongIndexes] = useState<number[]>([])
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  useEffect(() => {
    if (!text) return
    if (index >= text.length) {
      setIsRunning(false)
      setIsFinished(true)
      return
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isRunning) setIsRunning(true)
      if (e.key !== "Backspace" && e.key.length > 1) return
      if (e.key === text[index]) {
        setIndex((prev) => prev + 1)
      } else if (e.key === "Backspace") {
        setIndex((prev) => {
          if (prev === 0) return 0
          const newIndex = prev - 1
          setWrongIndexes((w) => w.filter((i) => i !== newIndex))
          return newIndex
        })
      } else {
        setWrongIndexes((prev) => [...prev, index])
        setIndex((prev) => prev + 1)
      }
    }
    console.log(index)
    window.addEventListener("keydown", handleKeyDown as any)
    return () => {
      window.removeEventListener("keydown", handleKeyDown as any)
    }
  }, [index, text])

  useEffect(() => {
    if (!isRunning) return
    const interval = setInterval(() => {
      setTime((prev) => prev + 10)
    }, 10)
    return () => clearInterval(interval)
  }, [isRunning])
  useEffect(() => {
    setIndex(0)
    setWrongIndexes([])
    setTime(0)
    setIsRunning(false)
    setIsFinished(false)
  }, [text])
  const generateRandomText = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/text/random`)
      if (!response.ok) console.error("response not ok: ", response)
      const data = await response.json()
      setText(data.content)
      setTextSnippetId(data.id)
      return data
    } catch (e) {
      console.log("error while generating random text: ", e)
    }
  }
  const saveResult = async () => {
    try {
      const userCookie = getCookie('user')
      const userId = userCookie ? JSON.parse(userCookie).id : null
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/results`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: userId,
          textSnippetId: textSnippetId,
          accuracy: (goodLetters / text.length) * 100,
          timeTaken: time
        })
      })
      if (!response.ok) console.error("response not ok while saving result: ", response)
      const data = await response.json()
      console.log("data: ", data)
      return data
    } catch (e) {
      console.error("error while saving result: ", e)
    }
  }

  const goodLetters = index - wrongIndexes.length
  const badLetters = wrongIndexes.length
  const formattedTime = (time / 1000).toFixed(2)

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl mb-4">Typing Challenge</h2>

      <div className="flex gap-4 mb-6">
        <button className="btn btn-primary" onClick={generateRandomText}>
          Generate Random Text
        </button>
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
        </div>
      </div>

      {text && (
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
                    'text-gray-400'
                  }>
                    {char}
                  </span>
                </span>
              )
            })}
          </p>
        </div>
      )}
      {isFinished && (
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
              <div className="stat-title">Correct Letters</div>
              <div className="stat-value text-success">{goodLetters}</div>
            </div>
            <div className="stat">
              <div className="stat-title">Errors</div>
              <div className="stat-value text-error">{badLetters}</div>
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <Button className='btn btn-success btn-lg gap-2 text-white' onClick={saveResult}>
              Save Results
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default GamePage