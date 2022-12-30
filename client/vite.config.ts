import { defineConfig } from 'vite'

export default defineConfig(({ command, mode, ssrBuild }) => {
  if (command === 'serve') {
    return {
      publicDir: "src/assets",
      server: {
        host: '0.0.0.0',
        port: 3000,
        proxy: {
          '/api-service/api/v1': {
            target: 'http://localhost:8080'
          }
        }
      },
    }
  } else {
    // command === 'build'
    return {
      // build specific config
      base: "/",
      publicDir: "src/assets",
      build: {
        target: 'esnext',
        manifest: false,
        outDir: "dist",
        rollupOptions: {
          output: {
            entryFileNames: "assets/bundle.js",
            assetFileNames: "assets/style.[ext]",
          },
        }
      },
    }
  }
})
