import {setEventImage, setEventTitle} from "../lib/eventReducer";

const LabelInput = ({label, onChange, value, type}) => {
    return (
        <div className={'w-full flex justify-between mb-3 flex-wrap'}>
            <h6 className={'input-label'}>
                {label}
            </h6>
            {
                type === "file" ? (
                    <input
                        type={'file'}
                        className={'file-input mt-2 md:mt-0'}
                        value={value}
                        onChange={onChange} accept={'image/*'}/>
                    ) :
                    (
                        <input
                            type={type ?? "text"}
                            className={ 'input mt-2 md:mt-0'}
                            value={value}
                            onChange={onChange}/>
                )
            }
        </div>
    )
}

export default LabelInput