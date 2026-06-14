// Resolves video asset URLs.
//
// Set NEXT_PUBLIC_VIDEO_CDN to your Cloudflare R2 public bucket URL
// (e.g. https://pub-xxxxxxxx.r2.dev) to serve the heavy video files from R2
// instead of bundling them into the app / Vercel deployment.
//
// If the env var is unset, paths fall back to local /public (i.e. /videos/...),
// so local development still works when the files are present on disk.
const CDN_BASE = (process.env.NEXT_PUBLIC_VIDEO_CDN ?? '').replace(/\/+$/, '')

export function videoUrl(path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`
  return CDN_BASE ? `${CDN_BASE}${clean}` : clean
}
