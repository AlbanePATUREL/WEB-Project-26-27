// Logo original de Beverly Gadgets : un cœur-œil d'espionne (création maison, SVG pur)
export default function Logo({ taille = 40 }) {
  return (
    <svg width={taille} height={taille} viewBox="0 0 48 48" aria-hidden="true" className="logo-icone">
      <defs>
        <linearGradient id="logo-degrade" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ff2e9a" />
          <stop offset="1" stopColor="#7b3ff2" />
        </linearGradient>
      </defs>
      {/* Cœur */}
      <path
        d="M24 43C10 33 3 24.5 3 16.5 3 10 8 5 14 5c4.2 0 7.6 2.4 10 6 2.4-3.6 5.8-6 10-6 6 0 11 5 11 11.5C45 24.5 38 33 24 43Z"
        fill="url(#logo-degrade)"
      />
      {/* Œil */}
      <path d="M11 20q13-11 26 0-13 11-26 0Z" fill="#14062b" stroke="#fff" strokeWidth="2" />
      <circle cx="24" cy="20" r="4.6" fill="#3ff5c3" />
      <circle cx="25.6" cy="18.4" r="1.4" fill="#fff" />
      {/* Éclat */}
      <path d="M40 2l1.2 3.3L44.5 6.5l-3.3 1.2L40 11l-1.2-3.3L35.5 6.5l3.3-1.2Z" fill="#3ff5c3" />
    </svg>
  )
}
