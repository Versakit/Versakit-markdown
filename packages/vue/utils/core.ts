/**
 *
 * @param tag
 * @param attributes
 * @description Create a wrapper element with attributes
 * @returns
 */
export const createWrapper = (
  tag: string,
  attributes: Record<string, string> = {},
) => {
  const element = document.createElement(tag)
  Object.entries(attributes).forEach(([key, value]) => {
    if (key === 'class') {
      element.className = value
    } else {
      element.style[key as any] = value
    }
  })
  return element
}
