import React from 'react';
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  TablePagination,
  Grid, Typography,
} from '@mui/material';
import { ROWS_PER_PAGE_OPTIONS } from '../constants/settings';
import { IEntity } from '../interfaces/entity';

export type HeaderContext<T extends IEntity> =
  { key: keyof T, header: string, sortable: boolean };

interface ITable<T extends IEntity> {
  data: T[];
  head: HeaderContext<T>[];
  renderValue: (obj: T, key: keyof T) => React.ReactNode;
  onRowClick: (id: number) => void;
}

interface ISortingConfig<T extends IEntity> {
  key: keyof T;
  direction: 'asc' | 'desc';
}

const Table = <T extends IEntity, >({
  data,
  head,
  renderValue,
  onRowClick,
}: ITable<T>): React.ReactElement<ITable<T>> => {
  const [sortConfig, setSortConfig] = React.useState<ISortingConfig<T> | null>(null);
  const [page, setPage] = React.useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(ROWS_PER_PAGE_OPTIONS[1]);

  const sortedData = [...data].sort((a, b) => {
    if (sortConfig !== null) {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue === null || typeof aValue === 'undefined') return sortConfig.direction === 'asc' ? -1 : 1;
      if (bValue === null || typeof bValue === 'undefined') return sortConfig.direction === 'asc' ? 1 : -1;

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    }

    return 0;
  });

  const handleSort = (key: keyof T) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig !== null && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handlePageChange = (
    _: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ): void => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | null,
  ): void => {
    setRowsPerPage(parseInt(event?.target.value ?? '0', 10));
    setPage(0);
  };

  return (
    <Paper>
      <TableContainer>
        <MuiTable>
          <TableHead>
            <TableRow>
              {head.map((headContext) => (
                <TableCell>
                  {headContext.sortable ? (
                    <TableSortLabel
                      active={sortConfig?.key === headContext.key}
                      direction={sortConfig?.key === headContext.key
                        ? sortConfig?.direction
                        : undefined}
                      onClick={() => handleSort(headContext.key)}
                    >
                      <Typography>{headContext.header}</Typography>
                    </TableSortLabel>
                  ) : (
                    <TableCell>
                      {headContext.header}
                    </TableCell>
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((obj) => (
                <TableRow className="table-row" key={obj.id} onClick={() => onRowClick(obj.id)}>
                  {Object.keys(obj)
                    .filter((key) => head.some((headerContext) => headerContext.key === key))
                    .map((key) => (
                      <TableCell>{renderValue(obj, key as keyof T)}</TableCell>
                    ))}
                </TableRow>
              ))}
          </TableBody>
        </MuiTable>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
        count={sortedData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        component={Grid}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </Paper>
  );
};

export default Table;
