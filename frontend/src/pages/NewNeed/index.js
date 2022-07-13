import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom'
import {FiArrowLeft} from 'react-icons/fi'

import api from '../../services/api'
import './styles.css'

import logoImg from '../../assets/logo.svg';


export default function Register(){
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');

    const history = useHistory();
    const instId = localStorage.getItem('instId');   

    async function handleNewNeed(e){
        e.preventDefault();

        const data = {
            titulo,
            descricao,
            valor,
        };

        try {
            await api.post('necessidades', data, {
                headers: {
                    Authorization: instId,
                }
            });

            history.push('/profile');

        }catch (err){
            alert('Erro ao cadastrar caso, tente novamente.');
        }
    }

    return (
        <div className="new-need-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Solidarize"/>

                    <h1>Cadastrar nova necessidade</h1>
                    <p>
                        Descreva-a detalhadamente.
                    </p>
                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color ="#6A5ACD"/>
                        Voltar para home
                    </Link>
                </section>
                <form onSubmit={handleNewNeed}>
                    <input placeholder="Título" value={titulo} onChange={e => setTitulo(e.target.value)} />
                    <textarea placeholder="Descrição" value={descricao} onChange={e => setDescricao(e.target.value)} />
                    <input placeholder="Valor em reais" value={valor} onChange={e => setValor(e.target.value)} />
                        

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}