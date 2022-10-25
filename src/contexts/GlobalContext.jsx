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

function GlobalContextComp({ children }) {
    const [uesr, setUser] = useState([]);
    const [chair, setChair] = useState(Mutichair());

    function SetUserInfo(userInfo) {
        setUser((prevUserInfo) => [
            ...prevUserInfo,
            userInfo
        ]);
    }
    function UpdateChair(chairNo, userId) {
        console.log(userId, chairNo);
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
    const data = {
        chair: chair,
        updateChair: UpdateChair,
        user: {
            setUser: SetUserInfo,
            getUser: uesr
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
