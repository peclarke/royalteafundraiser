import { useEffect, useMemo, useState } from "react";
import { Milestone } from "./Milestone";

import One from "./assets/1.png";
import OneFilled from "./assets/1Filled.png";
import Two from "./assets/2.png";
import TwoFilled from "./assets/2Filled.png";
import Three from "./assets/3.png";
import ThreeFilled from "./assets/3Filled.png";
import Four from "./assets/4.png";
import FourFilled from "./assets/4Filled.png";
import Five from "./assets/5.png";
import FiveFilled from "./assets/5Filled.png";
import Six from "./assets/6.png";
import SixFilled from "./assets/6Filled.png";

type CupProps = {
    ImageSource: string;
    ImageSource2: string;
    donations: number;
    activeMilestone: Milestone;
}

type BlankCupProps = {
    ImageSource: string | undefined;
}

export const BlankCup = ({ImageSource}: BlankCupProps) => {
    return (
        <img src={ImageSource} className="teacup-root"/>
    )
} 

const Cup = ({ImageSource, ImageSource2 = "", donations, activeMilestone}: CupProps) => {
    // variables for fun math
    const endRatio = 0.65;
    const start = 10;
    const fixedMilestoneAmt = 250; // the crux is that intervals are only 250

    // fun math to deal with donation / milestone / percentage filled amount
    const calculateProgress = () => {
        const subAmt = (Math.floor(activeMilestone.value / fixedMilestoneAmt) - 1) * fixedMilestoneAmt;
        const percentageProgress = (donations % fixedMilestoneAmt) / (activeMilestone.value - subAmt) * 100;
        return (100 - percentageProgress) * endRatio + start;
    }

    // Rerun the calculations each time donations are updated
    const progress = useMemo(calculateProgress, [donations])
  
    const teaCupStyle = { clipPath: 'inset('+progress+'% 0 0 0)'}

    return (
        <>
        <img 
        src={ImageSource2} 
        className="teacup-root teacup-main"
        style={teaCupStyle}
        key={progress}
        />
        <img src={ImageSource} className="teacup-root teacup-main"/>
        </>
    )
}

// ----------------------------------------------------------------

export type TeacupImageType = {
    baseUrl: string;
    filledUrl: string;
    donationValue: number;
}

export const teacupImages: TeacupImageType[] = [
    {
        baseUrl: One,
        filledUrl: OneFilled,
        donationValue: 250,
    },
    {
      baseUrl: Two,
      filledUrl: TwoFilled,
      donationValue: 500,
    },
    {
      baseUrl: Three,
      filledUrl: ThreeFilled,
      donationValue: 750,
    },
    {
      baseUrl: Four,
      filledUrl: FourFilled,
      donationValue: 1000,
    },
    {
      baseUrl: Five,
      filledUrl: FiveFilled,
      donationValue: 1250,
    },
    {
      baseUrl: Six,
      filledUrl: SixFilled,
      donationValue: 1500,
    }
  ];

export default Cup;