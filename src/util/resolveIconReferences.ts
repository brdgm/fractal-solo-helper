const iconPattern = /::(([^:/]+?)\/)?([^:/]+?)::/g

/**
 * Resolves icon references in the form ::icon-name:: or ::type/icon-name:: to the actual
 * SVG icon references as img tag.
 */
export default function resolveIconReferences(text: string) : string {
  return text.replace(iconPattern, (_match, _, type, name) => {
    return buildIconTag(name, type)
  })
}

function buildIconTag(name: string, type?: string) : string {
  const url = buildIconUrl(name, type)
  return `<img src="${url}" draggable="false" alt="" style="vertical-align:middle;height:1em;margin-top:-0.25rem;"/>`
}

export function buildIconUrl(name: string, type?: string, extension: string = 'svg') : string {
  const iconsPath = `${import.meta.env.BASE_URL}src/assets/icons`
  let iconPath
  if (type) {
    iconPath = `${iconsPath}/${type}/${name}.${extension}`
  }
  else {
    iconPath = `${iconsPath}/${name}.${extension}`
  }
  return new URL(iconPath, import.meta.url).toString()
}
