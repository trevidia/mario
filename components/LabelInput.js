import {setEventImage, setEventTitle} from "../lib/eventReducer";

const LabelInput = ({label, onChange, value, type}) => {
    return (
        <div className={'w-full flex justify-between mb-3 flex-wrap place-content-stretch'}>
            <h6 className={'input-label'}>
                {label}
            </h6>
            {
                type === "file" ? (
                    <input
                        type={'file'}
                        className={'file-input'}
                        value={value}
                        onChange={onChange} accept={'image/*'}/>
                    ) :
                    (
                        <input
                            type={type ?? "text"}
                            className={ 'admin-input'}
                            value={value}
                            onChange={onChange}/>
                )
            }
        </div>
    )
}

export default LabelInput