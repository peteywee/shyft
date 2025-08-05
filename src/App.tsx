import { Outlet, Link } from 'react-router-dom'
import ThemeToggle from '@/components/ThemeToggle'
import RequireAuth from '@/components/RequireAuth'

export default function App() {
  return (
    <RequireAuth>
      <div className="min-h-screen flex flex-col">
        <header className="flex items-center justify-between p-4 shadow">
          <nav className="flex gap-4 font-medium">
            <Link to="/"        className="hover:underline">Shifts</Link>
            <Link to="/pay"     className="hover:underline">Pay</Link>
            <Link to="/settings" className="hover:underline">Settings</Link>
          </nav>
          <ThemeToggle />
        </header>

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </RequireAuth>
  )
}
