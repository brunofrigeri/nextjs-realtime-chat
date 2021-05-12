import Avatar from './Avatar'

interface AvatarInputProps {
  value?: string
  setValue(image: string): void
}

export default function AvatarInput({ value, setValue }: AvatarInputProps) {
  return (
    <div className="h-full flex justify-center items-center">
      <input
        type={'file'}
        placeholder={'Drag n drop your image here'}
        onDrop={(e) => setValue(URL.createObjectURL(e.dataTransfer.files[0]))}
      />
      <Avatar image={value} name={'BRUNO FRIGERI'} />
    </div>
  )
}
