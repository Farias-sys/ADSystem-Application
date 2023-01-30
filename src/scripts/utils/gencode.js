//@Author: Faria-sys
//Last-update: 28/07/2022 by Faria-sys
//File description: Gera códigos aleatórios
// Reference - https://acervolima.com/como-gerar-uma-senha-aleatoria-usando-javascript/#:~:text=Abordagem%201:%20Fa%C3%A7a%20uma%20string,%C3%A9%20o%20comprimento%20da%20string).

function genPassword() {
    var code = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 15; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}

module.exports = genPassword;