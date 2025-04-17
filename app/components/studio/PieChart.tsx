import React from 'react';
import '../../styles/studio/PieChart.css';

interface PieChartProps {
  data?: {
    label: string;
    value: number;
    color: string;
  }[];
}

const PieChart: React.FC<PieChartProps> = ({ 
  data = [
    { label: 'Development', value: 30, color: '#FF6384' },
    { label: 'Sales', value: 25, color: '#FF9F40' },
    { label: 'Marketing', value: 25, color: '#FFCD56' },
    { label: 'HR', value: 10, color: '#4BC0C0' },
    { label: 'Support', value: 10, color: '#36A2EB' },
  ] 
}) => {
  // Calculate total for percentages
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  // SVG dimensions
  const size = 200;
  const center = size / 2;
  const radius = size / 2.5;
  
  // Calculate the segments for SVG path
  let cumulativePercent = 0;
  const segments = data.map(item => {
    const percent = (item.value / total) * 100;
    const startPercent = cumulativePercent;
    cumulativePercent += percent;
    
    // Calculate the SVG arc path
    const startAngle = (startPercent / 100) * 2 * Math.PI;
    const endAngle = (cumulativePercent / 100) * 2 * Math.PI;
    
    // Calculate x and y coordinates for the path
    const startX = center + radius * Math.cos(startAngle - Math.PI / 2);
    const startY = center + radius * Math.sin(startAngle - Math.PI / 2);
    const endX = center + radius * Math.cos(endAngle - Math.PI / 2);
    const endY = center + radius * Math.sin(endAngle - Math.PI / 2);
    
    // Calculate label position
    const midAngle = startAngle + (endAngle - startAngle) / 2;
    const labelX = center + (radius * 0.8) * Math.cos(midAngle - Math.PI / 2);
    const labelY = center + (radius * 0.8) * Math.sin(midAngle - Math.PI / 2);
    
    // Create arc flag (0 for small arc, 1 for large arc)
    const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0;
    
    // Create SVG path
    const pathData = [
      `M ${center},${center}`,
      `L ${startX},${startY}`,
      `A ${radius},${radius} 0 ${largeArcFlag} 1 ${endX},${endY}`,
      'Z'
    ].join(' ');
    
    return {
      ...item,
      percent,
      pathData,
      labelX,
      labelY
    };
  });

  return (
    <div className="pie-chart-component">
      <h3 className="chart-title">Department Budget Allocation</h3>
      
      <div className="chart-container-wrapper">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {segments.map((segment, index) => (
            <path
              key={index}
              d={segment.pathData}
              fill={segment.color}
            />
          ))}
          {segments.map((segment, index) => (
            <text
              key={`label-${index}`}
              x={segment.labelX}
              y={segment.labelY}
              textAnchor="middle"
              fontSize="10"
              fill="#000"
            >
              {segment.percent.toFixed(1)}%
            </text>
          ))}
        </svg>
        
        <div className="chart-legend">
          {segments.map((segment, index) => (
            <div key={index} className="legend-item">
              <div className="color-box" style={{ backgroundColor: segment.color }}></div>
              <div className="legend-label">{segment.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PieChart; 