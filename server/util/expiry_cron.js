console.log("Expiry CRON activated");
function expire_keys() {

    console.log("Deleting expired keys...");
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

setInterval(expire_keys, 5*60*1000);

module.exports = {expire_keys};