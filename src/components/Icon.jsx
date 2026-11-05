export default function Icon({ name, size = 22 }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  }

  if (name === 'search') {
    return <svg {...common}><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4.2 4.2" /></svg>
  }
  if (name === 'cart') {
    return <svg {...common}><path d="M3 4h2l2.2 11.2a2 2 0 0 0 2 1.6h8.9a2 2 0 0 0 1.9-1.5L22 8H6" /><circle cx="10" cy="20" r="1" /><circle cx="18" cy="20" r="1" /></svg>
  }
  if (name === 'user') {
    return <svg {...common}><circle cx="12" cy="8" r="3.5" /><path d="M5 20c.6-3.3 3.3-5.4 7-5.4s6.4 2.1 7 5.4" /></svg>
  }
  if (name === 'arrow') {
    return <svg {...common}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
  }
  if (name === 'chevron') {
    return <svg {...common}><path d="m9 18 6-6-6-6" /></svg>
  }
  if (name === 'menu') {
    return <svg {...common}><path d="M4 7h16M4 12h16M4 17h16" /></svg>
  }
  if (name === 'close') {
    return <svg {...common}><path d="m6 6 12 12M18 6 6 18" /></svg>
  }
  if (name === 'truck') {
    return <svg {...common}><path d="M3 6h11v11H3zM14 10h4l3 3v4h-7z" /><circle cx="7.5" cy="18" r="1.5" /><circle cx="17.5" cy="18" r="1.5" /></svg>
  }
  if (name === 'return') {
    return <svg {...common}><path d="M4 10a8 8 0 1 1 1.7 7.9M4 4v6h6" /></svg>
  }
  if (name === 'filter') {
    return <svg {...common}><path d="M4 5h16l-6.3 7.4v5.1l-3.4 1.8v-6.9L4 5Z" /></svg>
  }
  if (name === 'shoe') {
    return <svg {...common}><path d="M3 15.5c2.4-.2 4.1-1.3 5.2-3.4l1.2-2.2 3.2 2.8c1.6 1.4 3.5 2.1 5.6 2.1H21v4H3v-3.3Z" /><path d="m8.2 12.1 2.3 1M10 10.1l2.2 1.5" /></svg>
  }
  if (name === 'shirt') {
    return <svg {...common}><path d="m8 4 4 2 4-2 4 3-2.2 3-2-1V20H8.2V9l-2 1L4 7l4-3Z" /></svg>
  }
  if (name === 'backpack') {
    return <svg {...common}><path d="M8 6V5a4 4 0 0 1 8 0v1M6 8a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v12H6V8Z" /><path d="M9 10h6v4H9zM4 11h2m12 0h2" /></svg>
  }
  if (name === 'sparkle') {
    return <svg {...common}><path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3ZM19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9L19 15Z" /></svg>
  }
  return <svg {...common}><path d="M12 3v18M3 12h18" /></svg>
}