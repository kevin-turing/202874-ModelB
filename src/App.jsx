import React, { useMemo } from 'react';
import { useTable, useFilters } from '@tanstack/react-table';

function App() {
  const data = useMemo(
    () => [
      {
        col1: 'Hello',
        col2: 'World',
      },
      {
        col1: 'react-table',
        col2: 'is awesome',
      },
    ],
    []
  );

  const columns = useMemo(
    () => [
      {
        Header: 'Column 1',
        accessor: 'col1',
        Filter: ({ column }) => (
          <select
            value={column.getFilterValue()}
            onChange={(e) => column.setFilterValue(e.target.value)}
          >
            <option value="">All</option>
            <option value="Hello">Hello</option>
            <option value="react-table">react-table</option>
          </select>
        ),
      },
      // ... other columns
    ],
    []
  );

  const tableInstance = useTable({ columns, data }, useFilters);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>
                {column.render('Header')}
                {/* Render the column filter */}
                <div>{column.canFilter ? column.render('Filter') : null}</div>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default App;
