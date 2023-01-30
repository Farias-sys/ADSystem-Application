//@Author: Faria-sys
//Last-update: 13/12/2022 by Faria-sys
//File description: Controller de desconectar o usuário da sessão e limpar os tokens
require('dotenv').config()


async function Disconnect(res){
    // Clear cookies

    res.clearCookie(process.env.TOKEN_NAME)
    console.log("- DisconnectController: User disconnected")
    res.redirect('/')

}

module.exports = Disconnect;