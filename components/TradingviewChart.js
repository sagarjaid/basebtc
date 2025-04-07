/** @format */

'use client';
import { useEffect, useRef, useState } from 'react';
import { createChart } from 'lightweight-charts';
import moment from 'moment';

const ChartComponent = ({
  chartData,
  selectedTimespan,
  page = 'stock',
  title = 'Value',
  TopTitle = '',
  stocksList = [],
  seletedStockTicker = '',
  setSeletedStockTicker,
  setStartDate,
}) => {
  const chartContainerRef = useRef();
  const [isLogScale, setIsLogScale] = useState(false);
  const [downloadChartData, setDownloadChartData] = useState([]);
  const [retitle, setReTitle] = useState(title);
  const chartRef = useRef(null);
  const seriesRef = useRef(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Clean up previous chart instance if it exists
    if (chartRef.current) {
      chartRef.current.remove();
    }

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 400,
      layout: {
        background: { type: 'solid', color: 'transparent' },
        textColor: '#f0f0f0',
      },
      grid: {
        vertLines: {
          color: '#334158',
        },
        horzLines: {
          color: '#334158',
        },
      },
      rightPriceScale: {
        borderColor: '#485c7b',
      },
      timeScale: {
        borderColor: '#485158',
        timeVisible: true,
        secondsVisible: false,
        tickMarkFormatter: (time) => {
          return selectedTimespan == 'day'
            ? moment.utc(time).format('YYYY-MM-DD')
            : moment.utc(time).format('YYYY-MM-DD hh:mm');
        },
      },
    });

    // Store the chart instance in the ref
    chartRef.current = chart;

    // Create the area series
    const areaSeries = chart.addAreaSeries({
      topColor: 'rgba(38, 198, 218, 0.56)',
      bottomColor: 'rgba(38, 198, 218, 0.04)',
      lineColor: 'rgba(38, 198, 218, 1)',
      lineWidth: 2,
      priceFormat: {
        type: 'custom',
        precision: 2,
        minMove: page == 'stock' ? 0.00001 : 0.00001,
        formatter: (price) => price.toFixed(5),
      },
    });

    // Store the series in the ref
    seriesRef.current = areaSeries;

    // Convert and set the data
    let convertedChartData = [];
    if (page == 'stock') {
      convertedChartData = chartData.map((item) => ({
        time:
          selectedTimespan == 'day'
            ? moment(item?.stock?.t).format('YYYY-MM-DD')
            : Math.floor(item?.stock?.t / 1000),
        value: item?.stock?.o / item?.currency?.o,
      }));
    } else if (page == 'currency') {
      convertedChartData = chartData.map((item) => ({
        time:
          selectedTimespan == 'day'
            ? moment(item?.t).format('YYYY-MM-DD')
            : Math.floor(item?.t / 1000),
        value: item?.o > 1 ? 1 / item?.o : item?.o,
      }));
    } else if (page == 'commodity') {
      convertedChartData = chartData.map((item) => ({
        time:
          selectedTimespan == 'day'
            ? moment(item?.stock?.t).format('YYYY-MM-DD')
            : Math.floor(item?.stock?.t / 1000),
        value: item?.stock?.o / item?.currency?.o,
      }));
    }

    // Set the data
    areaSeries.setData(convertedChartData);
    setDownloadChartData(convertedChartData);

    // Fit the content
    chart.timeScale().fitContent();

    // Handle log scale
    if (isLogScale) {
      chart.priceScale('right').applyOptions({
        mode: 1, // Logarithmic mode
      });
    } else {
      chart.priceScale('right').applyOptions({
        mode: 0, // Linear mode
      });
    }

    // Cleanup function
    return () => {
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
      }
      seriesRef.current = null;
    };
  }, [chartData, selectedTimespan, page, isLogScale]);

  const downloadData = () => {
    // Column headers based on the object keys
    const headersTitle = ['Date'];
    headersTitle.push(retitle);
    const csvRows = [headersTitle.join(',')]; // Add the headers as the first row

    downloadChartData.forEach((item) => {
      let row = [];
      row.push(item.time);
      row.push(item.value);
      csvRows.push(row.join(','));
    });

    const csvString = csvRows.join('\n');

    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = retitle + '_chartData.csv';

    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className='flex gap-4 mb-5 justify-between lg:flex-row flex-col items-center'>
        <div className=' font-bold text-lg sm:text-xl'>
          {TopTitle + retitle}
        </div>
        <div className='flex gap-4 items-start sm:items-center sm:flex-row flex-col flex-1 justify-end'>
          Select Instrument:
          <select
            defaultValue={seletedStockTicker}
            onChange={(e) => {
              setSeletedStockTicker(e.target.value);
              setReTitle(
                e.target.options[e.target.selectedIndex].text + ' / BTC'
              );
              setStartDate();
            }}
            className='bg-gray-50 border max-w-52 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
            {stocksList.map((item, idx) => (
              <option
                key={idx}
                value={item.symbol}>
                {item.name}
              </option>
            ))}
          </select>
          <div className='flex gap-4 items-center'>
            <label className='flex items-center gap-2'>
              <input
                type='checkbox'
                checked={isLogScale}
                onChange={(e) => setIsLogScale(e.target.checked)}
              />
              Logarithmic
            </label>
            <button
              className=' bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded inline-flex items-center h-10'
              onClick={downloadData}>
              <svg
                className='fill-current w-4 h-4 mr-2'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'>
                <path d='M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z' />
              </svg>
              <span>Download</span>
            </button>
          </div>
        </div>
      </div>
      <div
        ref={chartContainerRef}
        style={{ width: '100%', height: '400px' }}
      />
    </>
  );
};

export default ChartComponent;
