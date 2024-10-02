import { Milestone } from '../visualiser/Milestone';
import './MSScreen.css';

const MilestoneScreen = (props: {donations: number, milestones: Milestone[]}) => {
    const nextGroup = props.milestones.filter(milestone => props.donations < milestone.value);

    const Tab = (ms: Milestone) => {
        const completed = props.donations >= ms.value ? 'ms-tab-completed' : '';
        const next = nextGroup.length > 0 ? nextGroup[0].value : -1;
        return (
        <div className="tab-container">
            <div className={"ms-tab-root ms-screen-tab " + completed}>
                <span><strong>${ms.value}</strong>: {ms.short}</span>
                {ms.value === next && <span id="nexttext">{"NEXT MILESTONE"}</span>}
            </div>
        </div>)
    }

    return (
        <div className="msscreen">
            <div className="title">
                <span>THE ROYAL TEA FUNDRAISER: Milestone Tracker</span>
            </div>
            <div className="msscrn-container">
                <div>
                    <h2>DONATION PROGRESS</h2>
                    <div className="donationBox">
                        ${ props.donations }
                    </div>
                    <hr></hr>
                    <div className="completed-milestones">
                        <h2>COMPLETED MILESTONES</h2>
                        {
                            props.milestones
                            .filter(milestone => milestone.value <= props.donations)
                            .sort((a,b) => b.value - a.value)
                            .map(milestone => <Tab {...milestone} />)
                        }
                    </div>
                </div>
                <div className="milestonegroup">
                    <h2>MILESTONES</h2>
                    {
                            props.milestones
                            .filter(milestone => milestone.value > props.donations)
                            .map(milestone => <Tab {...milestone} />)
                        }
                </div>
            </div>
        </div>
    )
}

export const MilestoneAdminScreen = () => {
    return (
    <div className="adminscreen">
        <h1>Viewing Milestone Screen</h1>
        <p>You are currently viewing the milestone screen. There are no controls for this area.</p>
        <p>Use the menu button in the top right to manage the viewing experience.</p>
    </div>)
}

export default MilestoneScreen;