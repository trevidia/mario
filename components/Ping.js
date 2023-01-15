export default function Ping({size}){
    return <div className={'relative'}>
        <div className={`${size} bg-green-500 rounded-full animate-ping`}></div>
        <div className={`${size} bg-green-500 rounded-full absolute top-0 z-30`}></div>
    </div>
}