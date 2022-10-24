// import { UserContextComp } from "../../contexts/Home";
import Chair from "../other/chair";

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
    return (
        <div className="grid grid-cols-2 lg:grid-cols-8 md:grid-cols-6 sm:grid-cols-4 w-full gap-2 justify-items-center p-5 md:p-10 md:px-40">
            {Mutichair().map((chair) => {
                return <Chair key={chair.ChairNo} numberOfChair={chair.ChairNo} />
            })}
        </div >
    )
}