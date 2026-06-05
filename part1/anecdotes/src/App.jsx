import { useEffect } from 'react';
import { useState } from 'react'

const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
]

const App = () => {

    const randomizeSelection = () => Math.floor(Math.random() * anecdotes.length)

    const incrementVoteAtIndex = (index) => {
        const temp_vote = [...vote];
        temp_vote[index]++;
        setVote(temp_vote);
    }

    const getMaxIndexInVote = (vote) => {
        let maxVotes = vote[0];
        let maxIndex = 0;
        for (let i = 1; i < vote.length; i++) {
            if (vote[i] > maxVotes) {
                maxVotes = vote[i];
                maxIndex = i;
            }
        }
        return maxIndex;
    }

    const [vote, setVote] = useState(() => Array(anecdotes.length).fill(0));
    const [selected, setSelected] = useState(randomizeSelection);

    const mostVotedIndex = getMaxIndexInVote(vote);

    useEffect(() => {
        // Debug information, run every change 
        console.log("Current selection index: ", selected);
        console.log("Current vote: ", vote);
    }, [selected, vote]);

    return (
        <div>
            <h1>Anecdote of the day</h1>
            <p>{anecdotes[selected]}</p>
            <button onClick={() => incrementVoteAtIndex(selected)}>vote</button>
            <button onClick={() => setSelected(randomizeSelection())}>next anecdote</button>

            <h1>Anecdote with most votes</h1>
            <p>{anecdotes[mostVotedIndex]}</p>
            <p>has {vote[mostVotedIndex]} {(vote[mostVotedIndex] == 1) ? "vote" : "votes"}</p>
        </div>
    )
}

export default App