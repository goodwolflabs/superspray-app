interface IconProps {
  className?: string
}

export function ChainIcon({ className }: IconProps) {
  return (
    <svg
      width="12"
      height="18"
      viewBox="0 0 12 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <title>Chain icon</title>
      <path d="M6 0L0 9L6 6.75L12 9L6 0Z" fill="white" />
      <path d="M6 6.75L0 9L6 12L12 9L6 6.75Z" fill="white" />
      <path d="M6 12L0 9L6 18L12 9L6 12Z" fill="white" />
    </svg>
  )
}
