import { Grid2 as Grid } from '@mui/material';
import '../App.css';

import { useEffect, useMemo, useState } from 'react';
import Cup, { BlankCup, teacupImages, TeacupImageType } from './Cup';
import DefaultMilestones, { Milestone } from './Milestone';
import { database } from '../db';
import { off, onChildAdded, onChildChanged, onChildRemoved, onValue, ref } from 'firebase/database';
import { ScreenTypes } from '../admin/Admin';
import MilestoneScreen from '../milestones/MilestoneScreen';
import WheelScreen from '../wheel/Wheel';
import Competition from '../competition/Competition';
import RaffleScreen from '../raffle/Raffle';

function App() {
  // internal state
  const [donations, setDonations] = useState<number>(0);
  const [milestones, setMilestones] = useState<Milestone[]>(DefaultMilestones);
  const [type, setType] = useState<ScreenTypes>("visual");

  const [currentProgress, setCurrentProgress] = useState<number>(0);

  const activeMilestone = useMemo(() => { 
    const nextMilestones = milestones.filter(milestone => milestone.value > donations);
    if (nextMilestones.length > 0) {
      return nextMilestones[0];
    } else {
      return undefined;
    }
  }, [donations, milestones]);

  // Recalculate the following when we reach a new milestone
  const activeTeacup = useMemo(() => { 
    const nextCups = teacupImages.filter(image => image.donationValue > donations);
    if (nextCups.length > 0) {
      return nextCups[0];
    } else {
      return undefined;
    }
  }, [activeMilestone]);

  const getShortDesc = (image: TeacupImageType) => {
    const group = milestones.filter(ms => ms.value === image.donationValue);
    if (group.length > 0) {
      return group[0].short;
    } else {
      return "No description"
    }
  }
  
  const nextCup = useMemo(() => {
    const afterGroup = teacupImages.filter(image => image.donationValue > (donations + 250));
    const after = afterGroup.length > 0 ? afterGroup[0].baseUrl : undefined;
    return {
      url: after,
      short: afterGroup.length > 0 ? getShortDesc(afterGroup[0]) : ""
    };
  }, [activeMilestone])

  const previousCups = useMemo(() => {
    const beforeGroup = teacupImages.filter(image => image.donationValue <= donations);

    const beforeUrls = beforeGroup.map(image => { return {
      ...image,
      finalUrl: image.finalUrl ?? image.filledUrl,
      short: getShortDesc(image)
    }});
    return beforeUrls;
  }, [activeMilestone])

  const defaultStyling = {
    backgroundColor: 'rgb(90, 90, 90)',
    color: 'white'
  }

  const styleExists = !(activeMilestone && activeMilestone.reward);

  // firebase trickery
  useEffect(() => {
    // refs for interactions
    const dbDonations  = ref(database, 'donations');
    const dbMilestones = ref(database, 'milestones');
    const dbType = ref(database, 'type');

    // listeners
    onValue(dbDonations, (snapshot) => {
      const newValue = snapshot.val();
      setDonations(newValue);
    })

    onValue(dbType, (snapshot) => {
      const type = snapshot.val();
      setType(type);
    })

    onChildAdded(dbMilestones, (data) => {
      const milestone: Milestone = data.val();
      setMilestones([...milestones, milestone]
      );
    })

    onChildRemoved(dbMilestones, (data) => {
      const goneMilestone: Milestone = data.val();
      const newMs = milestones.filter(milestone => milestone.reward !== goneMilestone.reward);
      setMilestones(newMs);
    })

    onChildChanged(dbMilestones, (data) => {
      const index = parseInt(data.key as string);
      const newMs = milestones.map((milestone, i) => i === index ? data.val() : milestone);
      setMilestones(newMs);
    });

    // once off get all milestones
    onValue(dbMilestones, (snapshot) => {
      const ms: Milestone[] = []
      snapshot.forEach((childSnapshot) => {
        const childData = childSnapshot.val();
        ms.push(childData);
      });
      setMilestones(ms);
    }, {
      onlyOnce: true
    });
    
    return () => {
      off(dbDonations);
      off(dbMilestones);
      off(dbType);
    }
  }, [])

  // rendering
  return (
    type === "visual" ? <>
      <div className="title">
        <span>THE ROYAL TEA FUNDRAISER</span>
      </div>
      <Grid container spacing={2}>
        <Grid size={2} className="container-previous">
          {
            previousCups.map(img => 
              <div className="blankCup">
                <BlankCup ImageSource={img.finalUrl} />
                <span style={{fontSize: '20px'}}>{img.short}</span>
              </div>
            )
          }
        </Grid>
        <Grid size={8} className="container feature">
          <div className="feature-content" style={styleExists ? {gap: '10em'} : {}}>
            <div className="info-container">

              <div className="donation-container" style={activeTeacup ? activeTeacup.donationStyle : defaultStyling}>
                <span>${donations}</span>
                <span>raised</span>
              </div>

              {activeMilestone && <div className="milestone-container" style={!styleExists ? {border: '4px dashed ' + activeTeacup?.donationStyle.backgroundColor} : {}}>
                <div className="milestone">
                  <span>{activeMilestone.reward}</span>
                </div>
                {activeTeacup && <div className="progress" style={!styleExists ? activeTeacup.donationStyle : {}}>
                  <span>{currentProgress}%</span>
                  <span>complete</span>
                </div>}
              </div>}
            </div>
            {(activeTeacup && activeMilestone) ? <Cup 
              ImageSource={activeTeacup.baseUrl}
              ImageSource2={activeTeacup.filledUrl}
              donations={donations}
              activeMilestone={activeMilestone}
              setCurrentProgress={setCurrentProgress}
            /> : <img src="https://i.imgflip.com/94powm.jpg" id="theking"/>
            }
          </div>
        </Grid>
        <Grid size={2} className="container">
          <div className="blankCup">
            <BlankCup ImageSource={nextCup.url} />
            <span style={{fontSize: '20px', marginLeft: '5px', marginRight: '5px'}}>{nextCup.short}</span>
          </div>
        </Grid>
      </Grid>
      </> : type === "milestone" ? <MilestoneScreen donations={donations} milestones={milestones}/> 
      : type === "spin" ? <WheelScreen/> 
      : type === "competition" ? <Competition /> 
      : type === "raffle" ? <RaffleScreen /> : <></>
  )
}

export default App
