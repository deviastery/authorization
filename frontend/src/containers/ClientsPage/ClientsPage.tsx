import { useState } from 'react';
import { IClient, Statuses } from '../../types/data';

const ClientsPage: React.FC<{ clients: IClient[] }> = 
    ({ clients }: { clients: IClient[] }) => {

        const [clientList, setClientList] = useState(clients);

        const handleSelect = async (status: String, account_number: Number) => {

            const data = {
                status
              };
                       

              fetch(`http://localhost:3001/api/clients/${account_number}/updateStatus`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
              })
              .then(response => {
                if (response.ok) {
                    return response.json();
                  } else {
                    return response.json().then(data => { 
                                throw new Error(data.error) 
                            });
                }
              })
              .then(data => {
                const updatedList = clientList.map(client => {
                    if (client.account_number === account_number) {
                        return { ...client, status };
                    }
                    return client;
                });
                setClientList(updatedList);
              })
              .catch(error => {
                console.error('Ошибка:', error.message);
              });
          };

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
                {clientList.map(({ account_number, surname, name, patronymic, date_of_birth, INN, status }) => {
                return (
                    <tr key={account_number.toString()}>
                    <td>{account_number.toString()}</td>
                    <td>{surname}</td>
                    <td>{name}</td>
                    <td>{patronymic}</td>
                    <td>{date_of_birth}</td>
                    <td>{INN}</td>
                    <td>
                        <select value={status.toString()} onChange={(e) => handleSelect(e.target.value, account_number)} >
                            {Object.keys(Statuses).map((stat) => {
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