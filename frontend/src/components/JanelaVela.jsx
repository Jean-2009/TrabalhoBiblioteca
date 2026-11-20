function JanelaVela() {
  return (
    <svg viewBox="0 0 320 400" role="img" aria-label="Janela em arco ao luar, com livros e uma vela acesa">
      <defs>
        <linearGradient id="ceu" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0d1a17" />
          <stop offset="1" stopColor="#27402f" />
        </linearGradient>
        <radialGradient id="lua">
          <stop offset="0" stopColor="#f3e7c8" />
          <stop offset="1" stopColor="#d9c79a" />
        </radialGradient>
        <radialGradient id="halo">
          <stop offset="0" stopColor="#ffb347" stopOpacity=".55" />
          <stop offset="1" stopColor="#ffb347" stopOpacity="0" />
        </radialGradient>
        <pattern id="vidro" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <path d="M0 0H40M0 0V40" stroke="#C5A059" strokeOpacity=".22" />
        </pattern>
      </defs>
      <rect width="320" height="400" fill="url(#ceu)" />
      <circle cx="215" cy="110" r="30" fill="url(#lua)" />
      <g fill="#f3e7c8">
        <circle cx="70" cy="70" r="1.6" />
        <circle cx="120" cy="40" r="1.2" />
        <circle cx="150" cy="120" r="1.4" />
        <circle cx="270" cy="60" r="1.2" />
        <circle cx="95" cy="160" r="1" />
      </g>
      <rect width="320" height="400" fill="url(#vidro)" />
      <path d="M160 0v400M0 215h320" stroke="#C5A059" strokeWidth="5" />
      <rect y="330" width="320" height="70" fill="#3a2418" />
      <rect y="326" width="320" height="6" fill="#C5A059" />
      <rect x="36" y="302" width="130" height="24" rx="2" fill="#6b2d2d" />
      <rect x="44" y="278" width="112" height="24" rx="2" fill="#1e3b2c" />
      <rect x="52" y="254" width="96" height="24" rx="2" fill="#7a5a2c" />
      <path d="M36 310h130M44 286h112M52 262h96" stroke="#C5A059" strokeWidth="2" />
      <circle className="halo" cx="236" cy="290" r="90" fill="url(#halo)" />
      <rect x="226" y="296" width="20" height="30" rx="2" fill="#E8DCC4" />
      <path className="chama" d="M236 266c8 9 9 16 0 26-9-10-8-17 0-26z" fill="#ffc15a" />
    </svg>
  )
}

export default JanelaVela