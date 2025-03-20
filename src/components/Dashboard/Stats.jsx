import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faShoppingCart, faDollarSign, faChartLine } from '@fortawesome/free-solid-svg-icons'

const Stats = () => {
    return (
        <div className="row">
            <div className="col-md-3">
                <div className="stat-card bg-primary text-white">
                    <div className="stat-card-body">
                        <div className="text-center">
                            <FontAwesomeIcon icon={faUsers} className="stat-icon" />
                        </div>
                        <h3>0</h3>
                        <p>Total Entries</p>
                    </div>
                </div>
            </div>
            <div className="col-md-3">
                <div className="stat-card text-white" style={{backgroundColor: "#E95F01"}}>
                    <div className="stat-card-body">
                        <div className="text-center">
                            <FontAwesomeIcon icon={faUsers} className="stat-icon" />
                        </div>
                        <h3>0</h3>
                        <p>Entries Pending</p>
                    </div>
                </div>
            </div>
            <div className="col-md-3">
                <div className="stat-card text-white" style={{backgroundColor: "#719C35"}}>
                    <div className="stat-card-body">
                        <div className="text-center">
                            <FontAwesomeIcon icon={faUsers} className="stat-icon" />
                        </div>
                        <h3>0</h3>
                        <p>Enteries Approved</p>
                    </div>
                </div>
            </div>
            <div className="col-md-3">
                <div className="stat-card text-white" style={{backgroundColor: "#D72C21"}}>
                    <div className="stat-card-body">
                        <div className="text-center">
                            <FontAwesomeIcon icon={faUsers} className="stat-icon" />
                        </div>
                        <h3>0</h3>
                        <p>Entries Rejected</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Stats