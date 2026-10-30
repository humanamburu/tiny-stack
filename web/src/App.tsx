import { useEffect, useState, type FormEvent } from 'react'

import type { User } from '../../api/src/schema'

export function App() {
  const [users, setUsers] = useState<User[]>([])

  async function loadUsers() {
    const res = await fetch('/api/users')
    setUsers(await res.json())
  }

  useEffect(() => {
    loadUsers()
  }, [])

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formEl = e.currentTarget // grab before await: React nulls currentTarget afterwards
    const form = new FormData(formEl)

    await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: form.get('name') }),
    })

    formEl.reset()
    loadUsers()
  }

  return (
    <main>
      <form onSubmit={onSubmit}>
        <input name="name" placeholder="name" required />
        <button type="submit">Add user</button>
      </form>

      <ul>
        {users.map((u) => (
          <li key={u.id}>{u.name}</li>
        ))}
      </ul>
    </main>
  )
}
