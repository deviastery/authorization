import { IClient, Statuses } from '../../types/data';

const ClientsPage: React.FC<{ clients: IClient[] }> = 
    ({ clients }: { clients: IClient[] }) => {

        // const handleSelect = (e: React.FormEvent<HTMLFormElement>) => {
        //     e.preventDefault();
        
        //     const data = {
        //       login,
        //       password
        //     };
        
        //     console.log(JSON.stringify(data));
    
        //       fetch('http://localhost:3001/api/users/login', {
        //         method: 'POST',
        //         headers: {
        //           'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify(data)
        //       })
        //       .then(response => {
        //         if (response.ok) {
        //             navigate('/clients');
        //             return response.json();
        //           } else {
        //             return response.json().then(data => { 
        //                         throw new Error(data.error) 
        //                     });
        //         }
        //       })
        //       .then(data => {
        //         setClients(data);
        //       })
        //       .catch(error => {
        //         console.error('Ошибка:', error.message);
        //         setErrorMessage(error.message);
        //       });
        //   };

    return (
        <>
            <h2>Таблица клиентов</h2>
            <table>
                <thead>
                <tr>
                    <th>Номер счета</th>
                    <th>Фамилия</th>
                    <th>Имя</th>
                    <th>Отчество</th>
                    <th>Дата рождения</th>
                    <th>ИНН</th>
                    <th>Статус</th>
                </tr>
                </thead>
                <tbody>
                {clients.map(({ account_number, surname, name, patronymic, date_of_birth, INN, status }) => {
                return (
                    <tr key={account_number.toString()}>
                    <td>{account_number.toString()}</td>
                    <td>{surname}</td>
                    <td>{name}</td>
                    <td>{patronymic}</td>
                    <td>{date_of_birth}</td>
                    <td>{INN}</td>
                    <td>
                        <select  value={status.toString()} /* onChange={(e) => setStatus(e.target.value)}*/ >
                            {Object.keys(Statuses).map((stat) =>{
                                return (
                                    <option key={stat} value={stat}>
                                        {stat}
                                    </option>
                                )
                            })}
                        </select>
                    </td>
                    </tr>
                );
                })}
                
                </tbody>
            </table>
        </>
    )
}

export default ClientsPage;