import React, { useState } from 'react';
import {
  TextField,
  MenuItem,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import { format } from 'date-fns';

const friends = ['Nolan', 'James', 'Charlie', 'David'];
const weekOptions = Array.from({ length: 8 }, (_, i) => i + 1);

export default function MoneyUpdateForm({ onTransactionAdd }) {
  const [formData, setFormData] = useState({
    friend: '',
    amount: '',
    type: 'paid',
    repayWeeks: '',
  });

  const handleChange = (e) =>
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

  const handleSubmit = () => {
    const transaction = {
      ...formData,
      amount: parseFloat(formData.amount),
      repayWeeks: parseInt(formData.repayWeeks, 10),
      date: format(new Date(), 'yyyy-MM-dd'),
    };
    const stored = JSON.parse(localStorage.getItem('transactions')) || [];
    stored.push(transaction);
    localStorage.setItem('transactions', JSON.stringify(stored));
    onTransactionAdd();
    setFormData({ friend: '', amount: '', type: 'paid', repayWeeks: '' });
  };

  return (
    <div className="space-y-4 p-4">
      <TextField
        select
        name="friend"
        label="Friend"
        value={formData.friend}
        onChange={handleChange}
        fullWidth
      >
        {friends.map((f) => (
          <MenuItem key={f} value={f}>
            {f}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        name="amount"
        label="Amount"
        type="number"
        value={formData.amount}
        onChange={handleChange}
        fullWidth
      />

      <RadioGroup
        row
        name="type"
        value={formData.type}
        onChange={handleChange}
      >
        <FormControlLabel value="paid" control={<Radio />} label="Paid" />
        <FormControlLabel
          value="received"
          control={<Radio />}
          label="Received"
        />
      </RadioGroup>

      <TextField
        select
        name="repayWeeks"
        label="Repay in (weeks)"
        value={formData.repayWeeks}
        onChange={handleChange}
        fullWidth
      >
        {weekOptions.map((w) => (
          <MenuItem key={w} value={w}>
            {w} week{w > 1 ? 's' : ''}
          </MenuItem>
        ))}
      </TextField>

      <Button
        onClick={handleSubmit}
        variant="contained"
        color="primary"
        fullWidth
        disabled={
          !formData.friend ||
          !formData.amount ||
          !formData.repayWeeks
        }
      >
        Save Transaction
      </Button>
    </div>
  );
}
