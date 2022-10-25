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
            ChairNo: index,
            active: false
        });
    }
    return ObjChair;
}

function GlobalContextComp({ children }) {
    const [uesr, setUser] = useState([]);
    function SetUser(userInfo) {
        setUser(userInfo);
    }
    const data = {
        chair: Mutichair(),
        user: {
            setUser: SetUser,
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
