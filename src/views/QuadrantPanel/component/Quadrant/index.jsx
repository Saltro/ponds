import { useState, useEffect } from 'react';
import { Scatter } from '@ant-design/charts';
import { useTasks } from '@/views/TaskPanel/components/Pond';
import { useAuth } from '@/context/auth-context';
import QuadrantUtil from '@/utils/QuadrantUtil';

export default function index() {
  const { user } = useAuth();
  const tasks = useTasks(user.id);
  const [data, setData] = useState(tasks);
  const quarantUtil = new QuadrantUtil(tasks);

  useEffect(() => {
    quarantUtil.tasks = tasks;
    setData(quarantUtil.getData());
  }, [tasks]);

  const config = {
    width: 800,
    height: 500,
    data,
    xField: 'x',
    yField: 'y',
    colorField: 'belong',
    shape: 'circle',
    pointStyle: {
      fillOpacity: 0.8,
      stroke: '#eee',
    },
    size: 4,
    xAxis: {
      min: -6,
      max: 6,
      grid: { line: { style: { stroke: '#eee' } } },
      line: { style: { stroke: '#aaa' } },
    },
    yAxis: {
      min: -6,
      max: 6,
      grid: { line: { style: { stroke: '#eee' } } },
      line: { style: { stroke: '#aaa' } },
    },
    quadrant: {
      xBaseline: 0,
      yBaseline: 0,
      labels: [
        { content: '紧急且重要' },
        { content: '重要但不紧急' },
        { content: '不紧急不重要' },
        { content: '紧急但不重要' },
      ],
    },
    tooltip: {
      showTitle: true,
      showMarkers: false,
      customContent: (title, items) => {
        console.log(title, items);
        const data = items[0]?.data ?? { urgency: 0, importance: 0, belong: '', describe: '' };
        const tooltipItems = [
          { label: '紧急性', value: data.urgency },
          { label: '重要性', value: data.importance },
        ];

        return (
          <>
            <div
              style={{
                margin: '10px 0',
                fontWeight: 700,
              }}
            >
              {data.describe}
            </div>
            <div className="g2-tooltip-items">
              {tooltipItems.map((item, index) => (
                <div
                  className="g2-tooltip-item"
                  style={{
                    marginBottom: '8px',
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                  key={index}
                >
                  <span
                    className="g2-tooltip-item-label"
                    style={{
                      marginRight: '12px',
                    }}
                  >
                    {item.label}
                  </span>
                  <span className="g2-tooltip-item-value">{item.value}</span>
                </div>
              ))}
            </div>
          </>
        );
      },
    },
  };

  return <Scatter {...config} />;
}
