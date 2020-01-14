const crypto = require('crypto');

function zamixujHeslo(heslo) {
    //let mix = heslo.split("").reverse().join("");
    let mix = crypto.createHash("sha256").update(heslo).digest("hex");
    mix = mix.split("").reverse().join("");
    return mix;
}

//registrace
let hesloZRegistrace = "testicek";
let mixZRegistrace = zamixujHeslo(hesloZRegistrace);
console.log("mixZRegistrace: "+mixZRegistrace); //toto bude ulozeno v souboru/databazi

//prihlaseni
let hesloZPrihlaseni = "testicek";
let mixZPrihlaseni = zamixujHeslo(hesloZPrihlaseni);
console.log("mixZPrihlaseni: "+mixZPrihlaseni);
if (mixZPrihlaseni === mixZRegistrace) {
    console.log("OK");
} else {
    console.error("spatne heslo!");
}