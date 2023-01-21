import {Fragment, useEffect, useState} from 'react'
import {Listbox, Transition} from '@headlessui/react'
import {CheckIcon, ChevronUpDownIcon} from '@heroicons/react/20/solid'
import {setSchoolId} from "../lib/eventReducer";


export default function SchoolDropDown({schools, dispatch}) {
    const [selected, setSelected] = useState(schools[0])

    useEffect(() => {
        dispatch(setSchoolId(selected.schId))
    }, [selected])

    return (
        <div className="min-w-[15rem]">
            <Listbox value={selected} onChange={setSelected}>
                <div className="relative mt-1">
                    <Listbox.Button
                        className="relative w-full cursor-default rounded-[3px] bg-white py-3 pl-3 pr-10 text-left border border-zinc-400 focus:outline-none focus-visible:border-fuchsia-400 focus-visible:ring-2  focus-visible:ring-fuchsia-400/50 focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-fuchsia-300 sm:text-sm">
                        <span className="block truncate">{selected.name}</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                        </span>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options
                            className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {schools.map((school, schoolIdx) => (
                                <Listbox.Option
                                    key={schoolIdx}
                                    className={({active}) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-fuchsia-100 text-fuchsia-900' : 'text-gray-900'}`}
                                    value={school}>
                                    {({selected}) => (
                                        <>
                                            <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                                {school.name}
                                            </span>
                                            {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-fuchsia-600">
                                                    <CheckIcon className="h-5 w-5" aria-hidden="true"/>
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    )
}
