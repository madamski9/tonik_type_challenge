const API_URL = process.env.NEXT_PUBLIC_API_URL

export const fetchRandomText = async () => {
  const response = await fetch(`${API_URL}/text/random`)
  if (!response.ok) {
    throw new Error('Failed to fetch random text')
  }
  return response.json()
}

export const saveGameResult = async (data: {
  userId: number
  textSnippetId: number
  accuracy: number
  timeTaken: number
  wordsPerMinute: number
}) => {
  const response = await fetch(`${API_URL}/results`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  
  if (!response.ok) {
    throw new Error('Failed to save result')
  }
  
  return response.json()
}
