import { useRef } from 'react'
import Avatar from './Avatar'

interface AvatarInputProps {
  value?: File | string
  setValue(image: File | string | undefined): void
}

export default function AvatarInput({ value, setValue }: AvatarInputProps) {
  const ref = useRef<any>(null)

  const onAvatarPress = () => {
    if (ref && ref.current) {
      ref.current.click()
    }
  }

  return (
    <div className="h-full flex justify-center items-center">
      <Avatar
        image={
          value && typeof value !== 'string'
            ? URL.createObjectURL(value)
            : value
        }
        onClick={onAvatarPress}
      />
      <input
        ref={ref}
        type={'file'}
        onChange={(e) =>
          setValue(
            e.currentTarget.files && e.currentTarget.files.length > 0
              ? e.currentTarget.files[0]
              : undefined
          )
        }
      />
    </div>
  )
}
