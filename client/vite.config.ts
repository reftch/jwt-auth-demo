import { defineConfig } from 'vite'
import { readFileSync } from 'fs';

export default defineConfig(({ command, mode, ssrBuild }) => {
  if (command === 'serve') {
    return {
      base: "/api-service",
      publicDir: "src/assets",
      server: {
        host: '0.0.0.0',
        port: 3000,
        https: {
          key: readFileSync('./.cert/key.pem'),
          cert: readFileSync('./.cert/cert.pem'),
        },
        proxy: {
          '/api-service/api/v1': {
            // Changes the origin of the host header to the target URL
            changeOrigin: true,
            // Don't verify SSL certificate
            secure: false,
            target: 'https://localhost:8080'
          }
        }
      },
    }
  } else {
    // command === 'build'
    return {
      // build specific config
      base: "/api-service",
      publicDir: "src/assets",
      build: {
        target: 'esnext',
        outDir: "dist",
      },
    }
  }
})
