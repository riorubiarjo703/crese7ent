import React from 'react'

type GoogleIconProps = {
  className?: string
}

export const GoogleIcon: React.FC<GoogleIconProps> = ({ className }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path
        d="M21.805 12.23c0-.79-.07-1.55-.2-2.28H12v4.31h5.49a4.68 4.68 0 0 1-2.04 3.08v2.56h3.3c1.94-1.79 3.06-4.42 3.06-7.67Z"
        fill="#4285F4"
      />
      <path
        d="M12 22c2.76 0 5.08-.92 6.77-2.5l-3.3-2.56c-.92.62-2.08.98-3.47.98-2.67 0-4.93-1.8-5.74-4.22H2.84v2.64A10 10 0 0 0 12 22Z"
        fill="#34A853"
      />
      <path
        d="M6.26 13.7a5.99 5.99 0 0 1 0-3.4V7.66H2.84a10 10 0 0 0 0 8.68L6.26 13.7Z"
        fill="#FBBC05"
      />
      <path
        d="M12 6.08c1.5 0 2.84.51 3.9 1.5l2.92-2.92C17.08 2.95 14.76 2 12 2a10 10 0 0 0-9.16 5.66L6.26 10.3c.81-2.42 3.07-4.22 5.74-4.22Z"
        fill="#EA4335"
      />
    </svg>
  )
}
