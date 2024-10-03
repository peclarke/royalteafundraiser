import { Grid2 } from '@mui/material';
import './Raffle.css';
import { useEffect, useMemo, useState } from 'react';
import { off, onValue, ref, set } from 'firebase/database';
import { database } from '../db';

type RaffleItemProps = {
    url: string;
    id: number;
    name: string;
    taken: boolean;
}

const RaffleItem = (raffleItem: RaffleItemProps) => {
    const url = "/raffle/" + raffleItem.url;
    const raffleClass = raffleItem.taken ? "raffleItem raffleItem-taken" : "raffleItem";

    return (
        <div className={raffleClass}>
            <img src={url} />
            <span>{raffleItem.name}</span>
        </div>
    )
}

const RaffleScreen = () => {
    const [items, setItems] = useState<RaffleItemProps[]>([]);

    const dbRaffle = useMemo(() => { return ref(database, 'raffle') }, [])

    useEffect(() => {
        // once off get all milestones
        onValue(dbRaffle, (snapshot) => {
            const rfItems: RaffleItemProps[] = []
            snapshot.forEach((childSnapshot) => {
                const childData = childSnapshot.val();
                rfItems.push(childData);
            });
            setItems(rfItems);
        });

        return () => {
            off(dbRaffle);
        }
    }, []);

    const handleClick = (raffleId: number) => {
        const itemGroup = items.filter(item => item.id === raffleId);

        if (itemGroup.length === 0) return;
        const currentItemState = itemGroup[0].taken;
        const newItem = {...itemGroup[0], taken: !currentItemState}

        const itemRef = ref(database, 'raffle/' + raffleId);
        set(itemRef, newItem);
        off(itemRef);
    }

    return (
        <div className="raffle-screen">
            <div className="title">
                <span>THE ROYAL TEA FUNDRAISER</span>
            </div>
            <div className="raffle-content">
                <Grid2 container spacing={5} className="grid-container">
                    {
                        items
                        .sort((a,b) => a.id - b.id)
                        .map((item, i) => (
                            <Grid2 
                                size={4} 
                                key={"raffleitem-" + i} 
                                className={item.taken ? "grid-item grid-item-taken" : "grid-item"}
                                onClick={() => handleClick(item.id)}
                            >
                                <RaffleItem {...item}/>
                            </Grid2>
                        ))
                    }
                </Grid2>
            </div>
        </div>
    )
}

// const ItemToggle = (item: RaffleItemProps) => {
//     const itemClass = item.taken ? 'item-toggle item-taken' : 'item-toggle';
//     return (
//         <div className={itemClass}>
//             <span>{item.name}</span>
//         </div>
//     )
// }

// export const RaffleAdminScreen = ({ items }: {items: RaffleItemProps[]}) => {
//     return (
//     <div className="raffleadmin">
//         <h1>Viewing Raffle Screen</h1>
//         <div>   
//             { items.map(item => <ItemToggle {...item}/>)}
//         </div>
//     </div>)
// }

export default RaffleScreen;