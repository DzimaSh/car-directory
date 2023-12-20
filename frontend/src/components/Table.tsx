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
  Grid, Typography, Button,
} from '@mui/material';
import { ROWS_PER_PAGE_OPTIONS } from '../constants/settings';
import { IEntity } from '../interfaces/entity';
import { ISortingConfig, ITable } from '../interfaces/components';

const Table = <T extends IEntity, >({
  data,
  head,
  renderValue,
  onRowClick,
  onCreateNewItem,
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

  const handleSort = (key: keyof T): void => {
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
    <Grid container direction="column" flexWrap="nowrap" spacing={2}>
      <Grid item>
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
                        headContext.header
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
                      {head.map((header) => (
                        <TableCell>{renderValue(obj, header.key as keyof T)}</TableCell>
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
      </Grid>
      <Grid item>
        <Button variant="contained" color="primary" onClick={onCreateNewItem}>
          Create New Item
        </Button>
      </Grid>
    </Grid>
  );
};

export default Table;
