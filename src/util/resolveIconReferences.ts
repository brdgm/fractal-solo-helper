const iconPattern = /::(([^:/]+?)\/)?([^:/]+?)::/g;
const iconModules = import.meta.glob<any>('/src/assets/icons/**/*.svg')

/**
 * Resolves icon references in the form ::icon-name:: or ::type/icon-name:: to the actual
 * icon references as IMG tag.
 */
export default async function resolveIconReferences(text: string) : Promise<string> {
  const matches = Array.from(text.matchAll(iconPattern))
  const replacements = await Promise.all(matches.map(([_match, _, type, name]) => buildIconTag(name, type)))

  let result = text
  for (let i = 0; i < matches.length; i++) {
    const replacement = replacements[i]
    if (replacement) {
      result = result.replace(matches[i][0], replacement)
    }
  }

  return result
}

async function buildIconTag(name: string, type?: string) : Promise<string|undefined> {
  const iconPath = await buildIconPath(name, type)
  if (!iconPath) {
    return undefined
  }
  return `<img src="${iconPath}" draggable="false" alt=""/>`
}

async function buildIconPath(name: string, type?: string) : Promise<string|undefined> {
  let iconPath
  if (type) {
    iconPath = `/src/assets/icons/${type}/${name}.svg`
  }
  else {
    iconPath = `/src/assets/icons/${name}.svg`
  }
  const iconModule = iconModules[iconPath]
  if (!iconModule) {
    return undefined
  }
  return (await iconModule()).default
}
