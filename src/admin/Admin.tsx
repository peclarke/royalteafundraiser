import { useCallback, useEffect, useMemo, useState } from "react";
import { useMediaQuery } from "react-responsive";
import './Admin.css';
import { Box, Button, Card, Menu, MenuItem, Modal, Paper, TextField } from "@mui/material";
import { off, onValue, ref, set } from "firebase/database";
import { database } from "../db";
import { Milestone } from "../visualiser/Milestone";

/**
 * This is the admin page for managing donations and milestones.
 * It is optimised / only developed for mobile devices with a portrait orientation.
 * @returns 
 */
const Admin = () => {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
    const isPortrait = useMediaQuery({ query: '(orientation: portrait)' });
    const [dontCare, setDontCare] = useState<boolean>(false);

    const Warning = () => {
        const warningStyle = {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: '100vh',
            width: '100vw',
        } as const;

        return (
            <div style={warningStyle}>
                <h3>Warning: Not Optimised For You</h3>
                <span>This admin panel is only optimised for <strong>mobile devices</strong> in a <strong>portrait</strong> orientation.</span>
                <span>If you don't care and want to see it anyways, <a style={{cursor: "pointer"}} onClick={() => setDontCare(true)}>click here</a></span>
            </div>
        )
    }

    return (
        <>
        {(isTabletOrMobile && isPortrait) || dontCare ? <ControlPanel /> : <Warning />}
        </>
    )
}

export type ScreenTypes = "visual" | "milestone" | "spin" | "competition";

