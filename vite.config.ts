import { defineConfig } from "vite";
import pkg from "./package.json";
export default ({ mode }) => {

  return defineConfig({
      build: {
          lib: {
              // Could also be a dictionary or array of multiple entry points
              entry: "./src/plugin.ts",
              // the proper extensions will be added
              fileName: "index",
              name: pkg.name,
              formats: ["es"],

          },
          minify: true,
          rollupOptions: {
              external: ["@uxland/hes-cconf-shell"],
              output: {
                  globals: {
                      "@uxland/hes-cconf-shell": "@uxland/hes-cconf-shell"
                  }
              },
          },
          
      },
  });
};
