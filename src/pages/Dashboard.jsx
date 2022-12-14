import { useState } from 'react';
import { Table, Input, InputGroup } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import { UseGlobalContext } from "../contexts/GlobalContext";
const { LayoutDefault } = require('../layouts/default');
const { Column, HeaderCell, Cell } = Table;
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
    const { user, chair, updateChair, dataFilter, funcFiltter } = UseGlobalContext();

    const [sortColumn, setSortColumn] = useState();
    const [sortType, setSortType] = useState();
    const [loading, setLoading] = useState(false);
    const [chairNo, setChairNo] = useState(null);

    const refreshTable = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 300);
    }
    const testOncheng = (e) => {
        const value = e.target.value;
        setChairNo(value === "" ? null : parseInt(value));
    }
    const confirmChairNo = (userId) => {
        if (chairNo !== null) {
            updateChair(chairNo, userId);
            refreshTable();
        }
    }
    const searchData = (e) => {
        funcFiltter(e.target.value);
        refreshTable();
    }
    const getData = () => {
        const data = dataFilter ? dataFilter : user.getUser;
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
                                <img className='mb-5  w-24' src={checkImg} alt="" srcSet="" />
                                <p className='justify-items-start ml-3 text-white sm:text-5xl text-3xl'>?????????????????????????????????????????????????????????????????????</p>

                                <div className="grid md:grid-cols-3 sm:grid-cols-2 justify-items-center gap-x-1" >
                                    <div className="bg-white md:w-44 h-28 w-60 rounded-xl m-5 flex flex-col justify-center border-4 border-black self-center">
                                        <p>?????????????????????????????????????????????????????????</p>
                                        <h1>{chair.length}</h1>
                                    </div>
                                    <div className="bg-white md:w-44 h-28 w-60 rounded-xl  m-5 flex flex-col justify-center border-4 border-black self-center">
                                        <p>????????????????????????????????????????????????????????????</p>
                                        <h1>{chair.filter(item => item.active === false).length}</h1>
                                    </div>
                                    <div className="bg-white md:w-44 h-28 w-60 rounded-xl  m-5 flex flex-col justify-center border-4 border-black self-center">
                                        <p>??????????????????????????????????????????</p>
                                        <h1>{user.getUser.length}</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='grid justify-items-center mb-4'>
                        <div className='w-full sm:w-80'>
                            <CustomInputGroup onChange={searchData} size="lg" placeholder="search" />
                        </div>
                    </div>
                    <Table
                        height={420}
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
                            <HeaderCell>????????????</HeaderCell>
                            <Cell dataKey="firstName" />
                        </Column>

                        <Column width={200} sortable>
                            <HeaderCell>?????????????????????</HeaderCell>
                            <Cell dataKey="lastName" />
                        </Column>
                        <Column width={200} sortable>
                            <HeaderCell>????????????????????????</HeaderCell>
                            <Cell dataKey="phone" />
                        </Column>
                        <Column width={200} sortable>
                            <HeaderCell>?????????????????????????????????????????????</HeaderCell>
                            <Cell>
                                {rowData => (
                                    <span> {rowData.chairNo === null ? `?????????????????????????????????????????????` : rowData.chairNo}</span>
                                )}
                            </Cell>
                        </Column>
                        <Column width={210}>
                            <HeaderCell>????????????????????????????????????</HeaderCell>
                            <Cell>
                                {rowData => (
                                    <select onChange={testOncheng}>
                                        <option value="">select chair</option>
                                        {
                                            chair.map((item) => (!item.active ? <option key={item.ChairNo} value={item.ChairNo}>{item.ChairNo}</option> : null))
                                        }
                                    </select>
                                )}
                            </Cell>
                        </Column>
                        <Column width={80}>
                            <HeaderCell>action</HeaderCell>
                            <Cell>
                                {rowData => (
                                    <button
                                        className='bg-green-500 text-white p-2 py-1 rounded-xl'
                                        appearance="ghost"
                                        onClick={() => confirmChairNo(rowData.id)}>
                                        ?????????????????????
                                    </button>
                                )}
                            </Cell>
                        </Column>
                    </Table>
                </div>
            </div>
        </LayoutDefault >
    );
};
