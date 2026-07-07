import { useCallback, useEffect, useState } from 'react'

/**
 * Lightweight key-set persistence in localStorage.
 *
 * Used for "did the patient tick this checkbox?" style sub-task
 * progress that lives outside the main day-completion engine —
 * pantry-shelf checkmarks, toxic-load swap checkmarks, completed
 * routine items, etc.
 *
 * Shape: a Set<string> of "checked" keys, persisted as a JSON array.
 */

const STORAGE_PREFIX = 'bredesen.checkset.v1.'

function loadSet(name: string): Set<string> {
  if (typeof window === 'undefined') return new Set()
  try {
    const raw = window.localStorage.getItem(STORAGE_PREFIX + name)
    if (!raw) return new Set()
    const parsed = JSON.parse(raw)
    return new Set(Array.isArray(parsed) ? parsed.filter((s) => typeof s === 'string') : [])
  } catch {
    return new Set()
  }
}

function saveSet(name: string, set: Set<string>) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STORAGE_PREFIX + name, JSON.stringify(Array.from(set)))
}

export function useCheckSet(name: string) {
  const [set, setSet] = useState<Set<string>>(new Set())
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setSet(loadSet(name))
    setReady(true)
  }, [name])

  const toggle = useCallback(
    (key: string) => {
      setSet((prev) => {
        const next = new Set(prev)
        if (next.has(key)) next.delete(key)
        else next.add(key)
        saveSet(name, next)
        return next
      })
    },
    [name],
  )

  const isChecked = useCallback((key: string) => set.has(key), [set])

  const clear = useCallback(() => {
    setSet(new Set())
    saveSet(name, new Set())
  }, [name])

  return { isChecked, toggle, clear, count: set.size, ready }
}
