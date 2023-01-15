import BaseLayout from "../../../components/BaseLayout";

const NewEvent = () => {
  return (
      <BaseLayout>
          <div className={'w-full h-full rounded-md bg-white mb-3 drop-shadow px-4 py-6 flex justify-center'}>
             <div className={'w-3/5'}>
                 <div>
                     <h4 className={"text-2xl"}>
                         Event
                     </h4>
                     <div className={'w-full flex justify-between'}>
                      <h6 className={'text-lg'}>
                          Event title
                      </h6>
                         <input type={'text'} className={'input'}/>
                     </div>
                     <div className={'w-full flex justify-between'}>
                         <span className={'text-lg'}>
                             School
                         </span>
                         <select>
                             <option>
                                 dominican
                             </option>
                         </select>
                     </div>
                     <span className={''}>
                         Add School
                     </span>
                     <div className={'w-full flex justify-between'}>
                         <span>Start Date</span>
                         <input type={'datetime-local'} value={'2023-10-30T02:33'} onChange={(e)=> console.log(e.target.value)}/>
                     </div>
                     <div className={'w-full flex justify-between'}>
                         <span>End Date</span>
                         <input type={'datetime-local'} value={'2023-10-30T02:33'} onChange={(e)=> console.log(e.target.value)}/>
                     </div>
                 </div>
                 <div>
                     <h2>
                         Players
                     </h2>
                     <span>
                          Add player
                      </span>
                 </div>
                 <div>
                     <h2>
                         Sponsors
                     </h2>
                     <div>
                         Add Sponsor
                     </div>
                 </div>
                 <button>
                     Create Event Link
                 </button>
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