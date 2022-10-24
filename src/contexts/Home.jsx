import { createContext, useContext, useState } from "react"
const TestContext = createContext();

function UserContextComp() {
    return useContext(TestContext);
}
function HomeContext({ children }) {
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
            <TestContext.Provider value={data}>
                {children}
            </TestContext.Provider>
        </div>
    )
}
export {
    HomeContext,
    UserContextComp
};
