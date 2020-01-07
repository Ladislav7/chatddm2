const createSpaServer = require("spaserver").createSpaServer;
const apiChat = require('./api-chat').apiChat;
const apiUsers = require('./api-users').apiUsers;

const PORT = 8080; //aplikace na Rosti.cz musi bezet na portu 8080
const API_HEAD = {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*"
};
const API_STATUS_OK = 0;
const API_STATUS_NOT_FOUND = -1;

function processApi(req, res) {
    res.writeHead(200, API_HEAD);
    let obj = {};
    obj.status = API_STATUS_OK;
    if (req.pathname.startsWith("/chat/")) {
        apiChat(req, res, obj);
    }else if (req.pathname.startsWith("/users/")) {
            apiUsers(req, res, obj);
   } else {
        obj.status = API_STATUS_NOT_FOUND;
        obj.error = "API not found";
    }
    res.end(JSON.stringify(obj));
}

createSpaServer(PORT, processApi);
