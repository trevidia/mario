import {Dialog, Transition} from '@headlessui/react'
import {Fragment} from "react";
import CheckOutlined from "@mui/icons-material/CheckOutlined";
import InsertLinkOutlined from "@mui/icons-material/InsertLinkOutlined";
import {toast} from "react-toastify";
import {useRouter} from "next/router";
import {setDialogOpen} from "../lib/eventReducer";
const SuccessLinkModal = ({link, openState}) => {
    const {isOpen, dispatch} = openState
    const router = useRouter()
  return (
      <Transition.Root show={isOpen} as={Fragment}>
          <Dialog onClose={()=> {
              dispatch(setDialogOpen(false))
              router.push('/admin')
          }} as={'div'} className={"relative 1-10"}>
              <Transition.Child
              as={Fragment}
              enter={"ease-out duration-300"}
              enterFrom={"opacity-0"}
              enterTo={"opacity-100"}
              leave={"ease-in duration-200"}
              leaveFrom={"opacity-100"}
              leaveTo={"opacity-0"}
              >
                  <div className={'fixed inset-0 bg-gray-500/40 transition-opacity'}/>
              </Transition.Child>
              <div className={'fixed inset-0 z-40 overflow-y-auto'}>
                  <div className={'flex min-h-full items-center justify-center p-4'}>
                      <Transition.Child
                          as={Fragment}
                          enter={"ease-out duration-300"}
                          enterFrom={"opacity-0"}
                          enterTo={"opactiy-100"}
                          leave={"ease-in duration-200"}
                          leaveFrom={"opacity-100"}
                          leaveTo={"opacity-0"}
                      >
                          <Dialog.Panel className={"mx-auto max-w-sm rounded bg-white"}>
                              <div className={'p-4 flex items-center flex-col '}>
                                  <div className={'h-10 w-10 bg-fuchsia-200 flex justify-center items-center rounded-full text-fuchsia-900 mb-2 mt-4'}>
                                      <CheckOutlined/>
                                  </div>
                                  <Dialog.Title as={'h3'} className={'text-lg font-medium leading-6 text-gray-900 text-center'}>
                                      Success
                                  </Dialog.Title>
                                  <Dialog.Description className={'text-gray-500 mt-3'}>
                                      You have successfully created an event share the link below to start voting
                                  </Dialog.Description>
                                  <div onClick={async () => {
                                      await navigator.clipboard.writeText(link)
                                      toast('Copied', {type: "success"})
                                  }} className={"bg-gray-100 w-full cursor-pointer hover:bg-gray-200 transition-colors pl-2 pr-5 py-1 rounded text-fuchsia-400 underline flex justify-between truncate my-2"}>
                                      <span>
                                          {process.env.NEXT_PUBLIC_APP_URL}/{link}
                                      </span>
                                      <InsertLinkOutlined/>
                                  </div>
                              </div>
                          </Dialog.Panel>
                      </Transition.Child>
                  </div>
              </div>
          </Dialog>

      </Transition.Root>
  )
}

export default SuccessLinkModal