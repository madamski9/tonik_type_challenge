'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

interface LeaderboardEntry {
  id: number
  user: {
    id: number
    username: string
  }
  textSnippet: {
    id: number
    content: string
  }
  accuracy: number
  timeTaken: number
  wordsPerMinute: number
  createdAt: string
}

const LeaderboardPage = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchLeaderboard()
  }, [])

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/leaderboard`)
      if (!response.ok) {
        console.error('Failed to fetch leaderboard')
        return
      }
      const data = await response.json()
      setLeaderboard(data)
    } catch (e) {
      console.error('Error fetching leaderboard:', e)
    } finally {
      setIsLoading(false)
    }
  }

  const formatTime = (milliseconds: number) => {
    return (milliseconds / 1000).toFixed(2) + 's'
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  return (
    <div className="container mx-auto p-8">
      <div className="mb-6">
        <Link href="/" className="btn btn-sm btn-ghost">
          ← Back to Home
        </Link>
      </div>

      <h1 className="text-4xl font-bold text-center mb-8">Leaderboard</h1>

      {isLoading ? (
        <div className="flex justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : leaderboard.length === 0 ? (
        <div className="alert alert-info">
          <span>No results yet. Be the first to complete a challenge!</span>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Player</th>
                <th>Accuracy</th>
                <th>Time</th>
                <th>WPM</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, index) => (
                <tr key={entry.id} className={index < 3 ? 'bg-base-200' : ''}>
                  <td>
                    <div className="flex items-center gap-2">
                      {index === 0 && <span className="text-2xl">🥇</span>}
                      {index === 1 && <span className="text-2xl">🥈</span>}
                      {index === 2 && <span className="text-2xl">🥉</span>}
                      <span className="font-bold">#{index + 1}</span>
                    </div>
                  </td>
                  <td>
                    <div className="font-semibold">{entry.user.username}</div>
                  </td>
                  <td>
                    <div className="badge badge-success badge-lg">
                      {entry.accuracy.toFixed(2)}%
                    </div>
                  </td>
                  <td>
                    <div className="badge badge-info badge-lg">
                      {formatTime(entry.timeTaken)}
                    </div>
                  </td>
                  <td>
                    <div className="badge badge-secondary badge-lg">
                      {Math.round(entry.wordsPerMinute)} WPM
                    </div>
                  </td>
                  <td className="text-sm text-gray-500">
                    {formatDate(entry.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default LeaderboardPage
