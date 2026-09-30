import { useEffect, useRef, useState } from 'react'

function TruncatedName({ text, className = '' }) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    if (!open) return

    const handleOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('pointerdown', handleOutside)
    return () => document.removeEventListener('pointerdown', handleOutside)
  }, [open])

  return (
    <span ref={containerRef} className="relative block min-w-0 max-w-full">
      <span
        title={text}
        onClick={() => setOpen((prev) => !prev)}
        className={`block cursor-default truncate ${className}`}
      >
        {text}
      </span>
      {open && (
        <span className="absolute left-1/2 top-full z-20 mt-1 -translate-x-1/2 whitespace-nowrap rounded-md bg-zinc-900 px-2 py-1 text-xs font-semibold text-white shadow-lg dark:bg-zinc-100 dark:text-zinc-900">
          {text}
        </span>
      )}
    </span>
  )
}

export default TruncatedName