const ControlPanel = () => {
    // we never manually change these, these are updated from firebase
    const [donations, setDonations] = useState<number>(0);
    const [milestones, setMilestones] = useState<Milestone[]>([]);
    const [type, setType] = useState<ScreenTypes>("visual");

    // we can manually change these states
    const [changeAmt, setChangeAmt] = useState<number>(0);
    const [msIdx, setMsIdx] = useState<number | undefined>(undefined);
    const [addModal, setAddModal] = useState<boolean>(false);
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const selectedMilestone = useMemo(() => {
        // gotta be careful
        if (msIdx === undefined || msIdx >= milestones.length) return undefined;
        return milestones[msIdx];
    }, [msIdx])

    const onChangeAmt = (e: any) => {
        const val = e.target.value;
        setChangeAmt(val);
    }

    const onBlurAmt = () => {
        if (changeAmt.toString() === "" || changeAmt === null || changeAmt === undefined) setChangeAmt(0);
    }

    const addAmt = (amt: number) => {
        const integerAmt = parseInt(changeAmt.toString());
        setChangeAmt(integerAmt + amt)
    };

    const dbDonations = useMemo(() => {return ref(database, 'donations')}, [])
    const dbMilestones = useMemo(() => {return ref(database, 'milestones')}, [])
    const dbType = useMemo(() => {return ref(database, 'type')}, [])

    const handleMenuChange = (type: "visual" | "milestone" | "spin" | "competition") => {
        set(dbType, type);
        setMenuOpen(false);
    }

    const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
        setMenuOpen(true);
    };

    // firebase trickery
    useEffect(() => {
        // listeners
        onValue(dbDonations, (snapshot) => {
            const newValue = snapshot.val();
            setDonations(newValue);
        })

        onValue(dbType, (snapshot) => {
            const val = snapshot.val();
            setType(val);
        })

        // once off get all milestones
        onValue(dbMilestones, (snapshot) => {
            const ms: Milestone[] = []
            snapshot.forEach((childSnapshot) => {
            const childData = childSnapshot.val();
                ms.push(childData);
            });
            setMilestones(ms);
        });

            return () => {
                off(dbDonations);
                off(dbMilestones);
                off(dbType);
            }
        }, []);


    const confirmAmount = (type: 'add' | 'set') => {
        const integerAmount = parseInt(changeAmt.toString());
        // update with firebase
        if (type === 'set') {
            set(dbDonations, integerAmount)
        } else {
            set(dbDonations, donations + integerAmount);
        }
        // reset stuff
        setChangeAmt(0);
    }

    // const confirmMilestones = () => {
    //     // placeholder
    //     set(dbMilestones, []);
    // }

    const MilestoneTab = ({ms, index}: {ms: Milestone, index: number}) => {
        const msTabClass = index === msIdx ? 'ms-tab ms-tab-selected' : 'ms-tab';
        return (
            <div className={msTabClass} onClick={() => setMsIdx(index)}>
                <span><strong>{ms.value}</strong>: {ms.short}</span>
            </div>
        )
    }

    const AddMilestone = () => {
        return (
            <div className="add-tab" onClick={() => setAddModal(true)}>
                <span>Add Milestone</span>
            </div>
        )
    }

    const MilestoneManager = ({ selectedMilestone }: { selectedMilestone: Milestone}) => {
        return (
            <Box
                component="form"
                sx={{ '& .MuiTextField-root': { m: 1, width: '95%' } }}
                noValidate
                autoComplete="off"
                >
                {selectedMilestone ? <h3>View/Edit Milestone</h3> : <h3>Add Milestone</h3>}
                <TextField 
                    type="number" 
                    label="Donation Goal"
                    value={selectedMilestone.value}
                />
                <TextField 
                    type="text" 
                    required
                    label="Short description"
                    value={selectedMilestone.short}
                />
                <TextField
                    required
                    label="Milestone description"
                    placeholder="they gotta do this thing..."
                    multiline
                    value={selectedMilestone.reward}
                    rows={8}
                    type="text"
                />
            </Box>
        )
    }

    const MilestoneAdd = () => {
        const [ms, setMs] = useState<Milestone>({
            value: -1,
            short: "",
            reward: "",
        })

        const onChange = (value: string, type: 'value' | 'short' | 'reward') => {
            const newMs = {...ms, [type]: value};
            setMs(newMs);
        }

        const confirm = () => {
            if (ms.value <= 0 || ms.short === "" || ms.reward === "") return;
            set(dbMilestones, [...milestones, ms]);
            setAddModal(false);
        }

        return (
            <Box
                component="form"
                sx={{ '& .MuiTextField-root': { m: 1, width: '95%' } }}
                noValidate
                autoComplete="off"
                >
                {<h2>Add Milestone</h2>}
                <TextField 
                    type="number" 
                    label="Donation Goal"
                    value={ms.value}
                    onChange={(e) => onChange(e.target.value, 'value')}
                />
                <TextField 
                    type="text" 
                    required
                    label="Short description"
                    value={ms.short}
                    onChange={(e) => onChange(e.target.value, 'short')}
                />
                <TextField
                    required
                    label="Milestone description"
                    placeholder="they gotta do this thing..."
                    multiline
                    value={ms.reward}
                    rows={8}
                    type="text"
                    onChange={(e) => onChange(e.target.value, 'reward')}
                />
                <Button variant="contained" sx={{marginTop: '1em'}} onClick={confirm}>Confirm Add</Button>
            </Box>
        )
    }


    return (
        <div className="controlpanel-container">
            <Button
                id="basic-button"
                aria-controls={menuOpen ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={menuOpen ? 'true' : undefined}
                onClick={handleMenuClick}
                variant="outlined"
            >
                Mode
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={menuOpen}
                onClose={() => setMenuOpen(false)}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={() => handleMenuChange("visual")}>Visual</MenuItem>
                <MenuItem onClick={() => handleMenuChange("milestone")}>Milestones</MenuItem>
                <MenuItem onClick={() => handleMenuChange("spin")}>Spinner</MenuItem>
                <MenuItem onClick={() => handleMenuChange("competition")}>Competition</MenuItem>
            </Menu>
            <span id="cc">Royal Tea Fundraiser: Admin Portal - built by Paul Clarke</span>
            {type === "visual" && <>
            <div className="donationbox">
                <span>${donations}</span>
            </div>
            <Paper elevation={2} className="controls-container">
                <h3>Donations</h3>
                <div className="donationControls">
                    <div className="amts">
                        <Button variant="outlined" onClick={() => addAmt(1)}>Add $1</Button>
                        <Button variant="outlined" onClick={() => addAmt(5)}>Add $5</Button>
                        <Button variant="outlined" onClick={() => addAmt(10)}>Add $10</Button>
                        <Button variant="outlined" onClick={() => addAmt(20)}>Add $20</Button>
                        <Button variant="outlined" onClick={() => addAmt(50)}>Add $50</Button>
                    </div>
                    <div className="setting">
                        <TextField 
                            variant="outlined" 
                            id="numAmt" 
                            onChange={onChangeAmt} 
                            value={changeAmt}
                            onBlur={onBlurAmt}
                        />
                        <Button variant="contained" id="addAmt" onClick={() => confirmAmount('add')}>Add Amount</Button>
                        <Button variant="contained" onClick={() => confirmAmount('set')}>Set Amount</Button>
                    </div>
                </div>
                <h3>Milestones</h3>
                <div className="ms-ctrl-cont">
                    <div className="milestone-list ms-sec">
                        {milestones.map((milestone, i) => <MilestoneTab ms={milestone} index={i}/>)}
                        <AddMilestone />
                    </div>
                    <div className="milestone-sele ms-sec">
                        {selectedMilestone ? <MilestoneManager selectedMilestone={selectedMilestone}/>
                            : <p>Select a milestone to view/edit</p>}
                        <Modal open={addModal} onClose={() => setAddModal(false)} className="modal">
                            <Card className="modal-card">
                                <MilestoneAdd />
                            </Card>
                        </Modal>
                    </div>
                </div>
            </Paper>
            </>}
        </div>
    )
}

export default Admin;