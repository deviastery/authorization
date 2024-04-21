export interface IClient {
    account_number: Number,
    surname: String,
    name: String,
    patronymic: String,
    date_of_birth: String,
    INN: String,
    FIO_employee: String,
    status: String
};

export enum Statuses {
    "В работе" = '0',
    "Отказ" = '1',
    "Сделка закрыта" = "2",
    "Не в работе" = "3"
}