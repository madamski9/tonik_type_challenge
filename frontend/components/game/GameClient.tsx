'use client'
import { useState, useEffect, KeyboardEvent } from 'react'
import { useRouter } from 'next/navigation'
import { getCookie } from '@/lib/cookies'
import { fetchRandomText, saveGameResult } from '@/lib/api/game'
import { calculateWPM, calculateAccuracy, formatTime, getGoodLetters } from '@/lib/utils/game'
import StatsDisplay from '@/components/game/StatsDisplay'
import TextDisplay from '@/components/game/TextDisplay'
import ResultPanel from '@/components/game/ResultPanel'

const GameClient = () => {
  const router = useRouter()
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

    window.addEventListener("keydown", handleKeyDown as any)
    return () => window.removeEventListener("keydown", handleKeyDown as any)
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

  useEffect(() => {
    generateRandomText()
  }, [])

  const generateRandomText = async () => {
    try {
      const data = await fetchRandomText()
      setText(data.content)
      setTextSnippetId(data.id)
    } catch (e) {
      console.error("Error generating random text:", e)
    }
  }

  const saveResult = async () => {
    try {
      const userCookie = getCookie('user')
      if (!userCookie) {
        alert('No user found')
        return
      }

      const user = JSON.parse(userCookie)
      if (user.isGuest || !user.id) {
        alert('Please login to save your results!')
        return
      }

      const wordsTyped = text.trim().split(/\s+/).length
      const minutes = time / 60000
      const wpm = minutes > 0 ? wordsTyped / minutes : 0

      await saveGameResult({
        userId: user.id,
        textSnippetId: textSnippetId!,
        accuracy: calculateAccuracy(index, wrongIndexes, text.length),
        timeTaken: time,
        wordsPerMinute: wpm
      })
      router.push('/leaderboard')
    } catch (e) {
      console.error("Error saving result:", e)
      alert('Failed to save results')
    }
  }

  const goodLetters = getGoodLetters(index, wrongIndexes)
  const badLetters = wrongIndexes.length
  const formattedTime = formatTime(time)
  const wpm = calculateWPM(text, index, time)

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl mb-4">Typing Challenge</h2>

      <div className="flex gap-4 mb-6">
        <button className="btn btn-primary" onClick={generateRandomText}>
          Generate Random Text
        </button>
        <StatsDisplay 
          goodLetters={goodLetters}
          badLetters={badLetters}
          formattedTime={formattedTime}
          wpm={wpm}
        />
      </div>

      {text && (
        <TextDisplay 
          text={text}
          index={index}
          wrongIndexes={wrongIndexes}
        />
      )}

      {isFinished && (
        <ResultPanel
          formattedTime={formattedTime}
          wpm={wpm}
          goodLetters={goodLetters}
          badLetters={badLetters}
          onSave={saveResult}
        />
      )}
    </div>
  )
}

export default GameClient
