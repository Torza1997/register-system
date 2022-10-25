// import { UserContextComp } from "../../contexts/Home";
import { useState } from "react";
import Chair from "../other/chair";
import ModalResgister from "../other/modal_resgister";

const regisImg = require('../../assets/images/register.png');
const regisImg2 = require('../../assets/images/customer.png');

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
export const MainComponent = () => {
    // const { text, newText } = UserContextComp();
    // const changText = () => {
    //     newText.SetText('mother father');
    // }
    const [open, setOpen] = useState(false);
    return (
        <div className="grid grid-cols-1">
            <ModalResgister openUp={{ open, setOpen }} />
            {/* card show the rest of chair  */}
            <div className="card-show-people  sm:px-10  sm:pt-10  flex justify-center content-center" >
                <div className="bg-white w-80 h-28 rounded-xl m-5 flex flex-col justify-center border-4 border-black">
                    <h1>จำนวนเก้าอี้ทั้งหมด</h1>
                    <h1 className="text-4xl">{Mutichair().length}</h1>
                </div>
                <div className="bg-white w-80 h-28 rounded-xl  m-5 flex flex-col justify-center border-4 border-black">
                    <h1>จำนวนเก้าอี้ที่เหลือ</h1>
                    <h1 className="text-4xl">{Mutichair().length}</h1>
                </div>
            </div>
            {/* show the chair */}
            <div className="grid grid-cols-2 lg:grid-cols-8 md:grid-cols-6 sm:grid-cols-4 w-full gap-2 justify-items-center p-5 md:p-10 md:px-40">
                {Mutichair().map((chair) => {
                    return <Chair key={chair.ChairNo} numberOfChair={chair.ChairNo} />
                })}
            </div >
            {/* button */}
            <div>
                <button onClick={() => { setOpen(true) }} type="button" className="flex flex-col justify-center w-14 h-14 bg-white rounded-full fixed bottom-0 left-0 mb-5 sm:mb-8 ml-5 hover:bg-gray-300"
                    data-bs-toggle="tooltip" data-bs-html="true" title="ลงทะเบียนเข้างาน">
                    <img className="w-10 self-center" src={regisImg} alt="" srcSet="" />
                </button>
                <button type="button" className="flex flex-col justify-center w-14 h-14 bg-white rounded-full fixed bottom-0 right-0 mb-5 sm:mb-8 mr-5 hover:bg-gray-300"
                    data-bs-toggle="tooltip" data-bs-html="true" title="รายชื่อคนเข้างานทั้งหมด">
                    <img className="w-10 self-center" src={regisImg2} alt="" srcSet="" />
                </button>
            </div>
        </div >
    )
}