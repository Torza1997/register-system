import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
// import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { UseGlobalContext } from "../../contexts/GlobalContext";

const checkImg = require('../../assets/images/note.png');

export default function ModalResgister(data) {
    const { user, chair } = UseGlobalContext();
    const { getUser, setUser } = user;
    const { open, setOpen } = data.openUp;
    const cancelButtonRef = useRef(null);

    const firstName = useRef(null);
    const lastName = useRef(null);
    const phone = useRef(null);
    const InCase = [
        "",
        null,
        undefined
    ]
    const UpdateUserInfo = () => {
        if (!InCase.includes(firstName.current?.value)) {
            setUser({
                id: getUser.length + 1,
                firstName: firstName.current.value,
                lastName: lastName.current.value,
                phone: phone.current.value,
                chairNo: null
            });
            setTimeout(() => {
                setOpen(false);
            }, 300);
        }
    }
    const UelectComp = () => {
        return chair.filter(item => item.active === false).length !== 0 ? (
            <div className="mt-4">
                <div className='flex flex-col'>
                    <label className='mr-2'>ชื่อ: </label>
                    <input ref={firstName} type="text" className="form-input px-4 py-3 rounded-xl bg-gray-300 mb-2" />
                </div>
                <div className='flex flex-col'>
                    <label className='mr-2'>นามสกุล: </label>
                    <input ref={lastName} type="text" className="form-input px-4 py-3 rounded-xl bg-gray-300 mb-2" />
                </div>
                <div className='flex flex-col'>
                    <label className='mr-2'>เบอร์โทร: </label>
                    <input ref={phone} type="tel" className="form-input px-4 py-3 rounded-xl bg-gray-300 mb-2" />
                </div>
            </div>
        ) : (
            <h3 className='mt-5'>ที่นั้งเต็มแล้ว</h3>
        )
    }
    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen} style={{ "fontFamily": 'IBM Plex Sans Thai Medium' }} >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-4/5 sm:w-full sm:max-w-lg">
                                {/* body */}
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    {/* <div className="sm:flex sm:items-start"> */}
                                    <div>
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <div className='flex'>
                                                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                                    <img src={checkImg} alt="" srcSet="" />
                                                </div>
                                                <Dialog.Title as="h3" className="ml-3 self-center text-lg font-medium leading-6 text-gray-900">
                                                    ลงทะเบียนเข้างาน
                                                </Dialog.Title>
                                            </div>
                                            <UelectComp />
                                        </div>
                                    </div>
                                </div>
                                {/* button */}
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={UpdateUserInfo}
                                    >
                                        ลงทะเบียน
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={() => setOpen(false)}
                                        ref={cancelButtonRef}
                                    >
                                        ออก
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root >
    )
}
