const StatisticsLine = ({ metric, value, inPercentage = false }) => {
    return <tr>
        <td>{metric}</td> 
        <td>{(inPercentage) ? value * 100 : value}{(inPercentage) ? ' %' : ''}</td>
    </tr>
}

export default StatisticsLine;