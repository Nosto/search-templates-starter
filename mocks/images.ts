export function createRandomImage() {
  return `https://picsum.photos/id/${newId()}/500/750`
}

const MAX_ID = 500
let id = 1

export function newId() {
  return (id = (id + 1) % MAX_ID)
}
