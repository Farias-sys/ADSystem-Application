//@Author: Faria-sys
// HTML Code by sneat-bootstrap
//Last-update: 13/12/2022 by Faria-sys
//File description: Página de login

// Importing modules

import { Helmet } from "react-helmet";
import React, {useEffect} from 'react';


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


export default function Login(){
    const auth = {
        async Logged(){
            const response = await axios.get("/auth/logged")
            if(response.data=false){
                window.location.href = "/home"
            }
        }
    }
    
    useEffect(()=> {
        auth.Logged()
    }, [])
    
    return(
        <>
        <Helmet>
            <title>Login</title>

            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link
            href="https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap"
            rel="stylesheet" />
        </Helmet>

        <div class="container-xxl">
            <div class="authentication-wrapper authentication-basic container-p-y">
                <div class="authentication-inner">
                
                <div class="card">
                    <div class="card-body">
                    
                    <div class="app-brand justify-content-center">
                        <a href="index.html" class="app-brand-link gap-2">
                        <span class="app-brand-logo demo">
                            
                        </span>
                        <span class="app-brand-text demo text-body fw-bolder"><img src={LogoSVG}></img></span>
                        </a>
                    </div>
                    
                    <h4 class="mb-2">Bem vindo ao ADSystem! 👋</h4>
                    <p class="mb-4">Logue com o usuário e senha cadastrado pela empresa ou enviado pelo email no momento da ativação</p>

                    <LoginForm/>
                    
                    </div>
                </div>
                
                </div>
            </div>
            </div>
        </>
    )
}