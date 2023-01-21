import {signIn} from "next-auth/react";
import {useState} from "react";
import {useRouter} from "next/router";
import Loading from "../../components/Loading";
import {toast} from "react-toastify";


const Login = () => {
    const [userInfo, setUserInfo] = useState({username: "", password: ""})
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
      e.preventDefault()
        setLoading(true)
        const res = await signIn('credentials', {
            username: userInfo.username,
            password: userInfo.password,
            redirect: false
        })
        console.log(res)
        // if (res.)

        setLoading(false)
        if (!res.error){
            setLoading(false)
            const callbackUrl = router.query.callbackUrl
            toast('Successfully logged In', {type: 'success'})
            if (callbackUrl){
                router.push(callbackUrl)
            } else {
                router.push("/admin")
            }
        } else {
            toast(res.error, {type: 'error'})
        }
        console.log(res)
    }

    return (
        <div className={'h-screen w-screen bg-zinc-200 flex items-center justify-center'}>
            {
                loading && <Loading/>
            }
            <div
                className={"h-full w-full flex justify-center sm:h-3/4 sm:w-[300px] sm:rounded-md sm:drop-shadow bg-white max-h-fit overflow-y-auto  py-1"}>
                <form className={'flex items-center flex-col py-10 w-full px-6 h-max'} onSubmit={handleSubmit} autoFocus={true} autoComplete={'off'} autoCapitalize={'none'}>
                    <h2 className={"font-medium text-3xl mb-8 text-zinc-800"}>
                        Login
                    </h2>
                    <div className={"flex flex-col w-full mb-4"}>
                        <label htmlFor={'username'} className={"text-lg mb-2 text-zinc-700"}>
                            Username
                        </label>
                        <input
                            id={'username'}
                            type={"text"}
                            autoCapitalize='none'
                            className={"input"}
                            value={userInfo.username}
                            autoFocus={true}
                            onChange={
                            ({target}) => setUserInfo(prevState =>{return {username: target.value, password: prevState.password}})
                            }
                        />
                    </div>
                    <div className={'flex flex-col w-full mb-10'}>
                        <label htmlFor={'password'} className={"text-lg mb-2 text-zinc-700"}>
                            Password
                        </label>
                        <input
                            id={'password'}
                            type={"password"}
                            className={'input'}
                            value={userInfo.password}
                            onChange={
                                ({target}) => setUserInfo(prevState =>{return {username: prevState.username, password: target.value}})
                            }
                        />
                    </div>
                    <button className={"h-10 w-full bg-fuchsia-400 rounded-md"}>
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login