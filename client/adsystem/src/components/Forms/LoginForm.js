//@Author: Faria-sys
//Last-update: 13/12/2022 by Faria-sys
//File description: Formulário de login [Component]

/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from 'axios';
import React, {useState} from 'react';

import { Link } from "react-router-dom" 


export default function LoginForm(props){
    const[Username, setUsername] = useState('')
    const[Password, setPassword] = useState('')

    const auth = {
        async Login(e, email, password){
            const response = await axios.post("/auth/login", {email,password}, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            if(response.data.message=="Error"){
                alert("Senha ou email inválidos")
            }  else {
                window.location.href = "/home"
            }
            

            
        }
    }

    return(
        <form id="formAuthentication" class="mb-3" onSubmit={(e) => auth.Login(e, Username, Password)}>
            <div class="mb-3">
            <label for="email" class="form-label">Username (Email)</label>
            <input
                type="text"
                class="form-control"
                id="email"
                name="email-username"
                placeholder="Enter your email or username"
                autofocus
                required
                onChange={(e) => setUsername(e.target.value)}
            />
            </div>
            <div class="mb-3 form-password-toggle">
            <div class="d-flex justify-content-between">
                <label class="form-label" for="password">Senha</label>
                <Link to="/forgotpwd">
                    <small>Esqueceu a senha?</small>
                </Link>
                
                
                
                
            </div>
            <div class="input-group input-group-merge">
                <input
                type="password"
                id="password"
                class="form-control"
                name="password"
                placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                aria-describedby="password"
                required
                onChange={(e) => setPassword(e.target.value)}
                />
                <span class="input-group-text cursor-pointer"><i class="bx bx-hide"></i></span>
            </div>
            </div>
            <div class="mb-3">
            <button class="btn btn-primary d-grid w-100" type="submit">Entrar</button>
            </div>
        </form>
    )
}
