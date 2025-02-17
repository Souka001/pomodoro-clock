import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/pomodoro-clock/', // Chemin correct pour GitHub Pages
});
