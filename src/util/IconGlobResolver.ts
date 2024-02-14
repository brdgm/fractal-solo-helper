/**
 * Resolves icon references in the form {icon-name}.{extension} or {type}/{icon-name}.{extension} to the actual URL.
 * The initial resolving process is done asynchronously and the resolved URLs are cached.
 */
export default class IconGlobResolver {

  private readonly resolvedUrls : Map<string,URL>

  private constructor(resolvedUrls : Map<string,URL>) {
    this.resolvedUrls = resolvedUrls
  }

  public getUrl(path: string) : URL|undefined {
    return this.resolvedUrls.get(path)
  }

  public static async createResolved() : Promise<IconGlobResolver> {
    const resolvedUrls = await resolveAllIconUrls()
    return new IconGlobResolver(resolvedUrls)
  }

}

const ICON_IMPORTS = import.meta.glob<URL>(`/src/assets/icons/**/*.(svg|png|jpg|webp)`, {
  query: '?url',
  import: 'default'
})

async function resolveAllIconUrls() : Promise<Map<string,URL>> {
  const paths : string[] = Object.keys(ICON_IMPORTS)
    .map(path => path.replace('/src/assets/icons/', ''))
  const urls : URL[] = await Promise.all(Object.values(ICON_IMPORTS).map(fn => fn()))
  const resolvedUrls = new Map<string,URL>()
  for (let i=0; i<paths.length && i<urls.length; i++) {
    resolvedUrls.set(paths[i], urls[i])
  }
  return resolvedUrls
}
