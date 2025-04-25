// 예시 데이터 타입 정의
import { DataGrid } from '@portfolio/ui';
import { createColumnHelper } from '@tanstack/react-table';

const TablePage = () => {
  const data = Array.from({ length: 1000 }).map((_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    age: 20 + (i % 40),
    column1: `User ${i + 1}`,
    column2: `User ${i + 1}`,
    column3: `User ${i + 1}`,
    column4: `User ${i + 1}`,
    column5: `User ${i + 1}`,
    column6: `User ${i + 1}`,
    column7: `User ${i + 1}`,
    column8: `User ${i + 1}`,
    column9: `User ${i + 1}`,
    column10: `User ${i + 1}`,
  }));
  type Person = {
    id: number;
    name: string;
    age: number;
    column1: string;
    column2: string;
    column3: string;
    column4: string;
    column5: string;
    column6: string;
    column7: string;
    column8: string;
    column9: string;
    column10: string;
  };

  const columnHelper = createColumnHelper<Person>();

  const columns = [
    columnHelper.accessor('id', {
      header: 'ID',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('name', {
      header: 'Name',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('age', {
      header: 'Age',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('column1', {
      header: 'column1',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('column2', {
      header: 'column2',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('column3', {
      header: 'column3',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('column4', {
      header: 'column4',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('column5', {
      header: 'column5',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('column6', {
      header: 'column6',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('column7', {
      header: 'column7',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('column8', {
      header: 'column8',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('column9', {
      header: 'column9',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('column10', {
      header: 'column10',
      cell: (info) => info.getValue(),
    }),
  ];

  return (
    <div>
      <p>DataGrid</p>
      <DataGrid data={data} columns={columns} />
    </div>
  );
};
export default TablePage;
