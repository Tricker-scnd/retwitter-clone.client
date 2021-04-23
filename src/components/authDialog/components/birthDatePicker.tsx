import React, { useEffect, useState } from 'react';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { getDaysInMonth } from 'date-fns';
import { formatDateToString } from '../../../utils/formatDate';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    birthDayBlock: {
      marginTop: theme.spacing(4),
      display: 'flex',
      justifyContent: 'space-between',
    },
    formControlBirthDay: {
      flex: '0 0 33%',
    },
  }),
);

export const BirthDatePicker = ({ setbirthDate, selectedDate }: any) => {
  const classes = useStyles();
  const currentYear = new Date().getFullYear();

  const [daysInSelectedMonth, setDaysInSelectedMonth] = useState(31);
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [selectedMonth, setSelectedMonth] = useState<number>(0);
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);

  useEffect(() => {
    if (selectedDate) {
      const explodedYear = Number(selectedDate.split('-')[0]);
      const explodedMonth = Number(selectedDate.split('-')[1]) - 1;
      const explodedDay = Number(selectedDate.split('-')[2]);
      setSelectedYear(explodedYear);
      setSelectedMonth(explodedMonth);
      setSelectedDay(explodedDay);
    }
  }, [selectedDate]);

  const years = [];
  for (let i = 1920; i <= currentYear; i++) {
    years.push(i);
  }
  const month = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ];
  const handleChangeDateSelect = (e: any) => {
    switch (e.target.name) {
      case 'day':
        setSelectedDay(e.target.value);
        break;
      case 'month':
        setSelectedMonth(e.target.value);
        break;
      case 'year':
        setSelectedYear(e.target.value);
        break;
    }
  };

  useEffect(() => {
    setDaysInSelectedMonth(getDaysInMonth(new Date(selectedYear, selectedMonth)));
    setbirthDate(formatDateToString(selectedYear, Number(selectedMonth) + 1, selectedDay));
  }, [selectedDay, selectedMonth, selectedYear, setbirthDate]);

  return (
    <div className={classes.birthDayBlock}>
      <FormControl variant="outlined" className={classes.formControlBirthDay}>
        <InputLabel htmlFor="outlined-age-native-simple">Месяц</InputLabel>
        <Select
          native
          value={selectedMonth}
          onChange={handleChangeDateSelect}
          label="Месяц"
          inputProps={{
            name: 'month',
            id: 'outlined-month-native-simple',
          }}>
          {month.map((month, i) => (
            <option value={i} key={month}>
              {month}
            </option>
          ))}
        </Select>
      </FormControl>

      <FormControl variant="outlined" className={classes.formControlBirthDay}>
        <InputLabel htmlFor="outlined-age-native-simple">День</InputLabel>
        <Select
          native
          value={selectedDay}
          onChange={handleChangeDateSelect}
          label="День"
          inputProps={{
            name: 'day',
            id: 'outlined-day-native-simple',
          }}>
          {Array(daysInSelectedMonth)
            .fill('')
            .map((day, i) => (
              <option value={i + 1} key={'d' + i}>
                {i + 1}
              </option>
            ))}
        </Select>
      </FormControl>
      <FormControl variant="outlined" className={classes.formControlBirthDay}>
        <InputLabel htmlFor="outlined-age-native-simple">Год</InputLabel>
        <Select
          native
          value={selectedYear}
          onChange={handleChangeDateSelect}
          label="Год"
          inputProps={{
            name: 'year',
            id: 'outlined-year-native-simple',
          }}>
          {years.map((i) => (
            <option value={i} key={'y' + i}>
              {i}
            </option>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
