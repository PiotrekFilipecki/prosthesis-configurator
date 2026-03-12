export type LoadedAssets = Record<string, Record<string, HTMLImageElement>>;
export type AssetManifest = Record<string, Record<string, string>>;

const loadImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Failed to load asset: ${url}`));
    image.src = url;
  });

export default async function loadAssets(
  assets: AssetManifest = {}
): Promise<LoadedAssets> {
  const loadedImages: LoadedAssets = {};

  for (const [groupKey, groupAssets] of Object.entries(assets)) {
    const nextGroup: Record<string, HTMLImageElement> = {};
    loadedImages[groupKey] = nextGroup;

    for (const [assetKey, assetUrl] of Object.entries(groupAssets)) {
      nextGroup[assetKey] = await loadImage(assetUrl);
    }
  }

  return loadedImages;
}
