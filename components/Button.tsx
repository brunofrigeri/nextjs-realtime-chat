interface ButtonProps {
  loading: boolean
  children: string
}

export default function Button({ loading, children }: ButtonProps) {
  return (
    <button
      type="submit"
      className="mt-8 p-2 rounded-lg flex justify-center text-white font-bold bg-blue-500"
      disabled={loading}
    >
      {loading ? (
        <svg
          className="animate-spin h-5 w-5 border-2 border-white rounded-full bg-transparent border-r border-opacity-100"
          fill="none"
          viewBox="0 0 24 24"
        />
      ) : (
        children
      )}
    </button>
  )
}
