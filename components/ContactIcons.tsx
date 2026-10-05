// Brand-coloured contact icons, drawn inline (no icon library or external requests).
type IconProps = { size?: number };

export function GmailIcon({ size = 24 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <path fill="#4285F4" d="M2 7.2V18a1.5 1.5 0 0 0 1.5 1.5H6v-9z" />
      <path fill="#34A853" d="M18 10.5v9h2.5A1.5 1.5 0 0 0 22 18V7.2z" />
      <path fill="#EA4335" d="M6 10.5 12 15l6-4.5V5.6L12 10 6 5.6z" />
      <path fill="#FBBC04" d="M18 5.6v4.9l4-3.3V6a1.6 1.6 0 0 0-2.6-1.3z" />
      <path fill="#C5221F" d="M2 6v1.2l4 3.3V5.6L4.6 4.7A1.6 1.6 0 0 0 2 6z" />
    </svg>
  );
}

export function WhatsAppIcon({ size = 24 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <path fill="#25D366" d="M12 2.4a9.6 9.6 0 0 0-8.3 14.4L2.4 21.6l4.9-1.3A9.6 9.6 0 1 0 12 2.4z" />
      <path
        fill="#fff"
        d="M9.1 7.3c-.2-.5-.4-.5-.6-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.1 1.1-1.1 2.7s1.2 3.1 1.3 3.3c.2.2 2.3 3.6 5.6 4.9 2.8 1.1 3.3.9 3.9.8.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.1-.3-.2-.6-.4l-2-1c-.3-.1-.5-.2-.7.2-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.5.3-.5c.1-.2 0-.4 0-.5z"
      />
    </svg>
  );
}

export function LinkedInIcon({ size = 24 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="3.5" fill="#0A66C2" />
      <circle cx="7.3" cy="7.3" r="1.6" fill="#fff" />
      <rect x="5.9" y="9.7" width="2.8" height="8.5" fill="#fff" />
      <path
        fill="#fff"
        d="M11 9.7h2.7v1.2c.4-.7 1.4-1.4 2.9-1.4 3 0 3.5 1.9 3.5 4.4v4.3h-2.8v-3.8c0-1 0-2.2-1.4-2.2s-1.6 1-1.6 2.1v3.9H11z"
      />
    </svg>
  );
}

export function LocationIcon({ size = 24 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <path
        fill="#EA4335"
        fillRule="evenodd"
        d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.6A2.6 2.6 0 1 1 12 6.4a2.6 2.6 0 0 1 0 5.2z"
      />
    </svg>
  );
}
