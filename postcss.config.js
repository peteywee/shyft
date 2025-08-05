// ESM (works because your project already uses "type": "module")
import tailwind from '@tailwindcss/postcss'
import autoprefixer from 'autoprefixer'

export default { plugins: [tailwind, autoprefixer] }
