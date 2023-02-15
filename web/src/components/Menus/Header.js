/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useEffect} from "react";
import "../../assets/styles/Header.css"
import LogoSVG from "../../assets/images/logoADS2.svg"
import {Modal} from "react-bootstrap"



import axios from '../../lib/axios'

export default function Header() {
    const disconnect = {
        async post(){
            await axios.post('/auth/disconnect')
            window.location.href = '/'
        }
    }

    const[showAdd, setShowAdd] = useState(false)
    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => setShowAdd(true)


    const[image, setImage] = useState('')
    
    const uploadImage = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image)

        await axios.post("/api/data/avatar", formData, {headers:{'Content-Type': 'multipart/form-data'}})
        window.location.reload()
    }

    const[img_source, setImgSource] = useState('')

    const auth = {
        async Logged(){
            const response_user = await axios.post("/api/data/read", {database:"users:auto"})
            setImgSource("http://localhost:5000/uploads/" + await response_user.data.image_path)
        }
    }

    useEffect(()=> {
        auth.Logged()
    }, [])
    
    return (
        <>
        <header className="header">
            <a href="#">
                <img src={LogoSVG} alt="Logo Adsystem" id="logo--landing" />
            </a>
            <div className="profile-section-container">
                <div className="img-container" onClick={handleShowAdd}>
                    <img src={img_source} className="img-avatar"></img>
                </div>
                <div className="profile-section-content">
                    <div className="profile-section-text">
                        <h2 className="profile-section" id="username">Carlos Alberto</h2>
                        <h2 className="profile-section">Empresa: Coluna Metalurgia</h2>
                    </div>
                    <button className="profile-section" onClick={(e) => disconnect.post()}>Log-out</button>
                </div>
            </div>
                
        </header>

        <Modal show={showAdd} onHide={handleCloseAdd} className='insert-modal'>
            <Modal.Body className='insert-modal-body'>
                <div className="form-style-6">
                    <form onSubmit={uploadImage} >
                        <input type="file" id="file"  name="image" onChange={e => setImage(e.target.files[0])}></input>
                        <button type="submit">Enviar</button>
                    </form>
                </div>
            </Modal.Body>
        </Modal>

        </>
    )
}