import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api'
import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Register(){
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [cidade, setCidade] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory();

    async function handleRegister(e){
        e.preventDefault();

        const data = {
            nome,
            email,
            whatsapp,
            cidade,
            uf,
        };

        try {
          const response = await api.post('instituicoes', data);
          alert(`Seu ID de acesso: ${response.data.id}`);
          history.push('/');
        } catch(err){
           alert('Erro no cadastro, tente novamente.');
        }

    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                   <img src={logoImg} alt="Solidarize-se"/>

                   <h1>Cadastro</h1>
                   <p>Faça seu cadastro, entre na plataforma e ajude a encontrarem suas solicitações de ajuda.</p>

                   <Link className="back-link" to="/">
                     <FiArrowLeft size={16} color ="#6A5ACD"/>
                     Voltar
                   </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input placeholder="Nome da Instituição" value={nome} onChange={e => setNome(e.target.value)} />
                    <input type="email" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} />
                    <input placeholder="WhatsApp" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} />

                    <div className="input-group">
                        <input placeholder="Cidade" value={cidade} onChange={e => setCidade(e.target.value)} />
                        <input placeholder="UF" style={{width: 80}} value={uf} onChange={e => setUf(e.target.value)} />
                    </div>

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}