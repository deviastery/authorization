import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IClient } from '../../types/data';

import styles from './AuthorizationPage.module.css';

const AuthorizationPage: React.FC<{ setClients: 
                        (clients: IClient[]) => void }> = 
                        ({ setClients }: { setClients: 
                        (clients: IClient[]) => void }) => {

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        const data = {
          login,
          password
        };

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
            {errorMessage && <div className={styles.form_error}>{errorMessage}</div>} 
            <form onSubmit={handleSubmit} className={styles.form}>
                <label className={styles.form__label}>login</label>
                <input 
                    className={styles.form__input}
                    type="text" 
                    value={login} 
                    placeholder='login' 
                    onChange={(e) => setLogin(e.target.value)}
                />
                <label className={styles.form__label}>password</label>
                <input 
                    className={styles.form__input}
                    type="password" 
                    value={password} 
                    placeholder='password' 
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type='submit' className={styles.form__btn}>Log in</button>
            </form>
        </>
    )
};

export default AuthorizationPage;