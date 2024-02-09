const iconPattern = /::(([^:/]+?)\/)?([^:/]+?)::/g;

/**
 * Resolves icon references in the form ::icon-name:: or ::type/icon-name:: to the actual
 * icon references as IMG tag.
 */
export default function resolveIconReferences(text: string) : string {
  return text.replace(iconPattern, (_match, _, type, name) => {
    return buildIconTag(name, type)
  })
}

function buildIconTag(name: string, type?: string) : string {
  const iconPath = buildIconPath(name, type)
  return `<img src="${iconPath}" draggable="false" alt=""/>`
}

export function buildIconPath(name: string, type?: string, extension: string = 'svg') : string {
  let iconPath
  if (type) {
    iconPath = `/src/assets/icons/${type}/${name}.${extension}`
  }
  else {
    iconPath = `/src/assets/icons/${name}.${extension}`
  }
  return new URL(iconPath, import.meta.url).toString()
}
