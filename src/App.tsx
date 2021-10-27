import { BrowserRouter, Route, Switch } from 'react-router-dom'; // adicionar o pacote @types/react-router-dom -D
// Switch nunca deixa duas rotas serem abertas ao mesmo tempo, se uma rota foi aberta ele não abre a próxima
import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';

import {AuthContextProvider} from './contexts/AuthContext';
import { Room } from './pages/Room';

function App() {

  return (
    <BrowserRouter>
    <AuthContextProvider>
      <Switch>
        <Route path="/" exact={true} component={Home} />
        <Route path="/rooms/new" exact component={NewRoom} />
        <Route path="/rooms/:id" component={Room} />
      </Switch>
    </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
