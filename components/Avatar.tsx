interface AvatarProps {
  image?: string
  name?: string
  scale?: number
  children?: React.ReactNode
}

export default function Avatar({
  image,
  name,
  scale = 1,
  children,
}: AvatarProps) {
  const width = `w-${20 * scale}`
  const height = `h-${20 * scale}`

  return (
    <div
      className={`${width} ${height} relative flex rounded-full justify-center items-center bg-gray-200`}
    >
      <div>
        {name && !image && (
          <p className={`font-semibold ${scale <= 1 ? 'text-sm' : 'text-2xl'}`}>
            {name
              .split(' ')
              .map((n) => n[0])
              .filter((_, i) => i < 2)
              .join('')
              .toUpperCase()}
          </p>
        )}
        {!!image && <img src={image} alt={'Avatar'} />}
      </div>
      {children}
    </div>
  )
}
