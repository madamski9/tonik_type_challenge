export const calculateWPM = (text: string, index: number, timeMs: number): number => {
  const typedText = text.substring(0, index).trim()
  const wordsTyped = typedText ? typedText.split(/\s+/).length : 0
  const minutes = timeMs / 60000
  return minutes > 0 ? Math.round(wordsTyped / minutes) : 0
}

export const calculateAccuracy = (index: number, wrongIndexes: number[], textLength: number): number => {
  const goodLetters = index - wrongIndexes.length
  return (goodLetters / textLength) * 100
}

export const formatTime = (milliseconds: number): string => {
  return (milliseconds / 1000).toFixed(2)
}

export const getGoodLetters = (index: number, wrongIndexes: number[]): number => {
  return index - wrongIndexes.length
}
