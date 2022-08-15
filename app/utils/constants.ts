type Colors = {
  RED: string;
  GREEN: string;
  BLUE: string;
  WHITE: string;
  YELLOW: string;
}

type Emojis = {
  THUMBSUP: string;
  PARTY: string;
  HANDSUP: string;
}

export const colorMap: Colors = {
  RED: 'text-red-400',
  GREEN: 'text-green-400',
  BLUE: 'text-blue-400',
  WHITE: 'text-white',
  YELLOW: 'text-yellow-300'
}

export const backgroundColorMap: Colors = {
  RED: 'bg-red-400',
  GREEN: 'bg-green-400',
  BLUE: 'bg-blue-400',
  WHITE: 'bg-white',
  YELLOW: 'bg-yellow-300'
}

export const emojiMap: Emojis = {
  THUMBSUP: '👍',
  PARTY: '🎉',
  HANDSUP: '🙌🏻',
}
