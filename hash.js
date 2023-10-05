const SHA256 = require("crypto-js/sha256");
for (let index = 0; index < 100; index++) {
    console.log( SHA256(index+"").toString());
    
}

/*console.log(SHA256("Maçã").toString());
console.log(SHA256("Maça").toString());
console.log(SHA256("Maca").toString());
console.log(SHA256("Massa").toString());*/