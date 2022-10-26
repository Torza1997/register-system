import { createContext, useContext, useState } from "react"
const GlobalContext = createContext();

function UseGlobalContext() {
    return useContext(GlobalContext);
}

const Mutichair = () => {
    const ObjChair = []
    const maxChair = 56;
    for (let index = 0; index < maxChair; index++) {
        ObjChair.push({
            ChairNo: (index + 1),
            userID: null,
            active: false
        });
    }
    return ObjChair;
}
const InCase = [
    "",
    null,
    undefined
]
function GlobalContextComp({ children }) {
    const [user, setUser] = useState([]);
    const [chair, setChair] = useState(Mutichair());
    const [dataFilter, setDataFilter] = useState(null);
    // const [theRestChair, setTheRestChair] = useState(0);

    function SetUserInfo(userInfo) {
        setUser((prevUserInfo) => [
            ...prevUserInfo,
            userInfo
        ]);
    }

    function Filtter(searchValue) {
        if (!InCase.includes(searchValue)) {
            const found = user.filter(
                (item) =>
                    item.id === searchValue ||
                    item.firstName === searchValue ||
                    item.lastName === searchValue ||
                    item.phone === searchValue
            )
            setDataFilter(found);
        } else {
            setDataFilter(user);
        }
    }

    function UpdateChair(chairNo, userId) {
        const arrIndex = chairNo - 1;
        const arrUserIndex = userId - 1;
        setUser((userInfo) => {
            if (userInfo[arrUserIndex].chairNo !== null) {
                //คืนเก้าอี้
                setChair((chairInfo) => {
                    const ChairNo = userInfo[arrUserIndex].chairNo - 1;
                    chairInfo[ChairNo].active = false;
                    chairInfo[ChairNo].userID = null;
                    return chairInfo;
                });
                userInfo[arrUserIndex].chairNo = chairNo;
            } else {
                userInfo[arrUserIndex].chairNo = chairNo;
            }
            return userInfo;
        })
        // set active chair
        setChair((chairInfo) => {
            chairInfo[arrIndex].active = true;
            chairInfo[arrIndex].userID = userId;
            return chairInfo;
        })
    }

    // data output
    const data = {
        chair: chair,
        updateChair: UpdateChair,
        dataFilter: dataFilter,
        funcFiltter: Filtter,
        user: {
            setUser: SetUserInfo,
            getUser: user
        }

    }
    return (
        <div>
            <GlobalContext.Provider value={data}>
                {children}
            </GlobalContext.Provider>
        </div>
    )
}
export {
    GlobalContextComp,
    UseGlobalContext
};
