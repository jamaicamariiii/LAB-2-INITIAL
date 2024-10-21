import React from 'react';
import Plot from 'react-plotly.js';

const IQDistribution = ({ data = [] }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return <p>No data available to visualize.</p>;
  }

  // Separate IQ data by gender
  const maleIQ = data.filter((d) => d.sex === 'Male').map((d) => d.iq);
  const femaleIQ = data.filter((d) => d.sex === 'Female').map((d) => d.iq);

  return (
    <div>
      <h3>IQ Distribution by Gender</h3>

      {/* Violin Plot */}
      <Plot
        data={[
          {
            type: 'violin',
            y: maleIQ,
            name: 'Male',
            box: { visible: true },
            meanline: { visible: true },
          },
          {
            type: 'violin',
            y: femaleIQ,
            name: 'Female',
            box: { visible: true },
            meanline: { visible: true },
          },
        ]}
        layout={{ title: 'Violin Plot of IQ by Gender' }}
      />

      {/* Box Plot */}
      <Plot
        data={[
          {
            type: 'box',
            y: maleIQ,
            name: 'Male',
            boxpoints: 'all',
          },
          {
            type: 'box',
            y: femaleIQ,
            name: 'Female',
            boxpoints: 'all',
          },
        ]}
        layout={{ title: 'Box Plot of IQ by Gender' }}
      />
    </div>
  );
};

export default IQDistribution;
