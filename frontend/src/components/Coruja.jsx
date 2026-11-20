function Coruja({ className = 'coruja' }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
      <path d="M16 14l8 6h16l8-6v20c0 14-8 24-16 24S16 48 16 34z" fill="#3a2418" stroke="#C5A059" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="25" cy="29" r="8" fill="#16201a" stroke="#C5A059" strokeWidth="2" />
      <circle cx="39" cy="29" r="8" fill="#16201a" stroke="#C5A059" strokeWidth="2" />
      <circle cx="25" cy="29" r="3.2" fill="#dcc088" />
      <circle cx="39" cy="29" r="3.2" fill="#dcc088" />
      <path d="M29.5 34h5L32 40z" fill="#C5A059" />
      <path d="M22 47c3 4 6 6 10 6s7-2 10-6" fill="none" stroke="#C5A059" strokeWidth="1.6" strokeDasharray="2 3" />
    </svg>
  )
}

export default Coruja