import { useEffect, useMemo, useState } from "react";
import { Milestone } from "./Milestone";

type CupProps = {
    ImageSource: string;
    ImageSource2: string;
    donations: number;
    activeMilestone: Milestone;
}

type BlankCupProps = {
    ImageSource: string;
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

export default Cup;