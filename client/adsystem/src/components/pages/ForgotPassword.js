//@Author: Faria-sys
// HTML Code by sneat-bootstrap
//Last-update: 13/12/2022 by Faria-sys
//File description: Página de login

// Importing modules

import { Helmet } from "react-helmet";
import React, {useEffect, useState} from 'react';

import { Link } from "react-router-dom" 

// Importing components

import LoginForm from "../Forms/LoginForm";

// Importing Assets

import LogoSVG from "../../assets/images/logoADS2.svg"

// Importing Styles

import "../../assets/styles/login/core.css"
import "../../assets/fonts/boxicons.css"
import "../../assets/styles/login/theme-default.css"
import "../../assets/styles/login/demo.css"

import "../../assets/styles/login/page-auth.css"

import axios from 'axios';

export default function ForgotPassword(){
    const sendRequest = async (username) =>{
        const response = await axios.post('/auth/reset_user', {username:username})
        if(response=="UserInexistent"){
            alert("Usuário inexistente")
        }
    }

    const[username, setUsername] = useState('')

    return(
        <div class="container-xxl">
        <div class="authentication-wrapper authentication-basic container-p-y">
          <div class="authentication-inner py-4">
            <div class="card">
              <div class="card-body">
                <div class="app-brand justify-content-center">
                  <a href="index.html" class="app-brand-link gap-2">
                  <img src={LogoSVG}></img>
                  </a>
                </div>
                <h4 class="mb-2">Esqueceu a senha? 🔒</h4>
                <p class="mb-4">Insira seu email e enviaremos uma senha de recuperação.</p>
                <form id="formAuthentication" class="mb-3" onSubmit={(e) => sendRequest(username)}>
                  <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input
                      type="text"
                      class="form-control"
                      id="email"
                      name="email"
                      placeholder="Insira seu email"
                      autofocus
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <button class="btn btn-primary d-grid w-100">Resetar senha</button>
                </form>
                <div class="text-center">
                  <Link to="/" class="d-flex align-items-center justify-content-center">
                    <i class="bx bx-chevron-left scaleX-n1-rtl bx-sm"></i>
                    Voltar para a página de login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}