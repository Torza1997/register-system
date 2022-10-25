import { createContext, useContext, useState } from "react"
const GlobalContext = createContext();

function UseGlobalContext() {
    return useContext(GlobalContext);
}
function GlobalContextComp({ children }) {
    const [text, setText] = useState('tor thanatos');
    function SetText(textInput) {
        setText(textInput);
    }
    const data = {
        text: text,
        newText: {
            SetText
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
