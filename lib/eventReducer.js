const SET_EVENT_TITLE = 'eventTitle'
const SET_SCHOOL_ID = "schoolId"
const SET_START_DATE = "start"
const SET_END_DATE = 'end'
const ADD_PLAYER = 'add_player'
const ADD_NEW_PLAYER = 'add_new_player'
const SET_PLAYERS = 'set_players'
const ADD_LINK = 'add_link'
const EDIT_SPONSOR_LINK = 'sponsor_link'
const EDIT_SPONSOR_NAME = "sponsor_name"
const SET_SPONSOR_NAME = "set_sponsor_name"
const EDIT_NEW_SPONSOR_LINK = "Edit_new_sponsor_link"
const ADD_NEW_SPONSOR_LINK = "Add_new_sponsor_link"
const ADD_NEW_SPONSOR = "add_new_sponsor"
const ADD_SPONSOR = 'add_sponsor'
const SET_SCHOOLS = 'set_schools'
const SET_NEW_SCHOOL = 'add_school'
const ADD_NEW_SCHOOL = 'add_new_school'
const SET_SPONSORS = 'set_sponsors'
const SET_NEW_PLAYER_NAME = 'set_new_player_name'
const SET_NEW_PLAYER_DEPARTMENT = 'set_new_player_department'
const SET_NEW_PLAYER_IMAGE = 'set_new_player_image'
const SET_EVENT_IMAGE = 'set_event_image'
const SET_LOADING = 'loading'
const DIALOG_MODAL = "dialog_modal"
const SET_EVENT_LINK = "event_link"



const initialSponsorState = {
    name: "",
    links: [""]
}

const initialPlayerState = {
    name: "",
    department: "",
    image: null,
    imageName: ""
}

const initialEventState = {
    eventTitle: "",
    schoolId: undefined,
    image: null,
    imageName: "",
    start: "",
    end: ""
}

export const eventState = {
    event: initialEventState,
    newPlayer: initialPlayerState,
    newSchool: "",
    eventLink: "",
    schools: [],
    players: [],
    sponsors: [],
    newSponsor: initialSponsorState,
    addSponsor: false,
    addPlayer: false,
    addSchool: false,
    loading: false,
    dialogModalOpen: false
}

export function initEvent({schools, sponsors, event}){
    if (event){
        return {...eventState, sponsors: sponsors, schools: schools,
            event: {
                eventTitle: event.title,
                schoolId: event.schoolId,
                image: null,
                imageName: "",
                start: event.start.replace("Z", ""),
                end: event.end.replace("Z", "")
            }
        }
    }
    return {...eventState, sponsors: sponsors, schools: schools}
}

export function eventReducer(state, action) {
    let links, sponsors
    switch (action.type) {
        case SET_EVENT_LINK:
            return {...state, eventLink: action.payload}
        case DIALOG_MODAL:
            return {...state, dialogModalOpen: action.payload}
        case SET_LOADING:
            return {...state, loading: action.payload}
        case SET_EVENT_IMAGE:
            return {...state, event: {...state.event, image: action.payload.image, imageName: action.payload.imageName}}
        case SET_NEW_PLAYER_NAME:
            return {...state, newPlayer: {...state.newPlayer, name: action.payload}}
        case SET_NEW_PLAYER_DEPARTMENT:
            return {...state, newPlayer: {...state.newPlayer, department: action.payload}}
        case SET_NEW_PLAYER_IMAGE:
            return {...state, newPlayer: {...state.newPlayer, image: action.payload.image, imageName: action.payload.imageName}}
        case SET_SPONSORS:
            return {...state, sponsors: action.payload, addSponsor: false, newSponsor: initialSponsorState}
        case SET_NEW_SCHOOL:
            return {...state, newSchool: action.payload}
        case ADD_NEW_SCHOOL:
            return {...state, addSchool: true}
        case SET_SCHOOLS:
            return {...state, schools: action.payload, addSchool: false, newSchool: ""}
        case SET_EVENT_TITLE:
            return {...state, event: {...state.event, eventTitle: action.payload}}
        case SET_SCHOOL_ID:
            return {...state, event: {...state.event, schoolId: action.payload}}
        case SET_START_DATE:
            return {...state, event: {...state.event, start: action.payload}}
        case SET_END_DATE:
            return {...state, event: {...state.event, end: action.payload}}
        case ADD_PLAYER:
            return {...state, players: [...state.players, action.payload], newPlayer: initialPlayerState, addPlayer: false}
        case ADD_NEW_PLAYER:
            return {...state, addPlayer: true}
        case ADD_NEW_SPONSOR:
            return {...state, addSponsor: true}
        case SET_PLAYERS:
            return {...state, players: action.payload, newPlayer: initialPlayerState, addPlayer: false}
        case ADD_LINK:
            sponsors = state.sponsors
            links = sponsors[action.payload.sponsorId].links
            links = [...links, action.payload.link]
            sponsors[action.payload.sponsorId].links = links
            return {...state, sponsors: [...sponsors]}
        case EDIT_SPONSOR_LINK:
            sponsors = state.sponsors
            links = sponsors[action.payload.sponsorId].links
            links[action.payload.linkId] = action.payload.link
            sponsors[action.payload.sponsorId].links = links
            return {...state, sponsors: [...sponsors]}
        case EDIT_SPONSOR_NAME:
            sponsors = state.sponsors
            sponsors[action.payload.sponsorId].name = action.payload.sponsorName
            return {
                ...state,
                sponsors: [...sponsors]
            }
        case ADD_SPONSOR:
            return {...state, sponsors: [...state.sponsors, action.payload], addSponsor: false, newSponsor: initialSponsorState}
        case EDIT_NEW_SPONSOR_LINK:
            links = state.newSponsor.links
            links[action.payload.linkId] = action.payload.link
            return {
                ...state,
                newSponsor: {...state.newSponsor, links: [...links]}
            }
        case ADD_NEW_SPONSOR_LINK:
            return {
                ...state, newSponsor: {...state.newSponsor, links: [...state.newSponsor.links, ""]}
            }
        case SET_SPONSOR_NAME:
            return {...state, newSponsor: {...state.newSponsor, name: action.payload}}
        default:
            throw new Error('No such action')
    }
}

