interface AvatarProps {
  image?: string | null
  name?: string | null
  scale?: number
  children?: React.ReactNode
  onClick?(): void
}

export default function Avatar({
  image,
  name,
  scale = 1,
  onClick,
  children,
}: AvatarProps) {
  const width = `w-${20 * scale}`
  const height = `h-${20 * scale}`

  return (
    <div
      className={`${width} ${height} relative flex rounded-full justify-center items-center bg-gray-200`}
      onClick={onClick}
    >
      <div>
        {name && !image && (
          <p className={`font-semibold ${scale < 1 ? 'text-sm' : 'text-2xl'}`}>
            {name
              .split(' ')
              .map((n) => n[0])
              .filter((_, i) => i < 2)
              .join('')
              .toUpperCase()}
          </p>
        )}
        {!!image && <img src={image} className="rounded-full" alt={'Avatar'} />}
      </div>
      {children}
    </div>
  )
}
