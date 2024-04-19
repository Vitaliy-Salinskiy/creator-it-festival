import React from "react";
import Image from "next/image";
import './style.css'
import Table from "./table/table";

let arr = [
    {
        name: 'Robert Green',
        numb: 341,
        time: '14:88',
        present: 'present.png'
    },
    {
        name: 'Robert Green',
        numb: 341,
        time: '14:88',
        present: 'present.png'
    },
    {
        name: 'Robert Green',
        numb: 341,
        time: '14:88',
        present: 'present.png'
    },
    {
        name: 'Robert Green',
        numb: 341,
        time: '14:88',
        present: 'present.png'
    },
    {
        name: 'Robert Green',
        numb: 341,
        time: '14:88',
        present: 'present.png'
    }
]

export default function WinnersTable(){
    return(
        <>
        <header className="head">Переможці<br />Creator Festivale</header>
        <div className="winnersCont">
            <div className="left">
                {arr.map(item=><Table key={item} name={item.name} numb={item.numb} time={item.time} present={item.present} />)}
            </div>
            <div className="right">
                <Image src={'/undraw_gifts_0ceh 1.png'} width={800} height={800} className="img_right"></Image>
            </div>
        </div>
        </>
    )
}