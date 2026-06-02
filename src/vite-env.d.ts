/// <reference types="vite/client" />

// Vite's client types (referenced above) already declare the standard asset
// modules (`*.webp`, `*.png`, `*.svg`, …) and `import.meta.env`. The only
// import scheme tsc can't resolve is Figma Make's custom `figma:asset/<hash>.<ext>`
// scheme, which Vite rewrites to a real asset URL at build time. Declare it so
// type-checking treats those imports as string URLs.
declare module "figma:asset/*" {
  const src: string;
  export default src;
}
