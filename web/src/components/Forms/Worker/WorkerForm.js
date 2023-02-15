//@Author: Faria-sys
//Last-update: 13/12/2022 by Faria-sys
//File description: Formulário de department [Component]

/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from '../../../lib/axios';
import React, {useState} from 'react';

// Styles
import "../../../assets/styles/forms/form-new-item.css"

import FormSelect from '../FormSelect';

export default function CategoryForm(props){
    const[real_name, setRealName] = useState('')
    const[username, setUsername] = useState('')
    const[department, setDepartment] = useState('')
    const[buyer, setBuyer] = useState(0)
    const[permissions, setPermissions] = useState('')
    
    const create = {
        submitData(e, real_name, username, buyer, permissions, department){
            axios.post("/api/data/create/configs/user", {
                real_name:real_name,
                username:username,
                buyer:buyer,
                permissions:permissions,
                department:department
            })
        }
    }

    return(
        <div className='form-style-6'>
        <h1 className='remove'>Novo funcionário</h1>
            <form onSubmit={(e) => create.submitData(e, real_name, username, buyer, permissions, department)}>
                <input type="text" id="user_real_name" placeholder='Digite o nome do usuário' required onChange={(e) => {setRealName(e.target.value)}}/>

                <input type="email" id="email" placeholder='Insira o email do novo usuário' required onChange={(e) => {setUsername(e.target.value)}}/>

                <select name="department" required onChange={(e) => {setDepartment(e.target.value)}}>
                    <FormSelect type={"departments"} placeholder="Insira o departamento do novo usuário"/>
                </select>

                <select name="buyer" required onChange={(e) => {setBuyer(e.target.value)}}>
                    <option value="" disabled selected hidden>O usuário é comprador?</option>
                    <option value={1}>Sim</option>
                    <option value={0}>Não</option>
                </select>

                <select name="permissions" required onChange={(e) => {setPermissions(e.target.value)}}>
                    <option value="" disabled selected hidden>Quais as permissões do novo usuário?</option>
                    <option value="admin">Administrador</option>
                    <option value="extern">Acesso externo (Apenas pedidos de compra)</option>
                </select>

                <input type="submit" value="Adicionar funcionário" />
            </form>
        </div>
    )
}

