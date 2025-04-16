import './App.css';
import Beernes from './components/Beernes';
import Glass from './components/Glass';
import RemainingTime from './components/RemainingTime';
import Separator from './components/Separator';
import { datesHelper } from './helper/datesHelper';

function App() {
  const itsBeernes = datesHelper.isLastFridayOfTheMonth();
  const lastFridayDate = datesHelper.getLastFridayOfTheMonth();
  const dateName = datesHelper.formatDateToDayMonthName(lastFridayDate);

  return (
    <>
      <title>
        {itsBeernes ? '¡Hoy es beernes!' : 'Próximo beernes: ' + dateName}
      </title>
      <Glass>
        <Beernes />
        <Separator />
        <RemainingTime />
      </Glass>
    </>
  );
}

export default App;
