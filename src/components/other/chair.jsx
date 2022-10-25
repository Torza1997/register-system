import { useState } from 'react';

const chair = require('../../assets/images/armchair.png');
const chair2 = require('../../assets/images/armchair2.png');
const checkImg = require('../../assets/images/check.png');


const ChairRed = ({ num, setCheck }) => {
    const checkFunc = () => {
        setCheck(true);
    }
    return <div className="flex content-center justify-center " onClick={checkFunc} >
        <p className='absolute text-2xl text-white'>{num + 1}</p>
        <img className="w-24" src={chair} alt="" srcSet="" />
    </div>
}
const ChairGray = ({ num }) => {
    return <div className="flex content-center justify-center " >
        <p className='absolute text-2xl text-white'>{num + 1}</p>
        <img className="w-24" src={chair2} alt="" srcSet="" />
    </div>
}
const ChairGrayCheck = ({ num, setCheck }) => {
    const checkFunc = () => {
        setCheck(false);
    }
    return <div className="flex content-center justify-center " onClick={checkFunc} >
        <img className="w-10 absolute" src={checkImg} alt="" srcSet="" />
        <img className="w-24" src={chair2} alt="" srcSet="" />
    </div>
}
export default function Chair({ numberOfChair }) {
    const [check, setCheck] = useState(false);
    const SeclectChair = check ? ChairGrayCheck : ChairRed;
    return (
        <div className="w-24">
            <SeclectChair num={numberOfChair} setCheck={setCheck} />
        </div>
    )
}