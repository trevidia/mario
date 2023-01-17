import BaseLayout from "../../../components/BaseLayout";
import {useEffect, useState} from "react";
import Icon from "../../../components/Icon";
import Image from "next/image";
import axios from "../../../lib/axios";

const NewEvent = (props) => {
    const now = new Date(Date.now())
    const minute = now.getMinutes().toString()
    const month = ['01','02','03', '04', '05','06', '07', '08', '09', '10', '11', '12']
    const [data, setData] = useState({
        startDate: `${now.getFullYear()}-${month[now.getMonth()]}-${now.getDate()}T${now.getHours()}:${minute.length === 1 ? '0' + minute : minute}`,
        endDate: ""}
    )
    const [onAddSchool, setOnAddSchool] = useState(false)
    const [players, setPlayers] = useState([])
    const [player, setPlayer] = useState({firstName: "", lastName: "", middleName: "", imageName: "", image: null })
    const [addPlayer, setAddPlayer] = useState(false)
    const [addSponsor, setAddSponsor] = useState(false)
    const [links, setLinks] = useState(props.sponsor.links.map(l=>l.url))
    const addLink = ()=>setLinks(prevState => [...prevState, ""])
    const [eventTitle, setEventTitle] = useState("")
    const [schoolId, setSchoolId] = useState(0)
    const [school, setSchool] = useState("")
    const [schools, setSchools] = useState(props.schools)
    const [sponsor, setSponsor] = useState(props.sponsor)

    useEffect(()=>{
        axios.get(`/school/${schoolId}/players`).then((res)=>{
            setPlayers(res.data.players)
        })
    }, [schoolId])

  return (
      <BaseLayout>
          <div className={'w-full h-full rounded-md bg-white mb-3 drop-shadow px-4 py-6 flex justify-center overflow-y-auto'}>
             <div className={'w-3/5'}>
                 <div className={'border-b py-3 mb-2'}>
                     <h4 className={"text-2xl mb-3"}>
                         Event
                     </h4>
                     <div className={'w-full flex justify-between mb-3 flex-wrap'}>
                      <h6 className={'input-label'}>
                          Event title
                      </h6>
                         <input type={'text'} className={'input'} value={eventTitle} onChange={(e)=> setEventTitle(e.target.value)}/>
                     </div>
                     <div className={'w-full flex justify-between mb-3 flex-wrap'}>
                         <span className={'input-label'}>
                             {
                                 !onAddSchool ? "School" : "School Name"}
                         </span>
                         {
                             !onAddSchool ? (
                                     <select className={'input h-10 bg-white'} value={schoolId} onChange={(e)=>setSchoolId(parseInt(e.target.value))}>
                                         {
                                             schools.map((mapSchool, index)=> (
                                                 <option key={index} value={mapSchool.schId}>{mapSchool.name}</option>
                                             ))
                                         }
                                     </select>
                             ) : <input type={'text'} className={'input'} value={school} onChange={(e)=> setSchool(e.target.value)}/>
                         }
                     </div>
                     {
                         !onAddSchool ?
                         <button
                             className={'outlined-btn'}
                             onClick={()=>setOnAddSchool(true)}>
                             <Icon icon={'add'} className={'mr-2'}/>
                             <span className={''}>
                                 Add School
                             </span>
                         </button> : (
                             <div className={"flex"}>
                                 <button className={'outlined-btn mr-2'} onClick={()=>{setOnAddSchool(false); setSchool("")}}>
                                     <Icon icon={'cancel'} className={'mr-2'}/>
                                     <span>
                                         Cancel Add School
                                     </span>
                                 </button>
                                 <button className={'outlined-btn'}
                                         onClick={()=>{
                                             axios.post('/school', {schoolName: school}).then((res)=>{
                                                 setSchools(res.data.schools)
                                                 setSchoolId(res.data.school.schId)
                                                 setOnAddSchool(false)
                                                 setSchool("")
                                                 console.log(res)
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
                         <span className={'input-label'}>Start Date</span>
                         <input
                             className={'input'}
                             type={'datetime-local'}
                             value={data.startDate}
                             onChange={
                             (e)=> setData({...data, startDate: e.target.value})}/>
                     </div>
                     <div className={'w-full flex justify-between mb-3 flex-wrap'}>
                         <span className={'input-label'}>End Date</span>
                         <input className={'input'} type={'datetime-local'} value={data.endDate} onChange={(e)=> setData({...data, endDate: e.target.value})}/>
                     </div>
                 </div>
                 <div className={'border-b py-3 mb-2'}>
                     <h2 className={'text-2xl mb-3'}>
                         Players
                     </h2>
                     {
                         players.map((mapPlayer, index) => (
                             <div className={'flex mb-4 bg-zinc-200 p-2 rounded-md'} key={index}>
                                 <img src={`https://ballonmario.s3.eu-west-3.amazonaws.com/${mapPlayer.image}`} className={"h-20 w-20 mr-3 object-cover rounded-md drop-shadow"} alt={`Image of ${mapPlayer.firstName}`} />

                                 <span className={'capitalize text-lg text-zinc-900'}>
                                     {
                                         `${mapPlayer.firstName} ${mapPlayer.lastName} ${mapPlayer.middleName[0]}.`
                                     }
                                 </span>
                             </div>
                         ))
                     }
                     {
                         addPlayer && (
                             <>
                             <div className={'flex justify-between mb-3 flex-wrap'}>
                                 <span className={'input-label'}>
                                     First name
                                 </span>
                                 <input type={'text'} className={'input'} value={player.firstName} onChange={(e)=>setPlayer({...player, firstName: e.target.value})}/>
                             </div>
                             <div className={'flex justify-between mb-3 flex-wrap'}>
                                 <span className={'input-label'}>
                                     Last name
                                 </span>
                                 <input type={'text'} className={'input'} value={player.lastName} onChange={(e)=>setPlayer({...player, lastName: e.target.value})}/>
                             </div>
                             <div className={'flex justify-between mb-3 flex-wrap'}>
                                 <span className={'input-label'}>
                                     Middle name
                                 </span>
                                 <input type={'text'} className={'input'} value={player.middleName} onChange={(e)=>setPlayer({...player, middleName: e.target.value})}/>
                             </div>
                                 <div className={'flex justify-between mb-3 flex-wrap'}>
                                     <span className={'input-label'}>
                                     Picture
                                 </span>
                                     <input type={'file'} className={'file-input'} onChange={(e)=> setPlayer({...player, imageName: e.target.value, image: e.target.files[0]})} value={player.imageName} accept={'image/*'}/>
                                 </div>
                             </>
                         )
                     }
                     {
                         addPlayer ? (
                             <div className={'flex'}>
                                 <button className={'outlined-btn mr-2'} onClick={()=> setAddPlayer(false)}>
                                     <Icon icon={'cancel'} className={'mr-2'}/>
                                     <span>Cancel Add Player</span>
                                 </button>
                                 {
                                     player.firstName && player.lastName && player.middleName && player.image && (
                                         <button className={'outlined-btn'} onClick={()=> {

                                             let formData = new FormData()
                                             formData.append('image', player.image)
                                             formData.append('firstName', player.firstName)
                                             formData.append('lastName', player.lastName)
                                             formData.append('middleName', player.middleName)
                                             formData.append('school', schoolId)
                                             axios.post('/player', formData, {
                                                 headers: {
                                                     "Content-Type": "multipart/form-data"
                                                 }
                                             }).then(r => {
                                                 setPlayers(prevState => {
                                                     return r.data.players
                                                 })
                                                 console.log(r)
                                                 setAddPlayer(false)
                                             }).catch(error => console.log(error))
                                             setPlayer({lastName: "", middleName: "", firstName: "", imageName: "", image: null})
                                             // setAddPlayer(false)
                                         }}>
                                             <Icon icon={'add'} className={'mr-2'}/>
                                             <span>Add</span>
                                         </button>
                                     )
                                 }
                             </div>
                         ) : (
                             <button className={'outlined-btn'} onClick={()=> setAddPlayer(true)}>
                                 <Icon icon={'add'} className={'mr-2'}/>
                                 <span>Add player</span>
                             </button>
                         )
                     }
                 </div>
                 <div className={'mb-3'}>
                     <h2 className={"text-2xl mb-3"}>
                         Sponsors
                     </h2>
                     <div className={'mb-3 px-2'}>
                         <p className={'text-lg'}>{sponsor.title} {sponsor.firstName} {sponsor.lastName}</p>
                         <div className={'flex flex-col'}>
                             {
                                 links.map(link => <span className={'p-1 rounded bg-zinc-200 my-1'}>{link}</span>)
                             }
                         </div>
                     </div>
                     {
                         addSponsor && (
                             <>

                                 <div className={'flex justify-between mb-3 flex-wrap'}>
                                 <span className={'input-label'}>
                                     Title
                                 </span>
                                     <input type={'text'} className={'input'} value={sponsor.title} onChange={(e)=>setSponsor({...sponsor, title: e.target.value})}/>
                                 </div>
                                 <div className={'flex justify-between mb-3 flex-wrap'}>
                                 <span className={'input-label'}>
                                     First name
                                 </span>
                                     <input type={'text'} className={'input'} value={sponsor.firstName} onChange={(e)=>setSponsor({...sponsor, firstName: e.target.value})}/>
                                 </div>
                                 <div className={'flex justify-between mb-3 flex-wrap'}>
                                 <span className={'input-label'}>
                                     Last name
                                 </span>
                                     <input type={'text'} className={'input'} value={sponsor.lastName} onChange={(e)=>setSponsor({...sponsor, lastName: e.target.value})}/>
                                 </div>
                                 <div className={'flex justify-between mb-3 flex-wrap'}>
                                 <span className={'input-label'}>
                                     Middle name
                                 </span>
                                     <input type={'text'} className={'input'} value={sponsor.middleName} onChange={(e)=>setSponsor({...sponsor, middleName: e.target.value})}/>
                                 </div>
                                 {
                                     links.map((link, index)=> (
                                         <div className={'flex justify-between mb-3 flex-wrap relative'} key={index}>
                                             <span className={'input-label'}>
                                                 Link {index + 1}
                                             </span>
                                             <input type={'text'} className={'input'} value={link} onChange={(e)=>setLinks(prevState => {
                                                 let state = prevState
                                                 state[index] = e.target.value

                                                 return [...state]
                                             })}/>
                                             <div className={'absolute left-full ml-2 flex'}>
                                                 {
                                                     links.length !== 0 && (
                                                         <span className={"h-8 w-8 border border-fuchsia-800 flex items-center justify-center text-fuchsia-800 rounded-full mr-2"} onClick={() => setLinks(prevState => {
                                                             return [...prevState.filter((val, prevIndex) => prevIndex !== index )]
                                                         })}>
                                                             <Icon icon={'delete'}/>
                                                         </span>
                                                     )
                                                 }
                                                 {
                                                     links.length === index + 1 && (
                                                         <span className={"h-8 w-8 border border-fuchsia-800 flex items-center justify-center text-fuchsia-800 rounded-full"} onClick={addLink}>
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
                         addSponsor ? (
                             <div className={'flex'}>
                             <button className={'outlined-btn mr-2'} onClick={()=>setAddSponsor(false)}>
                                 <Icon icon={'cancel'} className={'mr-2'}/>
                                 <span>
                             Cancel Add Sponsor
                         </span>
                             </button>
                                 <button className={'outlined-btn'} onClick={()=> {
                                     axios.post('/sponsor', {...sponsor, links}).then((res)=>{
                                         setAddSponsor(false)
                                     })
                                 }}>
                                     <Icon icon={'add'} className={'mr-2'}/>
                                     <span>
                                     Add
                                 </span>
                                 </button>
                             </div>

                         ) : (
                             <button className={'outlined-btn'} onClick={()=>setAddSponsor(true)}>
                                 <Icon icon={'add'} className={'mr-2'}/>
                                 <span>
                                     Add Sponsor
                                 </span>
                             </button>
                         )
                     }
                 </div>
                 <button className={"btn"} onClick={()=> {
                     axios.post('/event', {title: eventTitle, school: schoolId, start: data.startDate, end: data.endDate, players, sponsor}).then((res)=> console.log(res))
                 }}>
                     Create Event Link
                 </button>
                 <div className={'h-10'}>

                 </div>
             </div>
          {/*
                Form collects event title
                form creates player or adds player
                form creates school or adds school
                forms creates sponsor or adds sponsor
          */}

          </div>

      </BaseLayout>
  )
}

export default NewEvent

export const getServerSideProps = async () => {
    const res = await axios.get('/event/event_details')
    console.log(res.data.schools)
    return {
        props: {
            schools: res.data.schools,
            sponsor: res.data.sponsor[0]
        }
    }
}