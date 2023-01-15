const VoteProgressBar = ({percent}) => {
  return (
      <div className={'bg-zinc-300 h-2 w-full flex-1 rounded-full overflow-clip'}>
          <div className={`bg-gunmetal h-2 rounded-full`} style={{width: `${percent}%`}}>

          </div>
      </div>
  )
}

export default VoteProgressBar