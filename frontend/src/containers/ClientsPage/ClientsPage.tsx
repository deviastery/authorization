import { IClient } from '../../types/data';

const ClientsPage: React.FC<{ clients: IClient[] }> = 
    ({ clients }: { clients: IClient[] }) => {

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
                    <td>{status}</td>
                    </tr>
                );
                })}
                
                </tbody>
            </table>
        </>
    )
}

export default ClientsPage;