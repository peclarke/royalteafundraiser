import { useState } from "react";
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
    // percentage croppings
    const end = 75;
    const start = 10;

    /**
     * This controls the amount of 
     */
    const [progress, setProgress] = useState<number>((100 - (donations / activeMilestone.value * 100)) * 0.65 + 10);

    // const [progress, setProgress] = useState<number>(percentageComplete * 0.65 + 10);
  
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