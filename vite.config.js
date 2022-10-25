import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()], 
  
  devServer: {
    contentBase: path.join(__dirname, "public"),
    watchContentBase: true,
    publicPath: "/dist/",
    historyApiFallback: true
}
});



