import { inject } from "vue"
import IconGlobResolver from "./IconGlobResolver"

const iconPattern = /::(([^:/]+?)\/)?([^:/]+?)::/g

/**
 * Resolves icon references in the form ::icon-name:: or ::type/icon-name:: to the actual
 * SVG icon references as img tag.
 */
export default function resolveIconReferences(text: string) : string {
  // iconGlobResolver has to be provided by the Vue application
  const iconGlobResolver = inject<IconGlobResolver>('iconGlobResolver')
  return resolveIconReferencesWithGlobResolver(text, iconGlobResolver)
}

/**
 * Resolves icon references in the form ::icon-name:: or ::type/icon-name:: to the actual
 * SVG icon references as img tag.
 */
export function resolveIconReferencesWithGlobResolver(text: string, iconGlobResolver?: IconGlobResolver) : string {
  return text.replace(iconPattern, (_match, _, type, name) => {
    return buildIconTag(iconGlobResolver, name, type)
  })
}

function buildIconTag(iconGlobResolver: IconGlobResolver|undefined, name: string, type?: string) : string {
  const url = buildIconUrl(iconGlobResolver, name, type)
  if (url) {
    return `<img src="${url.toString()}" draggable="false" alt="" style="vertical-align:middle;height:1.4rem;margin-top:-0.25rem;"/>`
  }
  else {
    return `<i>${type ? type + '/' : ''}${name}</i>`
  }
}

export function buildIconUrl(iconGlobResolver: IconGlobResolver|undefined, name: string, type?: string, extension: string = 'svg') : URL|undefined {
  let iconPath
  if (type) {
    iconPath = `${type}/${name}.${extension}`
  }
  else {
    iconPath = `${name}.${extension}`
  }
  return iconGlobResolver?.getUrl(iconPath)
}
