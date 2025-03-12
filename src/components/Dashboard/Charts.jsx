import { Line, Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const Charts = () => {
  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Sales Performance',
        data: [65, 59, 80, 50, 56, 55],
        fill: true,
        borderColor: '#4361ee',
        backgroundColor: 'rgba(67, 97, 238, 0.1)',
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: '#4361ee',
        pointBorderColor: '#fff',
        pointHoverRadius: 6,
      }
    ]
  }

  const barData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'User Activity',
        data: [12, 19, 3, 20, 2, 3, 9],
        backgroundColor: 'rgba(46, 196, 182, 0.8)',
        borderRadius: 6,
        hoverBackgroundColor: '#2ec4b6',
      }
    ]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 12,
            family: "'Poppins', sans-serif"
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: {
          size: 14,
          family: "'Poppins', sans-serif"
        },
        bodyFont: {
          size: 13,
          family: "'Poppins', sans-serif"
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  }

  return (
    <div className="charts-grid">
      <div className="chart-container">
        <div className="chart-header">
          <h3>Sales Overview</h3>
          <div className="chart-actions">
            <select className="chart-select">
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
        </div>
        <div className="chart-body">
          <Line data={lineData} options={options} height={300} />
        </div>
      </div>

      <div className="chart-container">
        <div className="chart-header">
          <h3>User Activity</h3>
          <div className="chart-actions">
            <select className="chart-select">
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>
        </div>
        <div className="chart-body">
          <Bar data={barData} options={options} height={300} />
        </div>
      </div>
    </div>
  )
}

export default Charts