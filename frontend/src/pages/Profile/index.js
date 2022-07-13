import React, { useState, useEffect } from 'react';
import { Link, useHistory }  from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Profile() {
    const [necessidades, setNecessidades] = useState([]);

    const history = useHistory();

    const instId = localStorage.getItem('instId');
    const instNome = localStorage.getItem('instNome');

    useEffect(() => {
      api.get('profile', {
          headers: {
              Authorization: instId,
          }
      }).then (response => {
        setNecessidades(response.data);
      })
    }, [instId]);

    async function handleDeleteNecessidade(id){
      try{
          await api.delete(`necessidades/${id}`, {
              headers: {
                  Authorization: instId,
              }
          });

          setNecessidades(necessidades.filter(necessidade => necessidade.id !== id))

      }catch(err){
          alert('Erro ao deletar caso, tente novamente')
      }
    }

    function handleLogout(){
      localStorage.clear();
      history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Solidarize" />
                <span>Bem vinda, {instNome}</span>
    
                <Link className="button" to="/necessidades/new" >Cadastrar nova necessidade</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#6A5ACD" />
                </button>
            </header>

            <h1>Necessidades cadastradas</h1>
            <ul>
                {necessidades.map(necessidade => (
                  <li key={necessidade.id}>
                    <strong>NECESSIDADE:</strong>
                    <p>{necessidade.titulo}</p>

                    <strong>DESCRIÇÃO:</strong>
                    <p>{necessidade.descricao}</p>

                    <strong>VALOR:</strong>
                    <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(necessidade.valor)}</p>

                    <button onClick={() => handleDeleteNecessidade(necessidade.id)} type="button">
                        <FiTrash2 size={20} color="#6A5ACD"></FiTrash2>
                    </button>
                  </li>
                ))}            
            </ul>
        </div>
    );
}