import { useState } from 'react';
import { Table, Input, InputGroup } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
// import { UseGlobalContext } from "../contexts/GlobalContext";
const { LayoutDefault } = require('../layouts/default');
const { Column, HeaderCell, Cell } = Table;
const data = [
    { id: 1, firstName: "tor", lastName: "thanatos", phone: "0613041105", chairNo: "10" },
    { id: 2, firstName: "tor2", lastName: "thanatos2", phone: "0613041105", chairNo: "ยังไม่มีเก้าอี้" }
]
const checkImg = require('../assets/images/man2.png');
const styles = {
    marginBottom: 10
};
const CustomInputGroup = ({ placeholder, ...props }) => (
    <InputGroup {...props} style={styles}>
        <Input placeholder={placeholder} />
        <InputGroup.Addon>
            <SearchIcon />
        </InputGroup.Addon>
    </InputGroup>
);

export const Dashboard = () => {
    // const { text, newText } = UseGlobalContext();
    // const changText = () => {
    //     newText.SetText('mother father');
    // }

    const [sortColumn, setSortColumn] = useState();
    const [sortType, setSortType] = useState();
    const [loading, setLoading] = useState(false);

    const getData = () => {
        if (sortColumn && sortType) {
            return data.sort((a, b) => {
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
        return data;
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
        <LayoutDefault>
            <div className='min-h-screen  bg-gray-900 ' >
                <div className='p-5 md:p-24'>
                    <div>
                        <div className="grid grid-cols-1 mb-4 ">
                            <div className='grid justify-items-center'>
                                <img className='mb-3  w-24' src={checkImg} alt="" srcSet="" />
                                <h1 className='justify-items-start ml-3 text-white'>รายชื่อคนเข้างานทั้งหมด</h1>
                            </div>
                        </div>

                    </div>
                    <div className='grid justify-items-center mb-4'>
                        <div className='w-full sm:w-80'>
                            <CustomInputGroup size="lg" placeholder="search" />
                        </div>
                    </div>
                    <Table
                        // height={420}
                        // width={1070}
                        data={getData()}
                        sortColumn={sortColumn}
                        sortType={sortType}
                        onSortColumn={handleSortColumn}
                        loading={loading}
                        className="self-center"
                    >
                        <Column width={70} align="center" sortable>
                            <HeaderCell>Id</HeaderCell>
                            <Cell dataKey="id" />
                        </Column>

                        <Column width={200} sortable>
                            <HeaderCell>ชื่อ</HeaderCell>
                            <Cell dataKey="firstName" />
                        </Column>

                        <Column width={200} sortable>
                            <HeaderCell>นามสกุล</HeaderCell>
                            <Cell dataKey="lastName" />
                        </Column>
                        <Column width={200} sortable>
                            <HeaderCell>เบอร์โทร</HeaderCell>
                            <Cell dataKey="phone" />
                        </Column>
                        <Column width={200} sortable>
                            <HeaderCell>เก้าอี้เบอร์ที่</HeaderCell>
                            <Cell dataKey="chairNo" />
                        </Column>
                        <Column width={200}>
                            <HeaderCell>เลือกที่นั่ง</HeaderCell>
                            <Cell>
                                {rowData => (
                                    <button className='bg-green-500 text-white p-2 py-1 rounded-xl' appearance="ghost" onClick={() => alert(`id:${rowData.id}`)}> เพิ่มที่นั่ง </button>
                                )}
                            </Cell>
                        </Column>
                    </Table>
                </div>
            </div>
        </LayoutDefault>
    );
};
