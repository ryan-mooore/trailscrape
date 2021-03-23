const StatusIcon = (status) => {
    let statusDiv = <div></div>
    if (status) {
        statusDiv = <div className="statusIndicator-large" style={{backgroundColor:"#2ecc71"}}>open</div>;
    } 
    if (!status) {
        statusDiv = <div className="statusIndicator-large" style={{backgroundColor:"#e74c3c"}}>closed</div>;
    }

    if (status === null) {
        statusDiv = <div className="statusIndicator-large" style={{backgroundColor:"#BABECC"}}>error</div>;
    }

    return statusDiv;
}

export default StatusIcon;