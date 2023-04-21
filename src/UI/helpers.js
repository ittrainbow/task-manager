export const taskListNameHelper = (name) => {
  return name.length > 40 ? name.substring(0, 37) + '...' : name
}

export const taskListDescriptionHelper = (description) => {
  return description.length > 80 ? description.substring(0, 77) + '...' : description
}