export function setEventTitle(title) {
    return {
        type: SET_EVENT_TITLE,
        payload: title
    }
}

export function setSchoolId(value) {
    return {
        type: SET_SCHOOL_ID,
        payload: value
    }
}

export function setStartDate(value) {
    return {
        type: SET_START_DATE,
        payload: value
    }
}

export function setEndDate(value) {
    return {
        type: SET_END_DATE,
        payload: value
    }
}

export function addPlayer(player) {
    return {
        type: ADD_PLAYER,
        payload: player
    }
}

export function setPlayers(players){
    return {
        type: SET_PLAYERS,
        payload: players
    }
}

export function addLink({sponsorId, link}){
    return {
        type: ADD_LINK,
        payload: {sponsorId, link}
    }
}

export function editSponsorLink({sponsorId, link, linkId}){
    return{
        type: EDIT_SPONSOR_LINK,
        payload: {sponsorId, link, linkId}
    }
}

export function editSponsorName({sponsorId, sponsorName}){
    return {
        type: EDIT_SPONSOR_NAME,
        payload: {sponsorId, sponsorName}
    }
}

export function editNewSponsorLink({linkId, link}){
    return {
        type: EDIT_NEW_SPONSOR_LINK,
        payload: {link, linkId}
    }
}

export function addNewPlayer(){
    return{
        type: ADD_NEW_PLAYER,
    }
}


export function addSponsor(sponsor){
    return {
        type: ADD_SPONSOR,
        payload: sponsor
    }
}

export function addNewSponsor(){
    return {
        type: ADD_NEW_SPONSOR
    }
}

export function addNewSchool(){
    return {
        type: ADD_NEW_SCHOOL
    }
}

export function setSchools(schools){
    return {
        type: SET_SCHOOLS,
        payload: schools
    }
}

export function setNewSchool(school){
    return {
        type: SET_NEW_SCHOOL,
        payload: school
    }
}

export function setSponsors(sponsors){
    return {
        type: SET_SPONSORS,
        payload: sponsors
    }
}

export function setPlayerName(name){
    return {
        type: SET_NEW_PLAYER_NAME,
        payload: name
    }
}

export function setPlayerDepartment(department){
    return{
        type: SET_NEW_PLAYER_DEPARTMENT,
        payload: department
    }
}

export function setPlayerImage({image, imageName}){
    return {
        type: SET_NEW_PLAYER_IMAGE,
        payload: {image, imageName}
    }
}

export function setSponsorName(name){
    return {
        type: SET_SPONSOR_NAME,
        payload: name
    }
}

export function addNewSponsorLink(){
    return{
        type: ADD_NEW_SPONSOR_LINK
    }
}

export function setEventImage({image, imageName}){
    return {
        type: SET_EVENT_IMAGE,
        payload: {image, imageName}
    }
}

export function setLoading(isLoading){
    return {
        type: SET_LOADING,
        payload: isLoading
    }
}

export function setDialogOpen(isOpen){
    return {
        type: DIALOG_MODAL,
        payload: isOpen
    }
}

export function setEventLink(link){
    return{
        type: SET_EVENT_LINK,
        payload: link
    }
}