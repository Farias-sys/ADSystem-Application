//@Author: Faria-sys
// HTML Code by https://www.cssscript.com/responsive-side-tab-navigation/
//Last-update: 13/12/2022 by Faria-sys
//File description: Sidebar component

// Importing modules

import React, {useEffect, useState} from "react"
import { Link } from "react-router-dom" 
import axios from "axios"
import ReactDOM from "react-dom";


// Styles

import "../../assets/fonts/boxicons.css"
import "../../assets/styles/sidebar/sidebar.css"

export default function Sidebar(){
    const[data, setData] = useState('')
    const auth = {
        async Logged(){
            const response = await axios.post("/api/data/read", {database:"users:auto"})
            if(response.data=='' || response.data == null){
                window.location.href = "/"
                return 'none'
            } else {
                setData(await response.data.permissions)
            }
        }
    }



    useEffect(()=> {
        auth.Logged()
    }, [])

    function access(data){
        if(data=="admin"){
            return(

                <>
            <div class="nav show-menu" id="nav">
                <nav class="nav__content">

{/*                     <a href="#" class="nav__logo">
                        <i class='bx bxs-heart' ></i>
                        <span class="nav__logo-name">Healthy</span>
                    </a> */}

                    <div class="nav__list">
                        <Link to="/home" class="nav__link">
                            <i class='bx bx-grid-alt'></i>
                            <span class="nav__name">Início</span>
                        </Link>

                        <Link to="/stock" class="nav__link">
                            <i class='bx bxs-data'></i>
                            <span class="nav__name">Estoque</span>
                        </Link>

                        <Link to="/inventory" class="nav__link">
                            <i class='bx bx-box'></i>
                            <span class="nav__name">Materiais</span>
                        </Link>

                        <Link to="/shop_requests" class="nav__link">
                            <i class='bx bx-cart-alt'></i>
                            <span class="nav__name">Pedidos de compra</span>
                        </Link>

                        <Link to="/transactions" class="nav__link">
                            <i class='bx bx-transfer'></i>
                            <span class="nav__name">Transações</span>
                        </Link>

                        <Link to="/workers" class="nav__link">
                            <i class='bx bxs-face-mask'></i>
                            <span class="nav__name">Funcionários</span>
                        </Link>
                    </div>
                </nav>

            </div>

        </>
            )
        } else if(data=='extern'){
            return(
                <div class="nav show-menu" id="nav">
                <nav class="nav__content">
                <Link to="/shop_requests" class="nav__link">
                    <i class='bx bx-cart-alt'></i>
                    <span class="nav__name">Pedidos de compra</span>
                </Link>
                </nav>
                </div>
            )
        }
    }
    
    return(
        <>{access(data)}</>
    )
    
}