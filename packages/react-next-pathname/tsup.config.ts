import { defineConfig } from "tsup";

export default defineConfig({
  dts: true,
  clean: true,
  outDir: "dist",
  format: ["esm"],
  entry: ["src/index.tsx"],
  external: ["react", "react-dom"],
});
