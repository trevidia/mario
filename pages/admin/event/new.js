import BaseLayout from "../../../components/BaseLayout";
import axios from "../../../lib/axios";
import {
    addNewPlayer,
    addNewSchool, addNewSponsor, addNewSponsorLink, editNewSponsorLink,
    setEndDate, setEventImage,
    setEventTitle, setLoading,
    setNewSchool, setPlayerDepartment, setPlayerImage, setPlayerName, setPlayers, setSchoolId,
    setSchools, setSponsorName, setSponsors, setStartDate
} from "../../../lib/eventReducer";
import Loading from "../../../components/Loading"
import {AddOutlined, CancelOutlined, DeleteOutline, SaveOutlined} from "@mui/icons-material";
import SchoolDropDown from "../../../components/SchoolDropDown";
import LabelInput from "../../../components/LabelInput";
import SuccessLinkModal from "../../../components/SuccessLinkModal";
import {useEventState} from "../../../lib/hooks";
import PlayerCard from "../../../components/PlayerCard";

const NewEvent = (props) => {
    const {state, dispatch, handleCreateEvent, handleAddPlayer} = useEventState({schools: props.schools, sponsors: props.sponsors})


    return (
        <>
            {
                state.loading && <Loading/>
            }
        <BaseLayout>
            <SuccessLinkModal link={state.eventLink} openState={{isOpen: state.dialogModalOpen, dispatch}}/>

            <div
                className={'w-full h-full rounded-md bg-white mb-3 drop-shadow px-4 py-6 flex justify-center overflow-y-auto'}>
                <div className={'w-4/5 lg::w-3/5'}>
                    <div className={'border-b py-3 mb-2'}>
                        <h4 className={"text-2xl mb-3"}>
                            Event
                        </h4>
                        <LabelInput
                            label={"Event title"}
                            value={state.event.eventTitle}
                            onChange={(e) => dispatch(setEventTitle(e.target.value))}
                        />
                        <div className={'w-full flex justify-between mb-3 flex-wrap'}>
                         <span className={'input-label'}>
                             {
                                 !state.addSchool ? "School" : "School Name"}
                         </span>
                            {
                                !state.addSchool ? (
                                    <SchoolDropDown dispatch={dispatch} schools={state.schools}/>
                                ) : (
                                    <input
                                        type={'text'}
                                        className={'input'}
                                        value={state.newSchool}
                                        onChange={(e) => dispatch(setNewSchool(e.target.value))}
                                    />
                                )
                            }
                        </div>
                        {
                            !state.addSchool ?
                                <button
                                    className={'outlined-btn'}
                                    onClick={() => dispatch(addNewSchool())}>
                                    <AddOutlined className={'mr-2'}/>
                                    <span className={''}>
                                        Add School
                                    </span>
                                </button> : (
                                    <div className={"flex"}>
                                        <button className={'outlined-btn mr-2'} onClick={() => {
                                            dispatch(setSchools(state.schools))
                                        }}>
                                            <CancelOutlined className={'mr-2'}/>
                                            <span>
                                                Cancel Add School
                                            </span>
                                        </button>
                                        <button className={'outlined-btn'}
                                                onClick={() => {
                                                    dispatch(setLoading(true))
                                                    axios.post('/school', {schoolName: state.newSchool}).then((res) => {

                                                        dispatch(setSchools(res.data.schools))
                                                        dispatch(setSchoolId(res.data.school.schId))
                                                        console.log(res)
                                                        dispatch(setLoading(false))
                                                    }).catch((err)=>{
                                                        dispatch(setLoading(false))
                                                    })
                                                }
                                                }>
                                            <SaveOutlined className={'mr-2'}/>
                                            <span>
                                                Save School
                                            </span>
                                        </button>
                                    </div>
                                )
                        }
                        <LabelInput
                            type={'file'}
                            label={"Event flyer"}
                            value={state.event.imageName}
                            onChange={(e) => dispatch(setEventImage({
                                imageName: e.target.value,
                                image: e.target.files[0]
                            }))}/>
                        <LabelInput
                            label={"Start Date"}
                            type={'datetime-local'}
                            value={state.event.start}
                            onChange={(e) => dispatch(setStartDate(e.target.value))}
                            />
                        <LabelInput
                            label={"End Date"}
                            type={'datetime-local'}
                            value={state.event.end}
                            onChange={(e) => dispatch(setEndDate(e.target.value))}
                            />
                    </div>
                    <div className={'border-b py-3 mb-2'}>
                        <h2 className={'text-2xl mb-3'}>
                            Players
                        </h2>
                        {
                            state.players.map((player, index) => <PlayerCard player={player} key={index}/>)
                        }
                        {
                            state.addPlayer && (
                                <>
                                    <LabelInput
                                        label={"Name"}
                                        value={state.newPlayer.name}
                                        onChange={(e) => dispatch(setPlayerName(e.target.value))}
                                    />
                                    <LabelInput
                                        label={"Department"}
                                        value={state.newPlayer.department}
                                        onChange={(e) => dispatch(setPlayerDepartment(e.target.value))}
                                    />
                                    <LabelInput
                                        label={"Picture"}
                                        type={'file'}
                                        value={state.newPlayer.imageName}
                                        onChange={(e) => dispatch(setPlayerImage({
                                            imageName: e.target.value,
                                            image: e.target.files[0]
                                        }))}
                                    />
                                </>
                            )
                        }
                        {
                            state.addPlayer ? (
                                <div className={'flex'}>
                                    <button className={'outlined-btn mr-2'}
                                            onClick={() => dispatch(setPlayers(state.players))}>
                                        <CancelOutlined className={'mr-2'}/>
                                        <span>Cancel Add Player</span>
                                    </button>
                                    {
                                        state.newPlayer.name && state.newPlayer.department && state.newPlayer.image && (
                                            <button className={'outlined-btn'} onClick={handleAddPlayer}>
                                                <AddOutlined className={'mr-2'}/>
                                                <span>Add</span>
                                            </button>
                                        )
                                    }
                                </div>
                            ) : (
                                <button className={'outlined-btn'} onClick={() => dispatch(addNewPlayer())}>
                                    <AddOutlined className={'mr-2'}/>
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
                            state.sponsors.map((sponsor, index) => (
                                <div className={'mb-3 px-2'} key={index}>
                                    <p className={'text-lg'}>{sponsor.name}</p>
                                    <div className={'flex flex-col'}>
                                        {
                                            sponsor.links.map((link, linkId) => <span
                                                className={'p-1 rounded bg-zinc-200 my-1 truncate'}
                                                key={linkId}>{link.url}</span>)
                                        }
                                    </div>
                                </div>
                            ))
                        }
                        {
                            state.addSponsor && (
                                <>
                                    <LabelInput
                                        label={"Name"}
                                        value={state.newSponsor.name}
                                        onChange={(e) => dispatch(setSponsorName(e.target.value))}
                                        />
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
                                                                <DeleteOutline/>
                                                         </span>
                                                        )
                                                    }
                                                    {
                                                        state.newSponsor.links.length === index + 1 && (
                                                            <span
                                                                className={"h-8 w-8 border border-fuchsia-800 flex items-center justify-center text-fuchsia-800 rounded-full"}
                                                                onClick={() => dispatch(addNewSponsorLink())}>
                                                                <AddOutlined/>
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
                                    <button
                                        className={'outlined-btn mr-2'}
                                        onClick={() => dispatch(setSponsors(state.sponsors))}>
                                        <CancelOutlined className={'mr-2'}/>
                                        <span>
                                            Cancel Add Sponsor
                                        </span>
                                    </button>
                                    <button className={'outlined-btn'} onClick={() => {
                                        dispatch(setLoading(true))
                                        axios.post('/sponsor', {...state.newSponsor}).then((res) => {
                                            dispatch(setSponsors(res.data.sponsors))
                                            dispatch(setLoading(false))
                                        }).catch((err)=> {
                                            dispatch(setLoading(false))
                                        })
                                    }}>
                                        <AddOutlined className={'mr-2'}/>
                                        <span>
                                     Add
                                 </span>
                                    </button>
                                </div>

                            ) : (
                                state.sponsors.length === 0 &&
                                <button className={'outlined-btn'} onClick={() => dispatch(addNewSponsor())}>
                                    <AddOutlined className={'mr-2'}/>
                                    <span>
                                     Add Sponsor
                                 </span>
                                </button>
                            )
                        }
                    </div>
                    <button className={"btn"} onClick={handleCreateEvent}>
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

export default NewEvent

export const getServerSideProps = async () => {
    const res = await axios.get('/event/event_details')
    console.log(res.data.schools)
    return {
        props: {
            schools: res.data.schools,
            sponsors: res.data.sponsors
        }
    }
}