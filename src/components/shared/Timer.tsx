"use client";

import { useState, useEffect } from "react";
import TextTransition, { presets } from "react-text-transition";

import { ITimer } from "@/interfaces";

const Timer = () => {
  const [time, setTime] = useState<ITimer>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [index] = useState(0);

  useEffect(() => {
    const targetHour: number = +process.env.NEXT_PUBLIC_TARGET_HOUR!;
    let delay = 0;

    const interval = setInterval(() => {
      if (delay === 0) {
        delay = 1000;
      }

      const now = new Date();
      const target = new Date();
      target.setHours(targetHour, 0, 0, 0);

      let diff = target.getTime() - now.getTime();

      if (diff < 0) {
        clearInterval(interval);
        setTime({ hours: 0, minutes: 0, seconds: 0 });
      } else {
        const hours = Math.floor(
          (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        setTime({ hours, minutes, seconds });
      }
    }, delay);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-px text-white font-semibold">
      <h3 className="text-2xl leading-[29px]">Початок через:</h3>
      <div className="!overflow-hidden min-h-[60px]  py-3 relative">
        <TextTransition
          inline
          className="text-6xl"
          springConfig={presets.wobbly}
          key={index}
        >
          {`${time.hours.toString().padStart(2, "0")} 
          : ${time.minutes.toString().padStart(2, "0")} 
          : ${time.seconds.toString().padStart(2, "0")}`}
        </TextTransition>
      </div>
    </div>
  );
};

export default Timer;
