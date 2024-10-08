
export type Milestone = {
    value: number;
    reward: string;
    short: string;
}

const DefaultMilestones: Milestone[] = [
    { 
        value: 250, 
        reward: 'Bryony and Julia take a shot of hot sauce',
        short: 'Hot sauce shot'
    },
    { 
        value: 500, 
        reward: 'Scissors Paper Rock : Loser wears funny stuff on first day in London',
        short: 'Scissors Paper Rock'
    },
    { 
        value: 750, 
        reward: 'Tea making competition',
        short: 'Tea making competition'
    },
    { 
        value: 1000, 
        reward: 'British, royalty related, Karaoke',
        short: 'Karaoke'
    },
    { 
        value: 1250, 
        reward: 'Throw tomatoes at Bryony and July',
        short: 'Tomato toss'
    },
    { 
        value: 1500, 
        reward: 'Bryony and Julia spend a night in the Law Library',
        short: 'Night in the law library'
    },
]

export default DefaultMilestones;