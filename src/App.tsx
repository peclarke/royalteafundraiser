import { Button, Grid2 as Grid } from '@mui/material';
import './App.css';

import { useMemo, useState } from 'react';
import Cup, { BlankCup, teacupImages } from './Cup';
import DefaultMilestones, { Milestone } from './Milestone';

function App() {
  // internal state
  const [donations, setDonations] = useState<number>(0);
  const [milestones, setMilestones] = useState<Milestone[]>(DefaultMilestones);

  const activeMilestone = useMemo(() => { return milestones.filter(milestone => milestone.value > donations)[0] }, [donations]);

  // Recalculate the following when we reach a new milestone
  const activeTeacup = useMemo(() => { return teacupImages.filter(image => image.donationValue > donations)[0] }, [activeMilestone]);
  const nextCup = useMemo(() => {
    // const beforeGroup = teacupImages.filter(image => image.donationValue <= donations);
    // const before = beforeGroup.length > 0 ? beforeGroup[beforeGroup.length - 1].filledUrl : undefined;

    const afterGroup = teacupImages.filter(image => image.donationValue > (donations + 250));
    const after = afterGroup.length > 0 ? afterGroup[0].baseUrl : undefined;

    return after;
  }, [activeMilestone])

  const previousCups = useMemo(() => {
    const beforeGroup = teacupImages.filter(image => image.donationValue <= donations);
    // const before = beforeGroup.length > 0 ? beforeGroup[beforeGroup.length - 1].filledUrl : undefined;
    const beforeUrls = beforeGroup.map(image => image.filledUrl);
    return beforeUrls;
  }, [activeMilestone])

  // firebase trickery

  // rendering
  return (
    <>
    <div className="title">
      <span>THE ROYAL TEA FUNDRAISER</span>
    </div>
    <Grid container spacing={2}>
      <Grid size={2} className="container-previous">
        {/* <BlankCup ImageSource={surroundingCups[0]}/> */}
        {
          previousCups.map(url => <BlankCup ImageSource={url} />)
        }
      </Grid>
      <Grid size={8} className="container feature">
        <div className="feature-content">
          <div>
            <p>Hello</p>
          </div>
          <Cup 
            ImageSource={activeTeacup.baseUrl}
            ImageSource2={activeTeacup.filledUrl}
            donations={donations}
            activeMilestone={activeMilestone}
          />
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
