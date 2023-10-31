import { useState, useEffect } from 'react';
import Paginator from '../common/Paginator/Paginator';
import style from './Employees.module.css';
import Table from './TypeOfDataOutput/Table/Table';
import SearchString from '../common/SearchString/SearchString';

const Employees = ({ totalEmployeesCount, pageSize, employees }) => {
  const [currentEmployees, setCurrentEmployees] = useState([]); // Список текущих работников
  const [currentPage, setCurrentPage] = useState(1); // Текущая страница для пагинации

  useEffect(() => {
    setCurrentEmployees(changeCurrentEmployees(currentPage, pageSize, employees));
  }, [currentPage]);

  // Пагинация:
  const changeCurrentEmployees = (currentPage, pageSize, employees) => {
    const lastEmployeeIndex = currentPage * pageSize;
    const firstEmployeeIndex = lastEmployeeIndex - pageSize;
    return employees.slice(firstEmployeeIndex, lastEmployeeIndex);
  };
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => {
    setCurrentPage((prev) =>
      prev !== Math.ceil(totalEmployeesCount / pageSize) ? prev + 1 : prev
    );
  };
  const prevPage = () => setCurrentPage((prev) => (prev !== 1 ? prev - 1 : prev));

  // Фильтрация:
  const getFiltredData = (text) => {
    // Функция фильтрации
    if (!text) {
      return changeCurrentEmployees(currentPage, pageSize, employees);
    } else {
      let array = employees;
      // Фильтрация по нахождению введенной подстроки в наших данных
      return array.filter((el) => {
        return (
          el['full_name'].toLowerCase().includes(text.toLowerCase()) || // ФИО
          el['account'].toLowerCase().includes(text.toLowerCase()) || // Учётная запись
          el['email'].toLowerCase().includes(text.toLowerCase()) || // Почта
          el['group'].toLowerCase().includes(text.toLowerCase()) || // Группа
          el['phone_number'].toLowerCase().includes(text.toLowerCase()) // Телефон
        );
      });
    }
  };

  const onSearchSend = (text) => {
    const filtredData = getFiltredData(text);
    setCurrentEmployees(filtredData);
  };

  return (
    <div>
      <div className='title is-2 has-text-centered'>Работники</div>
      <div className='columns'>
        <div className='column is-four-fifths'>
          <a className='pagination-previous' onClick={prevPage}>
            Предыдущая страница
          </a>
          <a className='pagination-next' onClick={nextPage}>
            Следующая страница
          </a>
        </div>
        <div className='column'>
          <SearchString onSearchSend={onSearchSend} />
        </div>
      </div>
      <Table employees={currentEmployees} />
      <Paginator
        pageSize={pageSize}
        totalEmployeesCount={totalEmployeesCount}
        paginate={paginate}
      />
    </div>
  );
};

export default Employees;

// // Сортировка:
// const [directionSort, setDirectionSort] = useState(true); // Направление сортировки

// const sortData = (field) => {
//   let sortedData;
//   if (directionSort) {
//     sortedData = employees.sort(
//       (a, b) => {
//         return a[field] > b[field] ? 1 : -1;
//       } // Прямая сортировка
//     );
//   } else {
//     sortedData = employees.reverse((a, b) => {
//       return a[field] > b[field] ? 1 : -1;
//     });
//   }
//   setCurrentEmployees(sortedData);
//   setDirectionSort(!directionSort);
// };
