import StatisticsLine from "./StatisticsLine";

const Statistics = ({ good, neutral, bad }) => {
    const all = good + neutral + bad;
    const avg = (good - bad) / all;
    const positive = good / all;
    const isAvailable = (good != 0 || neutral != 0 || bad != 0);
    return <>
        <h1>statistics</h1>
        {(isAvailable) ? <>
            <table>
                <tbody>
                    <StatisticsLine metric="good" value={good}></StatisticsLine>
                    <StatisticsLine metric="neutral" value={neutral}></StatisticsLine>
                    <StatisticsLine metric="bad" value={bad}></StatisticsLine>
                    <StatisticsLine metric="all" value={all}></StatisticsLine>
                    <StatisticsLine metric="average" value={avg}></StatisticsLine>
                    <StatisticsLine metric="positive" value={positive} inPercentage></StatisticsLine>
                </tbody>
            </table>
        </> : <p>No feedback given</p>}
    </>
}

export default Statistics;