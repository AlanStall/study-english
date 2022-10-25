import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
/* import path from 'path' */

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  build: {
    rollupOptions: {
      input: {
        app: './index.html',
      },
    },    
  },
 
  server: {
    open: '/index.html',
  },
  
  /* devServer: {
    contentBase: path.join(__dirname, "public"),
    watchContentBase: true,
    publicPath: "/",
    historyApiFallback: true
} */
});



