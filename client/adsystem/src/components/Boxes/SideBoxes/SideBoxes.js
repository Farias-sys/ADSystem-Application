/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import '../../../assets/styles/boxdisplay/BoxDisplay.css'
import "../../../assets/styles/forms/form-new-item.css"

import {Modal} from "react-bootstrap"

import CategoryTable from "../../Tables/CategoriesTable/CategoriesTable"
import CategoryForm from "../../Forms/Category/CategoryForm"

import DepartmentTable from '../../Tables/DepartamentsTable/DepartamentsTable'
import DepartmentForm from "../../Forms/Department/DepartmentForm"

import ProvidersTable from '../../Tables/ProvidersTable/ProvidersTable';
import ProviderForm from '../../Forms/Provider/ProviderForm'

export default function SideBoxes(props){    
    const[showAdd, setShowAdd] = useState(false)
    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => setShowAdd(true)

    let Title
    let ExibithionForm
    let ExibithionTable
    let containerBlueClass
    switch (props.type) {
        case "category":
            Title = "Categorias"
            ExibithionForm = <CategoryForm/>
            ExibithionTable = <CategoryTable/>
            containerBlueClass= "container-blue-sidebox categories"
            break;
        case "department":
            Title = "Departamentos"
            ExibithionForm = <DepartmentForm/>
            ExibithionTable= <DepartmentTable/>
            containerBlueClass= "container-blue-sidebox departments"
            break;
        case "provider":
            Title = "Fornecedores"
            ExibithionForm = <ProviderForm/>
            ExibithionTable= <ProvidersTable/>
            containerBlueClass= "container-blue-sidebox providers"
            break;
        default:
            break;
    }

    return(
        <>
            <div className='container sidebox'>
                <div className='container-content'>
                    <div className='container-header'>
                        <div className="container-title">{Title}</div>
                        <button onClick={handleShowAdd}>
                            <i class='bx bxs-folder-plus' style={{marginRight:'0.4rem'}}></i>
                        </button>
                    </div>
                    <div className='container-table'>
                        {ExibithionTable}
                    </div>
                </div>
                <div className={containerBlueClass}></div>
            </div>

            <Modal show={showAdd} onHide={handleCloseAdd} className='insert-modal'>
                <Modal.Body className='insert-modal-body'>
                    {ExibithionForm}
                </Modal.Body>
            </Modal>
        </>
    )
}