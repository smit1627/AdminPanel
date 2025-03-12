import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faShoppingCart, faDollarSign, faChartLine } from '@fortawesome/free-solid-svg-icons'

const Stats = () => {
    return (
        <div className="row">
            <div className="col-md-3">
                <div className="stat-card bg-primary text-white">
                    <div className="stat-card-body">
                        <FontAwesomeIcon icon={faUsers} className="stat-icon" />
                        <h3>1,234</h3>
                        <p>Total Users</p>
                    </div>
                </div>
            </div>
            <div className="col-md-3">
                <div className="stat-card bg-success text-white">
                    <div className="stat-card-body">
                        <FontAwesomeIcon icon={faShoppingCart} className="stat-icon" />
                        <h3>456</h3>
                        <p>Total Orders</p>
                    </div>
                </div>
            </div>
            <div className="col-md-3">
                <div className="stat-card bg-warning text-white">
                    <div className="stat-card-body">
                        <FontAwesomeIcon icon={faDollarSign} className="stat-icon" />
                        <h3>$89,456</h3>
                        <p>Revenue</p>
                    </div>
                </div>
            </div>
            <div className="col-md-3">
                <div className="stat-card bg-info text-white">
                    <div className="stat-card-body">
                        <FontAwesomeIcon icon={faChartLine} className="stat-icon" />
                        <h3>23%</h3>
                        <p>Growth</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Stats