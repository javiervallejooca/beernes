import { datesHelper } from '../helper/datesHelper';
import beer from '/beer.png';

const Beernes = () => {
  const itsBeernes = datesHelper.isLastFridayOfTheMonth();
  const lastFridayDate = datesHelper.getLastFridayOfTheMonth();
  const dateName = datesHelper.formatDateToDayMonthName(lastFridayDate);

  return (
    <>
      <img src={beer} className='beer-img bouncy-img' alt='Jarra de cerveza' />
      <h1 className='mt-0 mb-0 title'>
        {itsBeernes ? 'Hoy es beernes' : 'Próximo beernes'}
      </h1>
      <p className='mt-0 p-as-h2 font-bold bordered-letters'>
        {dateName}, 13:30
      </p>
    </>
  );
};

export default Beernes;
