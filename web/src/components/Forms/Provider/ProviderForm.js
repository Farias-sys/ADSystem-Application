//@Author: Faria-sys
//Last-update: 13/12/2022 by Faria-sys
//File description: Formulário de estoque [Component]

/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from '../../../lib/axios';
import React, {useState} from 'react';

// Styles
import "../../../assets/styles/forms/form-new-item.css"

export default function ProviderForm(props){
    const[name, setNameCategory] = useState('')

    const create = {
        submitData(e, name){
            axios.post("/api/data/create/configs/provider", {
                provider_name:name
            })
        }
    }

    return(
        <div class="form-style-6"> 
            <h1>Novo fornecedor</h1>
            <form onSubmit={(e) => create.submitData(e, name)}>
                <input type="text" name="item_name" placeholder="Nome do fornecedor" required onChange={(e) => {setNameCategory(e.target.value)}}/>                
                <input type="submit" value="Adicionar"/>
            </form>
        </div>
    )
}