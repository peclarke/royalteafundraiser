import { Button, Grid2 as Grid } from '@mui/material';
import './App.css';

import { useMemo, useState } from 'react';
import Cup, { BlankCup, teacupImages } from './Cup';
import DefaultMilestones, { Milestone } from './Milestone';

function App() {
  // internal state
  const [donations, setDonations] = useState<number>(0);
  const [milestones, setMilestones] = useState<Milestone[]>(DefaultMilestones);

  const [currentProgress, setCurrentProgress] = useState<number>(0);

  const activeMilestone = useMemo(() => { 
    const nextMilestones = milestones.filter(milestone => milestone.value > donations);
    if (nextMilestones.length > 0) {
      return nextMilestones[0];
    } else {
      return undefined;
    }
  }, [donations]);

  // Recalculate the following when we reach a new milestone
  const activeTeacup = useMemo(() => { 
    const nextCups = teacupImages.filter(image => image.donationValue > donations);
    if (nextCups.length > 0) {
      return nextCups[0];
    } else {
      return undefined;
    }
  }, [activeMilestone]);
  
  const nextCup = useMemo(() => {
    const afterGroup = teacupImages.filter(image => image.donationValue > (donations + 250));
    const after = afterGroup.length > 0 ? afterGroup[0].baseUrl : undefined;
    return after;
  }, [activeMilestone])

  const previousCups = useMemo(() => {
    const beforeGroup = teacupImages.filter(image => image.donationValue <= donations);
    const beforeUrls = beforeGroup.map(image => image.finalUrl ?? image.filledUrl);
    return beforeUrls;
  }, [activeMilestone])

  const defaultStyling = {
    backgroundColor: 'rgb(90, 90, 90)',
    color: 'white'
  }

  const styleExists = !(activeMilestone && activeMilestone.reward);

  // firebase trickery

  // rendering
  return (
    <>
    <div className="title">
      <span>THE ROYAL TEA FUNDRAISER</span>
    </div>
    <Grid container spacing={2}>
      <Grid size={2} className="container-previous">
        {
          previousCups.map(url => <BlankCup ImageSource={url} />)
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
        <BlankCup ImageSource={nextCup}/>
        <Button onClick={() => setDonations(donations + 100)} variant="contained">Add</Button>
      </Grid>
    </Grid>
    </>
  )
}

export default App
