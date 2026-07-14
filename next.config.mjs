/** @type {import('next').NextConfig} */
const nextConfig = {
  // React StrictMode double-mounts components in dev to surface missing
  // effect cleanup. R3F's WebGL render loop setup doesn't survive that
  // double-mount cleanly (the render loop can end up permanently stalled
  // while useFrame callbacks keep firing) — disabled so the fire shader's
  // canvas animates correctly in development.
  reactStrictMode: false,
};

export default nextConfig;
