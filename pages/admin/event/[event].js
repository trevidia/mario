import BaseLayout from "../../../components/BaseLayout";
import {useEffect, useReducer, useState} from "react";
import Icon from "../../../components/Icon";
import axios from "../../../lib/axios";
import {
    addNewPlayer,
    addNewSchool, addNewSponsor, addNewSponsorLink, editNewSponsorLink,
    eventReducer,
    initEvent, setEndDate, setEventImage,
    setEventTitle,
    setNewSchool, setPlayerDepartment, setPlayerImage, setPlayerName, setPlayers, setSchoolId,
    setSchools, setSponsorName, setSponsors, setStartDate
} from "../../../lib/eventReducer";
import Loading from "../../../components/Loading";
import {useRouter} from "next/router";

const EditEvent = ({event, sponsors, schools}) => {
    const [state, dispatch] = useReducer(eventReducer, {schools, sponsors, event}, initEvent)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    useEffect(() => {
        if (state.event.schoolId) {
            setLoading(true)
            axios.get(`/school/${state.event.schoolId}/players`).then((res) => {
                dispatch(setPlayers(res.data.players))
                setLoading(false)
            }).catch((err)=> setLoading(false))
        }
    }, [state.event.schoolId])

    return (
        <>
            {
                loading && <Loading/>
            }
            <BaseLayout>
                <div
                    className={'w-full h-full rounded-md bg-white mb-3 drop-shadow px-4 py-6 flex justify-center overflow-y-auto'}>
                    <div className={'w-3/5'}>
                        <div className={'border-b py-3 mb-2'}>
                            <h4 className={"text-2xl mb-3"}>
                                Event
                            </h4>
                            <div className={'w-full flex justify-between mb-3 flex-wrap'}>
                                <h6 className={'input-label'}>
                                    Event title
                                </h6>
                                <input type={'text'} className={'input'} value={state.event.eventTitle}
                                       onChange={(e) => dispatch(setEventTitle(e.target.value))}/>
                            </div>
                            <div className={'w-full flex justify-between mb-3 flex-wrap'}>
                         <span className={'input-label'}>
                             {
                                 !state.addSchool ? "School" : "School Name"}
                         </span>
                                {
                                    !state.addSchool ? (
                                        <select className={'input h-10 bg-white'} value={state.event.schoolId}
                                                onChange={(e) => dispatch(setSchoolId(parseInt(e.target.value)))}>
                                            <option defaultValue hidden>Select School</option>
                                            {
                                                state.schools.map((mapSchool, index) => (
                                                    <option key={index} value={mapSchool.schId}>{mapSchool.name}</option>
                                                ))
                                            }
                                        </select>
                                    ) : <input type={'text'} className={'input'} value={state.newSchool}
                                               onChange={(e) => dispatch(setNewSchool(e.target.value))}/>
                                }
                            </div>
                            {
                                !state.addSchool ?
                                    <button
                                        className={'outlined-btn'}
                                        onClick={() => dispatch(addNewSchool())}>
                                        <Icon icon={'add'} className={'mr-2'}/>
                                        <span className={''}>
                                 Add School
                             </span>
                                    </button> : (
                                        <div className={"flex"}>
                                            <button className={'outlined-btn mr-2'} onClick={() => {
                                                dispatch(setSchools(state.schools))
                                            }}>
                                                <Icon icon={'cancel'} className={'mr-2'}/>
                                                <span>
                                         Cancel Add School
                                     </span>
                                            </button>
                                            <button className={'outlined-btn'}
                                                    onClick={() => {
                                                        setLoading(true)
                                                        axios.post('/school', {schoolName: state.newSchool}).then((res) => {

                                                            dispatch(setSchools(res.data.schools))
                                                            dispatch(setSchoolId(res.data.school.schId))
                                                            console.log(res)
                                                            setLoading(false)
                                                        }).catch((err)=>{
                                                            setLoading(false)
                                                        })
                                                    }
                                                    }>
                                                <Icon icon={'save'} className={'mr-2'}/>
                                                <span>
                                         Save School
                                     </span>
                                            </button>

                                        </div>
                                    )
                            }

                            <div className={'w-full flex justify-between mb-3 flex-wrap'}>
                                <h6 className={'input-label'}>
                                    Event Flyer
                                </h6>
                                <input type={'file'} className={'file-input'} value={state.event.imageName}
                                       onChange={(e) => dispatch(setEventImage({
                                           imageName: e.target.value,
                                           image: e.target.files[0]
                                       }))} accept={'image/*'}/>
                            </div>
                            <div className={'w-full flex justify-between mb-3 flex-wrap'}>
                                <span className={'input-label'}>Start Date</span>
                                <input
                                    className={'input'}
                                    type={'datetime-local'}
                                    value={state.event.start}
                                    onChange={
                                        (e) => dispatch(setStartDate(e.target.value))}/>
                            </div>
                            <div className={'w-full flex justify-between mb-3 flex-wrap'}>
                                <span className={'input-label'}>End Date</span>
                                <input className={'input'} type={'datetime-local'} value={state.event.end}
                                       onChange={(e) => dispatch(setEndDate(e.target.value))}/>
                            </div>
                        </div>
                        <div className={'border-b py-3 mb-2'}>
                            <h2 className={'text-2xl mb-3'}>
                                Players
                            </h2>
                            {
                                state.players.map((player, index) => (
                                    <div className={'flex mb-4 bg-zinc-200 p-2 rounded-md'} key={index}>
                                        <img src={`${process.env.NEXT_PUBLIC_AMAZON_BUCKET}/${player.image}`}
                                             className={"h-20 w-20 mr-3 object-cover rounded-md drop-shadow"}
                                             alt={`Image of ${player.name}`}/>
                                        <div className={'flex flex-col'}>
                                        <span className={'capitalize text-xl mb-3 text-zinc-900'}>
                                     {
                                         player.name
                                     }
                                 </span>
                                            <span>
                                            {
                                                player.department
                                            }
                                        </span>
                                        </div>
                                    </div>
                                ))
                            }
                            {
                                state.addPlayer && (
                                    <>
                                        <div className={'flex justify-between mb-3 flex-wrap'}>
                                 <span className={'input-label'}>
                                     Name
                                 </span>
                                            <input type={'text'} className={'input'} value={state.newPlayer.name}
                                                   onChange={(e) => dispatch(setPlayerName(e.target.value))}/>
                                        </div>
                                        <div className={'flex justify-between mb-3 flex-wrap'}>
                                 <span className={'input-label'}>
                                     Department
                                 </span>
                                            <input type={'text'} className={'input'} value={state.newPlayer.department}
                                                   onChange={(e) => dispatch(setPlayerDepartment(e.target.value))}/>
                                        </div>
                                        <div className={'flex justify-between mb-3 flex-wrap'}>
                                     <span className={'input-label'}>
                                     Picture
                                 </span>
                                            <input type={'file'} className={'file-input'}
                                                   onChange={(e) => dispatch(setPlayerImage({
                                                       imageName: e.target.value,
                                                       image: e.target.files[0]
                                                   }))} value={state.newPlayer.imageName} accept={'image/*'}/>
                                        </div>
                                    </>
                                )
                            }
                            {
                                state.addPlayer ? (
                                    <div className={'flex'}>
                                        <button className={'outlined-btn mr-2'}
                                                onClick={() => dispatch(setPlayers(state.players))}>
                                            <Icon icon={'cancel'} className={'mr-2'}/>
                                            <span>Cancel Add Player</span>
                                        </button>
                                        {
                                            state.newPlayer.name && state.newPlayer.department && state.newPlayer.image && (
                                                <button className={'outlined-btn'} onClick={() => {

                                                    let formData = new FormData()
                                                    formData.append('image', state.newPlayer.image)
                                                    formData.append('name', state.newPlayer.name)
                                                    formData.append('department', state.newPlayer.department)
                                                    formData.append('school', state.event.schoolId)
                                                    setLoading(true)
                                                    axios.post('/player', formData, {
                                                        headers: {
                                                            "Content-Type": "multipart/form-data"
                                                        }
                                                    }).then(r => {
                                                        dispatch(setPlayers(r.data.players))
                                                        setLoading(false)
                                                    }).catch(error => {
                                                        console.log(error)
                                                        setLoading(false)
                                                    })
                                                }}>
                                                    <Icon icon={'add'} className={'mr-2'}/>
                                                    <span>Add</span>
                                                </button>
                                            )
                                        }
                                    </div>
                                ) : (
                                    <button className={'outlined-btn'} onClick={() => dispatch(addNewPlayer())}>
                                        <Icon icon={'add'} className={'mr-2'}/>
                                        <span>Add player</span>
                                    </button>
                                )
                            }
                        </div>
                        <div className={'mb-3'}>
                            <h2 className={"text-2xl mb-3"}>
                                Sponsor
                            </h2>
                            {
                                state.sponsors.map(({sponsor}, index) => (
                                    <div className={'mb-3 px-2'} key={index}>
                                        <p className={'text-lg'}>{sponsor.name}</p>
                                        <div className={'flex flex-col'}>
                                            {
                                                sponsor.links.map((link, linkId) => <span
                                                    className={'p-1 rounded bg-zinc-200 my-1'}
                                                    key={linkId}>{link.url}</span>)
                                            }
                                        </div>
                                    </div>
                                ))
                            }
                            {
                                state.addSponsor && (
                                    <>

                                        <div className={'flex justify-between mb-3 flex-wrap'}>
                                 <span className={'input-label'}>
                                     Name
                                 </span>
                                            <input type={'text'} className={'input'} value={state.newSponsor.name}
                                                   onChange={(e) => dispatch(setSponsorName(e.target.value))}/>
                                        </div>

                                        {
                                            state.newSponsor.links.map((link, index) => (
                                                <div className={'flex justify-between mb-3 flex-wrap relative'} key={index}>
                                             <span className={'input-label'}>
                                                 Link {index + 1}
                                             </span>
                                                    <input type={'text'} className={'input'} value={link}
                                                           onChange={(e) => dispatch(editNewSponsorLink({
                                                               link: e.target.value,
                                                               linkId: index
                                                           }))}/>
                                                    <div className={'absolute left-full ml-2 flex'}>
                                                        {
                                                            state.newSponsor.links.length !== 0 && (
                                                                <span
                                                                    className={"h-8 w-8 border border-fuchsia-800 flex items-center justify-center text-fuchsia-800 rounded-full mr-2"}
                                                                    onClick={() => setLinks(prevState => {
                                                                        return [...prevState.filter((val, prevIndex) => prevIndex !== index)]
                                                                    })}>
                                                             <Icon icon={'delete'}/>
                                                         </span>
                                                            )
                                                        }
                                                        {
                                                            state.newSponsor.links.length === index + 1 && (
                                                                <span
                                                                    className={"h-8 w-8 border border-fuchsia-800 flex items-center justify-center text-fuchsia-800 rounded-full"}
                                                                    onClick={() => dispatch(addNewSponsorLink())}>
                                                             <Icon icon={'add'}/>
                                                         </span>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </>
                                )
                            }
                            {
                                state.addSponsor ? (
                                    <div className={'flex'}>
                                        <button className={'outlined-btn mr-2'}
                                                onClick={() => dispatch(setSponsors(state.sponsors))}>
                                            <Icon icon={'cancel'} className={'mr-2'}/>
                                            <span>
                             Cancel Add Sponsor
                         </span>
                                        </button>
                                        <button className={'outlined-btn'} onClick={() => {
                                            setLoading(true)
                                            axios.post('/sponsor', {...state.newSponsor}).then((res) => {
                                                dispatch(setSponsors(res.data.sponsors))
                                                setLoading(false)
                                            }).catch((err)=> {
                                                setLoading(false)
                                            })
                                        }}>
                                            <Icon icon={'add'} className={'mr-2'}/>
                                            <span>
                                     Add
                                 </span>
                                        </button>
                                    </div>

                                ) : (
                                    state.sponsors.length === 0 &&
                                    <button className={'outlined-btn'} onClick={() => dispatch(addNewSponsor())}>
                                        <Icon icon={'add'} className={'mr-2'}/>
                                        <span>
                                     Add Sponsor
                                 </span>
                                    </button>
                                )
                            }
                        </div>
                        <button className={"btn"} onClick={() => {
                            const formData = new FormData()
                            formData.append('title', state.event.eventTitle)
                            formData.append('school', state.event.schoolId)
                            formData.append('start', state.event.start)
                            formData.append('end', state.event.end)
                            formData.append('players', JSON.stringify(state.players))
                            formData.append("sponsor", JSON.stringify(state.sponsors[0]))
                            formData.append('image', state.event.image)
                            setLoading(true)
                            axios.post(`/event/${event.slug}`, formData, {
                                headers: {
                                    "Content-Type": "multipart/form-data"
                                }
                            }).then((res) => {
                                setLoading(false)
                                router.push(`/${res.data.slug}`)
                                console.log(res)
                            }).catch(err =>{
                                setLoading(false)
                            })
                        }}>
                            Create Event Link
                        </button>
                        <div className={'h-10'}>

                        </div>
                    </div>

                </div>

            </BaseLayout>
        </>
    )
}

export default EditEvent

export const getServerSideProps = async ({params}) => {
    const res = await axios.get(`/event/${params.event}`)
    return {
        props: {
            event: res.data.event,
            schools: res.data.schools,
            sponsors: res.data.event.eventSponsors
        }
    }
}