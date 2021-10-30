import {useHistory} from 'react-router-dom'

import { auth, database, firebase } from '../services/firebase'

import illustrationImg from '../assets/images/illustration.svg'

import googleIconImg from '../assets/images/google-icon.svg';
import pergunteiLogo from '../assets/images/perguntei-logo.png';

import { Button } from '../components/Button';

import '../styles/auth.scss'
import { useAuth } from '../hooks/useAuth';
import { FormEvent, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';


export function Home() {

    const history = useHistory();
    const { user, signInWithGoogle } = useAuth();
    const [roomCode, setRoomCode] = useState('');

    async function handleCreateRoom() {
        if(!user) {
            await signInWithGoogle();
        }

        history.push('/rooms/new');
    }

    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault();

        if(roomCode.trim() === '') {
            return;
        }

        const roomRef = await database.ref(`/rooms/${roomCode}`).get() // o get() busca todos os registros dessa sala / todos os dados
            // caso não exista...
        if(!roomRef.exists()) {
            toast.error("Essa sala não existe!")
            toast(
                "Entre com um código válido.",
                {
                  duration: 5000,
                }
              );
            return;
        }

        if(roomRef.val().endedAt) {
            toast('Essa sala já foi encerrada... 🙁');
            return;
        }

        history.push(`/rooms/${roomCode}`)
    }

    return (

        <div id="page-auth">
            <Toaster
              position="top-center"
              reverseOrder={true}/>
            <aside>
                <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
                <strong>Crie salas de perguntas e respostas em tempo real!</strong>
                <p>Interaja com a sua audiência ao vivo.</p>
            </aside>

            <main>
                <div className="main-content">
                    <img width="" height="55" src={pergunteiLogo} alt="Perguntei?" />
                    <button onClick={handleCreateRoom} className="create-room">
                        <img src={googleIconImg} alt="Logo do Google" />
                        Crie sua sala com o Google
                    </button>
                    <div className="separator">Ou entre em uma sala</div>
                    <form onSubmit={handleJoinRoom}>
                        <input 
                            type="text" 
                            placeholder="Digite o código da sala"
                            onChange={event => setRoomCode(event.target.value)}
                            value={roomCode}  
                        />
                        <Button type="submit">
                        Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}