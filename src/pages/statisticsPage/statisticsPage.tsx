import React from 'react';
import './statisticsPage.scss';
import Navbar from '@components/navbar/navbar';
import WordStat from '@interfaces/wordStat';
const StatisticsPage: React.FC = () => {
    const mockStats: WordStat[] = [
        { word: 'Hello', correctPercentage: 80 },
        { word: 'World', correctPercentage: 65 },
        { word: 'Computer', correctPercentage: 90 },
        { word: 'Programming', correctPercentage: 75 },
        { word: 'Language', correctPercentage: 85 }
    ];
    return (
        <div className="statistics_page">
            <Navbar />
            <div className="statistics_page__content">
                <h1>Статистика</h1>
                <table className="statistics_table">
                    <thead>
                        <tr>
                            <th>Слово</th>
                            <th>Правильных ответов</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockStats.map((stat) => (
                            <tr key={stat.word}>
                                <td>{stat.word}</td>
                                <td>{stat.correctPercentage}%</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};  

export default StatisticsPage;