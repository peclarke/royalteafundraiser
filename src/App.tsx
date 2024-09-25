import { Button, Grid2 as Grid } from '@mui/material';
import './App.css';

import Teacup from './assets/teacup.png';
import TeacupFilled from './assets/teacupFilled.png';
import { useEffect, useState } from 'react';
import Cup, { BlankCup, TeacupImageType } from './Cup';
import DefaultMilestones, { Milestone } from './Milestone';

const teacupImages: TeacupImageType[] = [
  {
      baseUrl: Teacup,
      filledUrl: TeacupFilled,
      donationValue: 250,
  },
  {
    baseUrl: Teacup,
    filledUrl: TeacupFilled,
    donationValue: 500,
}
];

function App() {
  // internal state
  const [donations, setDonations] = useState<number>(80);
  const [milestones, setMilestones] = useState<Milestone[]>(DefaultMilestones);

  const activeMilestone = milestones.filter(milestone => milestone.value > donations)[0];
  const activeTeacup = teacupImages.filter(image => image.donationValue > donations)[0];

  // useEffect(() => console.log(donations), []);

  // const handleClick = () => setDonations(donations + 20);
  // firebase trickery

  // rendering
  return (
    <Grid container spacing={2}>
      <Grid size={2} className="container">
        <BlankCup ImageSource={Teacup}/>
        {/* <Button onClick={handleClick} variant="contained">Add</Button> */}
      </Grid>
      <Grid size={8} className="container feature">
        <Cup 
          ImageSource={activeTeacup.baseUrl}
          ImageSource2={activeTeacup.filledUrl}
          donations={donations}
          activeMilestone={activeMilestone}
        />
      </Grid>
      <Grid size={2} className="container">
        <BlankCup ImageSource={Teacup}/>
      </Grid>
    </Grid>
  )
}

export default App
