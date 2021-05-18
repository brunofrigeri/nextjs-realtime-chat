export enum STATUS {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
}

interface StatusProps {
  status: STATUS
}

export default function Status({ status }: StatusProps) {
  const getStatusColor = () => {
    switch (status) {
      case STATUS.ONLINE:
        return 'bg-green-400'
      case STATUS.OFFLINE:
        return 'bg-gray-500'
    }
  }

  return (
    <div
      className={`w-4 h-4 absolute flex bottom-0 right-0 bg-gray-50 items-center justify-center rounded-full`}
    >
      <div className={`${getStatusColor()} w-2 h-2 rounded-full`} />
    </div>
  )
}
