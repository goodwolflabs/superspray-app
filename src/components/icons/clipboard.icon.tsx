interface IconProps {
  readonly className?: string
}

export function ClipboardIcon({ className }: IconProps) {
  return (
    <svg width={24} height={24} fill="none" className={className}>
      <path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 3.75h3.75a.75.75 0 0 1 .75.75v15.75a.75.75 0 0 1-.75.75H5.25a.75.75 0 0 1-.75-.75V4.5a.75.75 0 0 1 .75-.75H9"
      />
      <path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 6.75V6a3.75 3.75 0 0 1 7.5 0v.75h-7.5Z"
      />
    </svg>
  )
}
