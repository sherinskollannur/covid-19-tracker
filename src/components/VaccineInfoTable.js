import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';
import { useHistory } from 'react-router-dom';

const columns = [
  { id: 'Country', label: 'Country', minWidth: 170 },
  { id: 'Vaccine', label: 'Vaccine', minWidth: 100 },
  {
    id: 'Count',
    label: 'Count',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  //   {
  //     id: 'Action',
  //     label: 'Action',
  //     minWidth: 170,
  //     align: 'right',
  //     format: (value) => value.toLocaleString('en-US'),
  //   },
];

const rows = [
  {
    Country: 'India',
    Vaccine: 'Co-Vaccine',
    Count: 2000,
  },
  {
    Country: 'US',
    Vaccine: 'CoviShield',
    Count: 5000,
  },
];

function VaccineInfoTable() {
  const history = useHistory();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                      fontWeight: 900,
                      fontSize: 18,
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
                <TableCell
                  style={{ minWidth: 170, fontWeight: 900, fontSize: 18 }}
                  align="right"
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}

                      <TableCell align="right">
                        <Button
                          variant="contained"
                          color="success"
                          width="10px"
                          onClick={() => {
                            // alert(row.Country);
                            history.push({
                              pathname: '/user_dashboard/donate_info',
                              state: {
                                country: row.Country,
                                vaccine: row.Vaccine,
                                price: 300,
                              },
                            });
                          }}
                        >
                          Donate
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

export default VaccineInfoTable;
