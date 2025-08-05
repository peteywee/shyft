import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const prefersDark = matchMedia('(prefers-color-scheme: dark)').matches
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') ?? (prefersDark ? 'dark' : 'light')
  )

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <button
      onClick={() => setTheme(t => (t === 'dark' ? 'light' : 'dark'))}
      className="rounded border px-2 py-1 text-sm"
    >
      {theme === 'dark' ? '🌞' : '🌙'}
    </button>
  )
}
