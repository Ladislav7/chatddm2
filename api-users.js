const dateFormat = require('dateformat');
const fs = require('fs');
const FILE_USERS = "users.json";
const crypto = require('crypto');

function zamixujHeslo(heslo) {
    //let mix = heslo.split("").reverse().join("");
    let mix = crypto.createHash("sha256").update(heslo).digest("hex");
    mix = mix.split("").reverse().join("");
    return mix;
}

let list = new Array();
if (fs.existsSync("users.json")){
    list = JSON.parse(fs.readFileSync("users.json").toString());
}
console.log(list);

exports.apiUsers = function (req, res, obj) {
    if (req.pathname.endsWith("/list")) {
        obj.list = list;
    } else if (req.pathname.endsWith("/reg")) {
        for (let u of list){//for (let i =0; i<list.length; i++) {let u = list[i]}
            console.log(u);
            if (u.login === req.parameters.login){
                obj.error = "Uzivatelske jmeno uz existuje";
                break;
            }
        }
        if (!obj.error){// (obj.error == undefined )
        let addObj = {};
        let dt = new Date();
        addObj.time = dateFormat(dt, "HH.MM.ss");
        addObj.login = req.parameters.login;
        addObj.password = zamixujHeslo(req.parameters.password);
        list.push(addObj);
        fs.writeFileSync(FILE_USERS, JSON.stringify(list, null, 2));
        }
    } else if (req.pathname.endsWith("/login")) {
        obj.error = "Uzivatelske jmeno nebo heslo je spatne!";
        for (let u of list){//for (let i =0; i<list.length; i++) {let u = list[i]}
            console.log(u);
            if (u.login === req.parameters.login){
                if (u.password === zamixujHeslo(req.parameters.password)){
                    obj.error = null; //timto neni error nastaven
                }
            break;
            }
        }
    }
};