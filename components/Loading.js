const Loading = () => {
  return (
      <div className={' absolute z-30 w-full flex items-center justify-center h-full'}>
          <div className={'rounded-md bg-white/80 shadow p-3 backdrop-blur flex items-center justify-center flex-col'}>
              <div className={'h-10  w-10 border-2 border-r-zinc-900 border-r-2 border-zinc-400 mt-2 rounded-full animate-spin-fast '}>
              </div>
              <span className={'mt-3 text-zinc-900 text-lg'}>Loading</span>
          </div>
      </div>
  )
}

export default Loading