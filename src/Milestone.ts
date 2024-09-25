export type Milestone = {
    value: number;
    reward: string;
}

const DefaultMilestones: Milestone[] = [
    { value: 250, reward: ''},
    { value: 500, reward: ''},
    { value: 750, reward: ''},
    { value: 1000, reward: ''},
    { value: 1250, reward: ''},
    { value: 1500, reward: ''},
]

export default DefaultMilestones;