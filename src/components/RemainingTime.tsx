import { useEffect, useState } from 'react';
import { datesHelper } from '../helper/datesHelper';

const RemainingTime = () => {
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [viewMode, setViewMode] = useState<
    'default' | 'days' | 'hours' | 'minutes' | 'seconds'
  >('default');

  const lastFridayDate = datesHelper.getLastFridayOfTheMonth();
  const { totalDays, totalHours, totalMinutes, totalSeconds } =
    datesHelper.getTotalUnitsUntil(lastFridayDate);

  useEffect(() => {
    updateTimeRemaining();
    const intervalId = setInterval(updateTimeRemaining, 1000);
    return () => clearInterval(intervalId);
  }, [lastFridayDate]);

  const updateTimeRemaining = () => {
    const remaining = datesHelper.getTimeUntil(lastFridayDate);
    setTimeRemaining(remaining);
  };

  const getRemainingTime = () => {
    let displayText = '';

    switch (viewMode) {
      case 'days':
        displayText = `Qued${totalDays === 1 ? 'a' : 'an'} ${totalDays} ${
          totalDays === 1 ? 'día' : 'días'
        }`;
        break;
      case 'hours':
        displayText = `Qued${totalHours === 1 ? 'a' : 'an'} ${totalHours} ${
          totalHours === 1 ? 'hora' : 'horas'
        }`;
        break;
      case 'minutes':
        displayText = `Qued${totalMinutes === 1 ? 'a' : 'an'} ${totalMinutes} ${
          totalMinutes === 1 ? 'minuto' : 'minutos'
        }`;
        break;
      case 'seconds':
        displayText = `Qued${totalSeconds === 1 ? 'a' : 'an'} ${totalSeconds} ${
          totalSeconds === 1 ? 'segundo' : 'segundos'
        }`;
        break;
      default:
        const parts = [];

        if (timeRemaining.days > 0) {
          parts.push(
            `${timeRemaining.days} ${timeRemaining.days === 1 ? 'día' : 'días'}`
          );
        }
        if (timeRemaining.hours > 0) {
          parts.push(
            `${timeRemaining.hours} ${
              timeRemaining.hours === 1 ? 'hora' : 'horas'
            }`
          );
        }
        if (timeRemaining.minutes > 0) {
          parts.push(
            `${timeRemaining.minutes} ${
              timeRemaining.minutes === 1 ? 'minuto' : 'minutos'
            }`
          );
        }
        if (timeRemaining.seconds > 0) {
          parts.push(
            `${timeRemaining.seconds} ${
              timeRemaining.seconds === 1 ? 'segundo' : 'segundos'
            }`
          );
        }

        displayText = `Quedan ${parts
          .join(', ')
          .replace(/, ([^,]*)$/, ' y $1')}`;
    }

    return displayText;
  };

  const handleDate = () => {
    setViewMode((prev) => {
      switch (prev) {
        case 'default':
          return 'days';
        case 'days':
          return 'hours';
        case 'hours':
          return 'minutes';
        case 'minutes':
          return 'seconds';
        case 'seconds':
        default:
          return 'default';
      }
    });
  };

  return (
    <>
      {(timeRemaining.days > 0 ||
        timeRemaining.hours > 0 ||
        timeRemaining.minutes > 0 ||
        timeRemaining.seconds > 0) && (
        <p
          onClick={handleDate}
          className='font-size-20 cursor-pointer remaining-time'
        >
          {getRemainingTime()}
        </p>
      )}
    </>
  );
};

export default RemainingTime;
