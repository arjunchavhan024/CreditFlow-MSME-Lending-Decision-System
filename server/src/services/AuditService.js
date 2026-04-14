const fs = require('fs');
const path = require('path');

class AuditService {
    static log(action, data) {
        const logEntry = {
            timestamp: new Date().toISOString(),
            action,
            data
        };
        const logFilePath = path.join(__dirname, '../../logs/audit.log');
        
        if (!fs.existsSync(path.join(__dirname, '../../logs'))) {
            fs.mkdirSync(path.join(__dirname, '../../logs'));
        }

        fs.appendFileSync(logFilePath, JSON.stringify(logEntry) + '\n');
    }
}

module.exports = AuditService;
