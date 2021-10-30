import {Link, useHistory} from 'react-router-dom'
import { FormEvent, useState } from 'react';
import illustrationImg from '../assets/images/illustration.svg'
import logoImage from '../assets/images/logo.svg';
import pergunteiLogo from '../assets/images/perguntei-logo.png'

import { Button } from '../components/Button';

import '../styles/auth.scss'
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';
import toast, { Toaster } from 'react-hot-toast';

export function NewRoom() {
    const { user } = useAuth();
    const history = useHistory()
    const [newRoom, setNewRoom] = useState('')

    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault();
                //remover espaços
        if(newRoom.trim() === '') {
            toast.error("Insira o nome da sala.")
            return;
        }

        // reference do firebase, a referência pra um registro de dado dentro do DB
        const roomRef = database.ref('rooms');

        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id,
        })

        toast.success('Sala criada com sucesso.')
                            // id/chave do registro criado no firebase
        history.push(`/admin/rooms/${firebaseRoom.key}`)
    }

    return (
        <div id="page-auth">
            <Toaster
              position="top-center"
              reverseOrder={false}/>
            <aside>
                <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo-real</p>
            </aside>

            <main>
                <div className="main-content">
                    <img width="" height="40" src={pergunteiLogo} alt="Perguntei?" />
                    <h2>Criar uma nova sala</h2>
                    <form onSubmit={handleCreateRoom}>
                        <input 
                            type="text" 
                            placeholder="Nome da sala"
                            onChange={event => setNewRoom(event.target.value)}
                            value={newRoom}  
                        />
                        <Button type="submit">
                        Criar sala
                        </Button>
                    </form>
                    <p>
                        Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>
                    </p>
                </div>
            </main>
        </div>
    )
}