export default function textTruncate(text, length, end = '') {
  if (text.length < 185) {
    return text
  }

  let index = text.indexOf(' ', length)
  if (index === -1) index = length

  return text.slice(0, index) + end
}
