import '../assets/css/home.css';
// import { UseGlobalContext } from "../contexts/GlobalContext";
// const { HomeContext } = require('../contexts/Home.jsx');
const { MainComponent } = require('../components/home/mainComponent.jsx');
const { LayoutDefault } = require('../layouts/default');


function Home() {
    // const { text, newText } = UseGlobalContext();
    return (
        <LayoutDefault>
            {/* <HomeContext> */}
            <div className="bg-gray-900 h-full min-h-screen">
                <MainComponent />
            </div>
            {/* </HomeContext > */}
        </LayoutDefault>
    );
}
export {
    Home
}