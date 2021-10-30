import { Link, useHistory, useParams } from 'react-router-dom'

import pergunteiLogo from '../assets/images/perguntei-logo.png'
import deleteImg from '../assets/images/delete.svg';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';

import { Button } from '../components/Button';
import { Question } from '../components/Question';
import { RoomCode } from '../components/RoomCode';

// import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';

import '../styles/room.scss';
import { Fragment } from 'react';
import { Footer } from '../components/Footer';
import toast, { Toaster } from 'react-hot-toast';
import { settings } from 'cluster';

type RoomParams = {
  id: string;
}

export function AdminRoom() {
  // const { user } = useAuth();
  const history = useHistory()
  const params = useParams<RoomParams>();
  const roomId = params.id;

  const { title, questions } = useRoom(roomId)

  async function handleEndRoom() {
    if(window.confirm('Tem certeza que deseja encerrar essa sala?')) {
      await database.ref(`rooms/${roomId}`).update({
        endedAt: new Date()
      })

      toast.success('Sala encerrada com sucesso.')
  
      history.push('/');
    }
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm('Tem certeza que você deseja excluir esta pergunta?')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
      toast.success('Pergunta deletada.')
    }
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true
    });
    toast.success('Pergunta respondida!')
  }
  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true
    });

    toast.success('Respondendo esta pergunta...', {
      duration: 6000,
      style: {
        border: '1px solid #5a78fd',
        padding: '16px',
        color: '#5a78fd',
      },
      iconTheme: {
        primary: '#5a78fd',
        secondary: '#FFFAEE',
      },
    });
  }

  return (
    <div id="page-room">
      <Toaster
          position="top-center"
          reverseOrder={false}
        />

      <header>
        <div className="content">
          <Link to="/"><img width="" height="40" src={pergunteiLogo} alt="Perguntei Logo" /></Link>
          <div>
            <RoomCode code={roomId} />
            <Button title="Encerrar sala" isOutlined onClick={handleEndRoom}>Encerrar sala</Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala: {title}</h1>
          { questions.length > 0 && <span>{questions.length} pergunta(s)</span> }
        </div>

        <div className="question-list">
          {questions.map(question => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
                isAnswered={question.isAnswered}
                isHighlighted={question.isHighlighted}
              >
                {!question.isAnswered && (
                  <Fragment>
                    <button
                      type="button"
                      onClick={() => handleCheckQuestionAsAnswered(question.id)}
                      title="Marcar como já respondida"
                    >
                      <img src={checkImg} alt="Remover pergunta" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleHighlightQuestion(question.id)}
                      title="Marcar como pergunta sendo respondida no momento"
                    >
                      <img src={answerImg} alt="Marcar pergunta como respondida" />
                    </button>
                  </Fragment>
                )}
                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(question.id)}
                  title="Deletar pergunta"
                >
                  <img src={deleteImg} alt="Dar destaque à pergunta" />
                </button>
              </Question>
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
}