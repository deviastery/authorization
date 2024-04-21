import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IClient } from '../../types/data';

const AuthorizationPage: React.FC<{ setClients: 
                        (clients: IClient[]) => void }> = 
                        ({ setClients }: { setClients: 
                        (clients: IClient[]) => void }) => {

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    //const [clients, setClients] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        const data = {
          login,
          password
        };
    
        console.log(JSON.stringify(data));

          fetch('http://localhost:3001/api/users/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          })
          .then(response => {
            if (response.ok) {
                navigate('/clients');
                return response.json();
              } else {
                return response.json().then(data => { 
                            throw new Error(data.error) 
                        });
            }
          })
          .then(data => {
            setClients(data);
          })
          .catch(error => {
            console.error('Ошибка:', error.message);
            setErrorMessage(error.message);
          });
      };

    return (
        <>
            {errorMessage && <div>{errorMessage}</div>} 
            <form onSubmit={handleSubmit}>
                <label htmlFor="">login</label>
                <input 
                    type="text" 
                    value={login} 
                    placeholder='login' 
                    onChange={(e) => setLogin(e.target.value)}
                />
                <label htmlFor="">password</label>
                <input 
                    type="text" 
                    value={password} 
                    placeholder='password' 
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type='submit'>Log in</button>
            </form>
        </>
    )
};

export default AuthorizationPage;