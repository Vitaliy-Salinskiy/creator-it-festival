import React from "react";
import Image from "next/image";

export default function Table({name, numb, time, present}){
    return(
        <div className="table">
            <span>{numb}</span>
            <span>{name}</span>
            <span>{time}</span>
            <Image src={`/${present}`} width={50} height={50} className="imagePresent"></Image>
        </div>
    )
}