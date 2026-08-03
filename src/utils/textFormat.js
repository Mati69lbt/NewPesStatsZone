export function toTitleCase(text) {
  return text
    .trim()
    .toLowerCase()
    .replace(/(^|\s)\S/g, (letter) => letter.toUpperCase())
}
