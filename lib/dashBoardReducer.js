const SET_SELECTED_EVENT = "Set_selected_event"

const initialState = {
    events: [],
    selectedEvent: null,
}

export const dashBoardReducer =(state, action) => {
    switch (action.type){
        case SET_SELECTED_EVENT:
            return {...state, selectedEvent: action.payload}
        default:
            throw new Error("Action not available")
    }
}

export function dashStateInitializer(events){
    const dashEvents = events.map((event)=>{
        const players = event.eventPlayers
        let top3 = []
        players.forEach((player, index)=>{
            if (!(index > 2)){
                top3.push(player)
            }
        })
        return {...event, top3}
    })
    return {...initialState, events: dashEvents}
}

export function setSelectedEvent(id){
    return {
        type: SET_SELECTED_EVENT,
        payload: id
    }
}