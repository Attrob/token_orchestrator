const cron = require('node-cron');

function expire_keys() {
    console.log("RUNNING Expiry CRON \n Deleting expired keys...");
    models.tokens.update({
        in_use: 0,
    },{
        where: {
            expiry_at: {
                [Op.lt]: new Date()
            }
        }
    });
}

const job = cron.schedule('*/10 * * * *', expire_keys);
job.start();