import { Milestone } from '../visualiser/Milestone';
import './MSScreen.css';

const MilestoneScreen = (props: {donations: number, milestones: Milestone[]}) => {
    const Tab = (ms: Milestone) => {
        const completed = props.donations >= ms.value ? 'ms-tab-completed' : '';
        return <div className={"ms-tab ms-screen-tab " + completed}>
            <strong>${ms.value}</strong>: {ms.short}
        </div>
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
                            .filter(milestone => milestone.value < props.donations)
                            .sort((a,b) => b.value - a.value)
                            .map(milestone => <Tab {...milestone} />)
                        }
                    </div>
                </div>
                <div className="milestonegroup">
                    <h2>MILESTONES</h2>
                    {
                            props.milestones
                            .filter(milestone => milestone.value >= props.donations)
                            .map(milestone => <Tab {...milestone} />)
                        }
                </div>
            </div>
        </div>
    )
}

export default MilestoneScreen;