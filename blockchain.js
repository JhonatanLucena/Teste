const SHA256 = require("crypto-js/sha256");

class Block{
    constructor( index, timestemp, dados, hashAnterior){
        this.content ={};
        this.content.index= index;
        this.content.timestemp= timestemp;
        this.content.dados= dados;
        this.content.nonce = 0;
        this.content.hashAnterior= hashAnterior;
        this.hash = "";
    }
    calcularHash(){
        return SHA256(JSON.stringify(this.content)).toString();
    }
    mine(zeros){
        let start = new Date().getTime();
        do {
            this.hash = this.calcularHash();
            this.content.nonce++;
        } while (this.hash.substring(0, zeros) != Array(zeros+1).join("0"));

        let end = new Date().getTime();
        console.log("Bloco Minerado em " + ((end-start)/1000) + "Segundos")
    }
}
class Blockchain{
    constructor(){
        this.chain = [];
        this.dificulty = 4;
        this.criarBlocoGenesis();
    }
    criarBlocoGenesis(){
        let bloco = new Block(0, "04/10/2023", "Gênesis", "");
        bloco.mine(this.dificulty);
        this.chain.push(bloco);
    }
    getUltimoBloco(){
        return this.chain[this.chain.length - 1];
    }
    addBloco(bloco){
        bloco.content.hashAnterior = this.getUltimoBloco().hash;
        //bloco.hash = bloco.calcularHash();
        bloco.mine(this.dificulty);
        this.chain.push(bloco);
    }

}
var myChain = new Blockchain();
myChain.addBloco(  new Block(1, "04/10/2023", "Maçã", "" ));
myChain.addBloco(  new Block(2, "05/10/2023", "Laranja", ""));
myChain.addBloco(  new Block(3, "06/10/2023", "Pera", ""));
myChain.addBloco(  new Block(4, "07/10/2023", "maca","" ));

//console.log( JSON.stringify(myChain, null, 4));
/*
    var block1 = new Block(1, "04/10/2023", "Maçã", "");
    block1.hash = block1.calcularHash();
    var block2 = new Block(2, "05/10/2023", "Laranja", block1.hash);
    block2.hash = block2.calcularHash();
    var block3 = new Block(3, "06/10/2023", "Pera", block2.hash);
    block3.hash = block3.calcularHash();
    
    console.log(JSON.stringify(block1, null, 4));
    console.log(JSON.stringify(block2, null, 4));
    console.log(JSON.stringify(block3, null, 4));

    block2.content.dados = "Melancia";
    block2.hash = block2.calcularHash();

    console.log("Hash do conteudo: " + block2.calcularHash());
    console.log("Hash registrada: " + block2.hash);
    console.log("Hash anterior block 3: " + block3.content.hashAnterior);
*/