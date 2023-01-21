import {useEffect, useReducer} from "react";
import {eventReducer, initEvent, setDialogOpen, setEventLink, setLoading, setPlayers} from "./eventReducer";
import axios from "./axios";
import {toast} from "react-toastify";

export const useEventState = ({schools, sponsors, event}) => {
    const [state, dispatch] = useReducer(eventReducer, {schools, sponsors, event}, initEvent)
    useEffect(() => {
        if (state.event.schoolId) {
            dispatch(setLoading(true))
            axios.get(`/school/${state.event.schoolId}/players`).then((res) => {
                dispatch(setPlayers(res.data.players))
                dispatch(setLoading(false))
            }).catch((err)=> dispatch(setLoading(false)))
        }
    }, [state.event.schoolId])

    const handleAddPlayer = () => {

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
            dispatch(setLoading(false))
        }).catch(error => {
            console.log(error)
            dispatch(setLoading(false))
        })
    }

    const handleEventValidation = ()=>{
        const {eventTitle, schoolId, start, end} = state.event
        const {players} = state
        const sponsor = state.sponsors[0]
        if (!eventTitle){
            toast('Please input an event title', {type: "warning"})
            return false
        }
        if (!schoolId){
            toast('Please select a school or add a new school', {type: "warning"})
            return false
        }
        if (!start){
            toast('Please state the start date and time', {type: "warning"})
            return false
        }
        if (!end){
            toast('Please state end date and time', {type: "warning"})
            return false
        }
        const startDate = new Date(start)
        const endDate = new Date(end)
        if (!(startDate < endDate)){
            toast('The start date must be before the end date', {type: "warning"})
            return false
        }
        if (!players){
            toast('Select a player or add a new player to the school for the event', {type: "warning"})
            return false
        }
        if (!sponsor){
            toast('Add a sponsor for the event', {type: "warning"})
            return false
        }
        return true
    }

    const handleCreateEvent = () => {
        setLoading(true)
        if (handleEventValidation()){
            axios.post('/event', {
                title: state.event.eventTitle,
                school: state.event.schoolId,
                start: state.event.start,
                end: state.event.end,
                players: state.players,
                sponsor: state.sponsors[0]
            }).then((res) => {
                dispatch(setDialogOpen(true))
                setLoading(false)
                dispatch(setEventLink(res.data.event.slug))
                // router.push(`/${res.data.event.slug}`)
            }).catch(err =>{
                dispatch(setLoading(false))
            })
        } else {
            dispatch(setLoading(false))
        }
    }

    return {handleAddPlayer, dispatch, state, handleCreateEvent}

}