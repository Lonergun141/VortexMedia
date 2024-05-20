import { defineConfig } from 'vite'
//import react from '@vitejs/plugin-react-swc'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base:"/VortexMedia/"
})

// import { defineConfig } from 'vite'
// import dns from 'dns'


// dns.setDefaultResultOrder('verbatim')

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     host: '192.168.1.2',
//     port: 5173
//   }
// })