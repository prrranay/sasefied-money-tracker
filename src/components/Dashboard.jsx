import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableFooter,
  Typography,
} from '@mui/material';


const friends = ['Nolan', 'James', 'Charlie', 'David'];

function generateDashboardData(transactions) {
  const result = Array.from({ length: 8 }, () => ({}));

  transactions.forEach((tx) => {
    const weekIndex = tx.repayWeeks - 1; // 1→0, 2→1, …

    if (weekIndex >= 0 && weekIndex < 8) {
      const netAmount = tx.type === 'paid' ? tx.amount : -tx.amount;
      result[weekIndex][tx.friend] =
        (result[weekIndex][tx.friend] || 0) + netAmount;
    }
  });

  return result;
}

export default function Dashboard({ refresh }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const tx = JSON.parse(localStorage.getItem('transactions')) || [];
    setData(generateDashboardData(tx));
  }, [refresh]);

  const columnTotals = friends.reduce((acc, f) => {
    acc[f] = data.reduce((sum, week) => sum + (week[f] || 0), 0);
    return acc;
  }, {});
  const grandTotal = friends.reduce(
    (sum, f) => sum + columnTotals[f],
    0
  );

  return (
    <div className="p-4">
      <Typography variant="h5" gutterBottom>
        8-Week Pay/Receive Dashboard
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Week</TableCell>
            {friends.map((f) => (
              <TableCell key={f}>{f}</TableCell>
            ))}
            <TableCell>
              <b>Total</b>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((week, i) => {
            const weekTotal = Object.values(week).reduce(
              (sum, val) => sum + val,
              0
            );
            return (
              <TableRow key={i}>
                <TableCell>{`Week ${i + 1}`}</TableCell>
                {friends.map((f) => (
                  <TableCell key={f}>
                    {week[f] !== undefined ? week[f].toFixed(2) : '-'}
                  </TableCell>
                ))}
                <TableCell>
                  <b>{weekTotal.toFixed(2)}</b>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell>
              <b>Totals</b>
            </TableCell>
            {friends.map((f) => (
              <TableCell key={f}>
                <b>{columnTotals[f].toFixed(2)}</b>
              </TableCell>
            ))}
            <TableCell>
              <b>{grandTotal.toFixed(2)}</b>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
