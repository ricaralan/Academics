/**
*	Este modulo sirve para encriptar y desencriptar lo que se requiera...
*	Si es necesario cambiar la key por defecto tiene que ser en la instalación.
*	Ya que despues no se podrá por que entonces no se podría decifrar lo que
*	se ha guardado en base de datos.
*
*	@version 0.0.2
*	@author Alan Olivares
*/

var crypto	= require("crypto");
var configEncriptacion = require("./ConfigEncriptation");

var GetDateEncriptation = function(){
	
	/**
	*	INIT PRIVATE VARIABLES
	*/
	var openSSLCipherAlgorithm = configEncriptacion.openSSLCipherAlgorithm,
		key = configEncriptacion.key;

	this.cipher = function(wordToCipher) {
		cipher = null;
		if(wordToCipher) {
			try{
				var makeCipher 	= crypto.createCipher(openSSLCipherAlgorithm, key);
				cipher = makeCipher.update(wordToCipher, "utf8", "hex");
				cipher    += makeCipher.final("hex");
			}catch(e){
				console.log("cipher: ", e, e.message);
			}
		}
		return cipher;
	};

	this.decipher = function(wordToDecipher) {
		decipher = null;
		if(wordToDecipher) {
			try{
				var makeDecipher = crypto.createDecipher(openSSLCipherAlgorithm, key);
				decipher = makeDecipher.update(wordToDecipher, "hex", "utf8");
				decipher	+= makeDecipher.final("utf8");
			}catch(e){
				console.log("decipher: ", e, e.message);
			}
		}
		return decipher;
	};

};

module.exports = new GetDateEncriptation();
