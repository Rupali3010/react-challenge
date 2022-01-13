import axios from "axios";
import React, { useEffect, useState } from "react";
import _, { take } from "lodash";
import "../index.css";

const pageSize = 10;

const Todos = () => {
  let [todo, setTodo] = useState([]);
  let [pagination, setPagination] = useState();
  let [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/todos").then(response => {
      console.log(response.data);
      setTodo(response.data);
      setPagination(_(response.data).slice(0).take(pageSize).value());
    });
  }, []);

  const pageCounts = todo ? Math.ceil(todo.length / pageSize) : 0;
  if (pageCounts === 1) {
    return null;
  }

  const pages = _.range(1, pageCounts + 1);

  const paginate = pageNum => {
    setCurrentPage(pageNum);
    const startIndex = (pageNum - 1) * pageSize;
    const pagination = _(todo).slice(startIndex).take(pageSize).value();
    setPagination(pagination);
  };

  return (
    <div>
      {!pagination ? (
        "No page found"
      ) : (
        <table className="table table-dark table-bordered mr-2">
          <thead>
            <tr>
              <th>ID</th>
              <th>User ID</th>
              <th>Title</th>
              <th>Completed</th>
            </tr>
          </thead>
          <tbody>
            {pagination.map((todo, id) => (
              <tr key={id}>
                <td>{todo.id}</td>
                <td>{todo.userId}</td>
                <td>{todo.title}</td>
                <td>
                  <button
                    className={
                      todo.completed ? "btn btn-success" : "btn btn-danger"
                    }
                  >
                    {todo.completed ? "True" : "False"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <nav className="d-flex justify-content-center">
        <ul className="pagination">
          {pages.map(page => (
            <li className='page === currentPage ? "page-item active" : "page-item" list-none'>
              <button className="" onClick={() => paginate(page)}>
                {page}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Todos;
