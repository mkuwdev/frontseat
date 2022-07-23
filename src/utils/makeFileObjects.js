export function makeFileObjects (obj) {
    const blob = new Blob([JSON.stringify(obj)], { type: 'application/json' })
    const files = [
      new File([blob], 'data.json')
    ]
    return files
}