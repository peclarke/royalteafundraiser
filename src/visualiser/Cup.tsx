import { useMemo } from "react";
import { Milestone } from "./Milestone";

import One from "../assets/1.png";
import OneFilled from "../assets/1Filled.png";
import FinalOne from "../assets/250.png";

import Two from "../assets/2.png";
import TwoFilled from "../assets/2Filled.png";
import FinalTwo from "../assets/500.png";

import Three from "../assets/3.png";
import ThreeFilled from "../assets/3Filled.png";
import FinalThree from "../assets/750.png";

import Four from "../assets/4.png";
import FourFilled from "../assets/4Filled.png";
import FinalFour from "../assets/1000.png";

import Five from "../assets/5.png";
import FiveFilled from "../assets/5Filled.png";
import FinalFive from "../assets/1250.png";

import Six from "../assets/6.png";
import SixFilled from "../assets/6Filled.png";
import FinalSix from "../assets/1500.png"

import CombinedAvatars from "./Avatar";

type CupProps = {
    ImageSource: string;
    ImageSource2: string;
    donations: number;
    activeMilestone: Milestone;
    setCurrentProgress: (val: number) => void;
}

type BlankCupProps = {
    ImageSource: string | undefined;
}

export const BlankCup = ({ImageSource}: BlankCupProps) => {
    return (
        <img src={ImageSource} className="teacup-root"/>
    )
} 

const Cup = ({ImageSource, ImageSource2 = "", donations, activeMilestone, setCurrentProgress}: CupProps) => {
    // variables for fun math
    const endRatio = 0.65;
    const start = 10;
    const fixedMilestoneAmt = 250; // the crux is that intervals are only 250

    // fun math to deal with donation / milestone / percentage filled amount
    const calculateProgress = () => {
        const subAmt = (Math.floor(activeMilestone.value / fixedMilestoneAmt) - 1) * fixedMilestoneAmt;
        const percentageProgress = (donations % fixedMilestoneAmt) / (activeMilestone.value - subAmt) * 100;
        setCurrentProgress(percentageProgress);
        return (100 - percentageProgress) * endRatio + start;
    }

    // Rerun the calculations each time donations are updated
    const progress = useMemo(calculateProgress, [donations])
  
    const teaCupStyle = { clipPath: 'inset('+progress+'% 0 0 0)', zIndex: 0}

    return (
        <>
            {/* <CombinedAvatars /> */}
            <div className="teacup-container">
                <CombinedAvatars />
                <img 
                src={ImageSource2} 
                className="teacup-root teacup-main"
                style={teaCupStyle}
                key={progress}
                />
                <img src={ImageSource} className="teacup-root teacup-main"/>
            </div>
        </>
    )
}

// ----------------------------------------------------------------

export type TeacupImageType = {
    baseUrl: string;
    filledUrl: string;
    finalUrl: string;
    donationValue: number;
    donationStyle: Record<string, string>;
}

export const teacupImages: TeacupImageType[] = [
    {
        baseUrl: One,
        filledUrl: OneFilled,
        finalUrl: FinalOne,
        donationValue: 250,
        donationStyle: {
          backgroundColor: 'rgb(182, 127, 0)',
          color: 'rgb(252, 255, 173)',
        }
    },
    {
      baseUrl: Two,
      filledUrl: TwoFilled,
      finalUrl: FinalTwo,
      donationValue: 500,
      donationStyle: {
        backgroundColor: 'rgb(0, 176, 182)',
        color: 'rgb(173, 251, 255)',
      }
    },
    {
      baseUrl: Three,
      filledUrl: ThreeFilled,
      finalUrl: FinalThree,
      donationValue: 750,
      donationStyle: {
        backgroundColor: 'rgb(18, 182, 0)',
        color: 'rgb(173, 255, 181)',
      }
    },
    {
      baseUrl: Four,
      filledUrl: FourFilled,
      finalUrl: FinalFour,
      donationValue: 1000,
      donationStyle: {
        backgroundColor: 'rgb(161, 0, 182)',
        color: 'rgb(245, 173, 255)',
      }
    },
    {
      baseUrl: Five,
      filledUrl: FiveFilled,
      finalUrl: FinalFive,
      donationValue: 1250,
      donationStyle: {
        backgroundColor: 'rgb(182, 0, 0)',
        color: 'rgb(255, 173, 173)',
      }
    },
    {
      baseUrl: Six,
      filledUrl: SixFilled,
      finalUrl: FinalSix,
      donationValue: 1500,
      donationStyle: {
        backgroundColor: 'rgb(0, 182, 179)',
        color: 'rgb(173, 255, 251)',
      }
    }
  ];

export default Cup;