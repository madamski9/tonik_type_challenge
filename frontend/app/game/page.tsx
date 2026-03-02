'use client'
import React, { useState } from 'react'

const GamePage = () => {
  const [text, setText] = useState("")
  const generateRandomText = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/text/random`)
      if (!response.ok) console.error("response not ok: ", response)
      const data = await response.json()
      const text = data.content
      setText(text)
      return data
    } catch (e) {
      console.log("error while generating random text: ", e)
    }
  }
  return (
    <div>
      <div className='btn' onClick={generateRandomText}>
        random text
      </div>
      <p>
        {text}
      </p>
    </div>
  )
}

export default GamePage
