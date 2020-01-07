const dateFormat = require('dateformat');

let list = new Array();

exports.apiChat = function (req, res, obj) {
    if (req.pathname.endsWith("/list")) {
        obj.list = list;
    } else if (req.pathname.endsWith("/shortlist")) {
        obj.list = list.slice(-3);
    } else if (req.pathname.endsWith("/add")) {
        let addObj = {};
        let dt = new Date();
        addObj.time = dateFormat(dt, "HH.MM.ss");
        addObj.val = req.parameters.value;
        addObj.nick = req.parameters.nick;
        list.push(addObj);
    }
};