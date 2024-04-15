const models = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const {expiry_keys} = require("../util/expiry_cron");
function generate_token_key() {
    const token_key = Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2, 15);
    return token_key;
}

exports.generate_keys = async (req, res) => {
    try{
        let new_token_found = false;
        let token_key = "";
        let count = req.body && req.body.count ? req.body.count : 1;

        while (new_token_found === false && count > 0){
            token_key = generate_token_key();
            const token_details = await models.tokens.findOne({
                attributes: ['id', 'is_active'],
                where: {
                    token_key: token_key 
                },
                raw: true,
            });
            if (!token_details || !token_details.hasOwnProperty("id")){
                new_token_found = true;
                count -= 1;
            }
        }

        await models.tokens.create({
            token_key: token_key,
            in_use: 0,
            is_active: 1,
            expiry_at: new Date(Date.now() + 5*60000),
            created_at: new Date(),
            updated_at: new Date()
        });

        console.log("Key generated successfully: ", JSON.stringify(token_key));
        return res.status(200).jsonp({
            status_code: 200,
            message: "Key generated successfully",
            token_key: token_key
        });

    }catch(err){
        console.log("Error while generating key: ", JSON.stringify(err));
        return res.status(500).jsonp({
            status_code: 500,
            message: "Error while generating key"
        })
    }
};

exports.get_key = async (req, res) => {
    try{
        
        const token_details = await models.tokens.findOne({
            attributes: ['id', 'token_key'],
            where: {
                in_use: 0,
                is_active: 1,
            },
            raw: true,
        });

        if (!token_details || !token_details.hasOwnProperty("id")){
            return res.status(404).jsonp({
                status_code: 404,
                message: "Key not found",
            });
        }

        await models.tokens.update({
            in_use: 1,
            expiry_at: new Date(Date.now() + 5*60000)
        }, {
            where: {
                id: token_details.id
            }
        });

        console.log("Key fetched successfully: ", JSON.stringify(token_details));
        return res.status(200).jsonp({
            status_code: 200,
            message: "Key fetched successfully",
            token_key: token_details.token_key
        });

    }catch(err){
        console.log("Error while fetching key: ", JSON.stringify(err));
        return res.status(500).jsonp({
            status_code: 500,
            message: "Error while fetching key"
        });
    }    
};

exports.get_information = async (req, res) => {
    try{
        if (!req || !req.params || !req.params.hasOwnProperty("id")){
            return res.status(400).jsonp({
                status_code: 400,
                message: "Invalid request"
            });
        }

        const token_details = await models.tokens.findOne({
            where: {
                token_key: req.params.id
            },
            raw: true,
        });

        if (!token_details || !token_details.hasOwnProperty("id")){
            return res.status(404).jsonp({
                status_code: 404,
                message: "Key not found",
            });
        }

        console.log("Key details fetched successfully");
        return res.status(200).jsonp({
            status_code: 200,
            message: "Key details fetched successfully",
            details: token_details
        });

    }catch(err){
        console.log("Error while fetching key details: ", JSON.stringify(err));
        return res.status(500).jsonp({
            status_code: 500,
            message: "Error while fetching key details"
        })
    }
};

exports.remove_key = async (req, res) => {
    try{
        if (!req || !req.params || !req.params.hasOwnProperty("id")){
            return res.status(400).jsonp({
                status_code: 400,
                message: "Invalid request"
            });
        }

        await models.tokens.update({
            in_use: 0,
            is_active: 0
        }, {
            where: {
                token_key: req.params.id
            }
        });

        console.log("Key deleted successfully");
        return res.status(200).jsonp({
            status_code: 200,
            message: "Key deleted successfully"
        });

    }catch(err){
        console.log("Error while deleting key: ", JSON.stringify(err));
        return res.status(500).jsonp({
            status_code: 500,
            message: "Error while deleting key"
        })
    }
};

exports.unblock_key = async (req, res) => {
    try{
        if (!req || !req.params || !req.params.hasOwnProperty("id")){
            return res.status(400).jsonp({
                status_code: 400,
                message: "Invalid request"
            });
        }

        await models.tokens.update({
            in_use: 0,
        }, {
            where: {
                token_key: req.params.id
            }
        });

        console.log("Key unblocked successfully");
        return res.status(200).jsonp({
            status_code: 200,
            message: "Key unblocked successfully"
        });

    }catch(err){
        console.log("Error while unblocking key: ", JSON.stringify(err));
        return res.status(500).jsonp({
            status_code: 500,
            message: "Error while unblocking key"
        })
    }

};

exports.keep_key_alive = async (req, res) => {
    try{
        if (!req || !req.params || !req.params.hasOwnProperty("id")){
            return res.status(400).jsonp({
                status_code: 400,
                message: "Invalid request"
            });
        }

        await models.tokens.update({
            expiry_at: new Date(Date.now() + 5*60000),
        }, {
            where: {
                token_key: req.params.id
            }
        });

        console.log("Key refreshed successfully");
        return res.status(200).jsonp({
            status_code: 200,
            message: "Key refreshed successfully"
        });

    }catch(err){
        console.log("Error while refreshing key: ", JSON.stringify(err));
        return res.status(500).jsonp({
            status_code: 500,
            message: "Error while refreshing key"
        })
    }
};
