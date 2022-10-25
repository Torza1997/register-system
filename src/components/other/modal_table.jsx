import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
// import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { UseGlobalContext } from "../../contexts/GlobalContext";
import { Table } from 'rsuite';

const { Column, HeaderCell, Cell } = Table;
const checkImg = require('../../assets/images/man.png');
// const dataMock = [
//     { id: 1, firstName: "tor", lastName: "thanatos", phone: "0613041105", chairNo: "10" },
//     { id: 2, firstName: "tor2", lastName: "thanatos2", phone: "0613041105", chairNo: "ยังไม่มีเก้าอี้" }
// ]
export default function ModalTable(data) {
    // const [open, setOpen] = useState(false)
    const { open2, setOpen2 } = data.openUp;
    const cancelButtonRef = useRef(null);
    const { getUser } = UseGlobalContext().user;


    const [sortColumn, setSortColumn] = useState();
    const [sortType, setSortType] = useState();
    const [loading, setLoading] = useState(false);

    const getData = () => {
        if (sortColumn && sortType) {
            return getUser.sort((a, b) => {
                let x = a[sortColumn];
                let y = b[sortColumn];
                if (typeof x === 'string') {
                    x = x.charCodeAt();
                }
                if (typeof y === 'string') {
                    y = y.charCodeAt();
                }
                if (sortType === 'asc') {
                    return x - y;
                } else {
                    return y - x;
                }
            });
        }
        return getUser;
    };

    const handleSortColumn = (sortColumn, sortType) => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSortColumn(sortColumn);
            setSortType(sortType);
        }, 500);
    };
    return (
        <Transition.Root show={open2} as={Fragment}>
            <Dialog as="div" className="relative z-10 w" initialFocus={cancelButtonRef} onClose={setOpen2} style={{ "fontFamily": 'IBM Plex Sans Thai Medium' }} >
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
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-11/12 md:w-9/12 lg:w-7/12">
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
                                                    รายชื่อคนเข้างานทั้งหมด
                                                </Dialog.Title>
                                            </div>

                                            <div className="mt-4">
                                                <Table
                                                    data={getData()}
                                                    sortColumn={sortColumn}
                                                    sortType={sortType}
                                                    onSortColumn={handleSortColumn}
                                                    loading={loading}
                                                >
                                                    <Column width={70} align="center" sortable>
                                                        <HeaderCell>Id</HeaderCell>
                                                        <Cell dataKey="id" />
                                                    </Column>

                                                    <Column width={130} sortable>
                                                        <HeaderCell>ชื่อ</HeaderCell>
                                                        <Cell dataKey="firstName" />
                                                    </Column>

                                                    <Column width={130} sortable>
                                                        <HeaderCell>นามสกุล</HeaderCell>
                                                        <Cell dataKey="lastName" />
                                                    </Column>
                                                    <Column width={130} sortable>
                                                        <HeaderCell>เบอร์โทร</HeaderCell>
                                                        <Cell dataKey="phone" />
                                                    </Column>
                                                    <Column width={130} sortable>
                                                        <HeaderCell>เก้าอี้เบอร์ที่</HeaderCell>
                                                        <Cell>
                                                            {rowData => (
                                                                <span> {rowData.chairNo === null ? `ยังไม่มีเก้าอี้` : rowData.chairNo}</span>
                                                            )}
                                                        </Cell>
                                                    </Column>
                                                </Table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* button */}
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    {/* <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={() => setOpen2(false)}
                                    >
                                        ลงทะเบียน
                                    </button> */}
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={() => setOpen2(false)}
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
