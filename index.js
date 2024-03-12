"use strict";
// Parkhaus 
//
// - Parkhaus mit 2 Etagen
// - pro Etage 10 Parkplätze
// - 1. Etage Plätze 1-7 nur für Ladies
// - es sollen nur Autos ein/ausfahren
Object.defineProperty(exports, "__esModule", { value: true });
// -> mit dem groben Gerüst anfangen: Parkhaus
//  -> mit den Deklarationen beginnen, die bereits festgelegt sind
const myprompt = require("prompt-sync")({ sigint: true });
let anzEtagenZ = 2;
let anzPlaetze = 10;
let parkhaus = {
    namePH: "P1",
    etagen: [],
    aktuelleZeit: 800,
    anzEtagen: anzEtagenZ,
    plaetzeProEtage: anzPlaetze,
    preisProMin: 1
};
for (let i = 0; i < parkhaus.anzEtagen; i++) {
    let etage = { anzPlaetze: 10, plaetze: [] };
    parkhaus.etagen.push(etage);
    // ## warum
    parkhaus.etagen[i].anzPlaetze = parkhaus.plaetzeProEtage;
    for (let k = 0; k < parkhaus.plaetzeProEtage; k++) {
        let platz = {
            nummer: k + 1, frei: true, geschlecht: "Männlich",
            startZeit: 800, endZeit: 0, kz: ""
        };
        if (k < 7 && i == 0) {
            platz.geschlecht = "Weiblich";
        }
        parkhaus.etagen[i].plaetze.push(platz);
    }
}
console.log(parkhaus);
console.log(parkhaus.etagen[0].plaetze.flat());
console.log(parkhaus.etagen[1].plaetze.flat());
console.log("Auto parken, KZ: NE NE 1");
let etagenZahl = 0;
function einparken(kzeichen) {
    let geparkt = false;
    while (!geparkt) {
        for (let i = 0; i < parkhaus.anzEtagen; i++) {
            for (let j = 0; j < parkhaus.etagen[i].anzPlaetze; j++) {
                if (parkhaus.etagen[i].plaetze[j].frei == true) {
                    parkhaus.etagen[i].plaetze[j].frei = false;
                    parkhaus.etagen[i].plaetze[j].kz = kzeichen;
                    geparkt = true;
                    return console.log("Das Auto wurde geparkt \n\t>>KZ:", kzeichen, ", Etage: ", i + 1, ", Nummer: ", parkhaus.etagen[i].plaetze[j].nummer);
                }
            }
        }
        return console.log("Leider sind alle Plätze vergeben.");
    }
}
let kzeichen = "NE NE 1";
einparken(kzeichen);
einparken(genKZ(2));
// let z2 = "NE NE 3"
// einparken(z2)
einparken(genKZ(4));
console.log("Ende");
function femaleFreeCheck() {
    let zustand = true;
    while (zustand) {
        let i = 0;
        for (let j = 0; j < parkhaus.plaetzeProEtage; j++) {
            if (parkhaus.etagen[i].plaetze[j].nummer < 8 && parkhaus.etagen[0].plaetze[j].frei == true) {
                console.log("Frauenparkplaetze: Etage ", i + 1, " Nummer: ", parkhaus.etagen[i].plaetze[j].nummer);
            }
            if (j > 7) {
                zustand = false;
                break;
            }
        }
    }
}
femaleFreeCheck();
function ZahlGen(text, x) {
    for (let i = 0; i < x; i++) {
        let rd = Math.floor(Math.random() * 10).toFixed(0);
        text = text + rd;
    }
    console.log(text);
}
// generiert KZ in Format "XX-XX YYYY", Y = Übergabewert
function genKZ(x) {
    // kz generieren
    let kz = "";
    for (let j = 0; j < 2; j++) {
        for (let i = 0; i < 2; i++) {
            let zeichen = String.fromCharCode(Math.floor(Math.random() * 25 + 65));
            kz += zeichen;
        }
        if (kz.length > 3) {
            kz += " ";
            break;
        }
        kz += "-";
    }
    for (let i = 0; i < x; i++) {
        let rd = Math.floor(Math.random() * 10).toFixed(0);
        kz += rd;
    }
    return kz;
}
// genKZ(2)
// genKZ(4);
//Kennzeichen Array
let kzArray = [];
for (let i = 0; i < 10; i++) {
    kzArray[i] = genKZ(4);
}
kzArray.forEach(e => console.log(e));
for (let i = 0; i < 10; i++) {
    einparken("Einparken :" + kzArray[i]);
}
// ZahlGen("NE ", 4)
einparken(genKZ(4));
function ausparkenMitKZ(x) {
    let kzGefunden = true;
    for (let i = 0; i < parkhaus.anzEtagen; i++) {
        for (let j = 0; j < parkhaus.etagen[i].anzPlaetze; j++) {
            if (parkhaus.etagen[i].plaetze[j].kz == x) {
                console.log("Das Kennzeichen: > ", x, " < wurde gefunden.");
                parkhaus.etagen[i].plaetze[j].frei = true;
                parkhaus.etagen[i].plaetze[j].kz = "";
                return console.log("Das Auto wurde ausgeparkt.");
            }
        }
    }
    return console.log("Das Kennzeichen ", x, " konnte nicht gefunden werden.");
}
ausparkenMitKZ("NE NE 1");
ausparkenMitKZ("NE NE 1234");
function Info() {
    parkhaus;
}
