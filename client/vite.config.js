import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    allowedHosts: ["f6kp2a-5173.bytexl.dev", "localhost"], // Add your host here
    proxy: {
      '/api': 'http://localhost:5000',
    }
  },
});