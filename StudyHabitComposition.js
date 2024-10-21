import React from 'react';
import { Doughnut, Pie } from 'react-chartjs-2';

const StudyHabitComposition = ({ data = [] }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return <p>No data available to visualize.</p>;
  }

  // Count study habits
  const studyHabitCounts = data.reduce((acc, student) => {
    acc[student.studyHabit] = (acc[student.studyHabit] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(studyHabitCounts),
    datasets: [
      {
        label: 'Study Habit Composition',
        data: Object.values(studyHabitCounts),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      },
    ],
  };

  return (
    <div>
      <h3>Study Habit Composition</h3>
      <Doughnut data={chartData} />
      <Pie data={chartData} />
    </div>
  );
};

export default StudyHabitComposition;
