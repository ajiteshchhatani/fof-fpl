import React, { useEffect, useState } from 'react';
import './App.css';

function FPLDraftTable() {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = 'https://draft.premierleague.com/api/league/10410/details';
    const [leagueData, setLeagueData] = useState([]);
    let rankData = [];
    let F1Scores = [25, 20, 15, 11, 8, 5, 2, 0, 0, 0, 0, 0];
    useEffect(() => {
        fetch(proxyurl + url)
            .then((response) => response.json())
            .then((data) => {
                formLeaderboardTable(data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    function formLeaderboardTable(data) {
        data.standings.map((item) => {
            rankData.push({score: item.event_total, id: item.league_entry, name: '', teamName: ''});
        });

        rankData.map((team, index) => {
            const team_details = data.league_entries.filter((entry) => {
                return entry.id === team.id
            });
            rankData[index].name = team_details[0].player_first_name + ' ' + team_details[0].player_last_name;
            rankData[index].teamName = team_details[0].entry_name;
        });

        rankData.sort((a, b) => parseFloat(b.score) - parseFloat(a.score));

        setLeagueData(rankData);

    }

    return (
        <div>
            <h1>FOF Draft GW Data</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Team Name</th>
                        <th>Weekly Score</th>
                        <th>F1 Points</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        leagueData.map((team, index) => {
                            return (
                                <React.Fragment key={team.id}>
                                    <tr>
                                        <td>{team.name}</td>
                                        <td>{team.teamName}</td>
                                        <td>{team.score}</td>
                                        <td>{F1Scores[index]}</td>
                                    </tr>
                                </React.Fragment>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
};

export default FPLDraftTable;
