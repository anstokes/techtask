import React, { useEffect, useState } from 'react';
import axios from 'axios';

function padNumber(number: number) {
  return number.toString().padStart(2, '0');
}

function secondsToHoursMinutesSeconds(totalSeconds: number): string {
  const positiveSeconds = Math.abs(totalSeconds);
  const hours = Math.floor(positiveSeconds / 3600);
  const minutes = Math.floor((positiveSeconds % 3600) / 60);
  const seconds = positiveSeconds % 60;

  // Check if negative
  let negative = '';
  if (totalSeconds < 0) {
    negative = '-';
  }

  return `${negative}${padNumber(hours)}:${padNumber(minutes)}:${padNumber(seconds)}`;
};

// Fetch is so fast on local network, the 'Loading...' indicator is barely seen, without
// adding a small delay
const hideFetchDelay = 500;

const LeftSide = ({ apiHost, credentials, localInterval, serverInterval, }:
  { apiHost: string, credentials: string, localInterval: number, serverInterval: number }) => {
  const [fetching, setFetching] = useState<Boolean>(true);
  const [epochDate, setEpochDate] = useState<Date>();
  const [localDate, setLocalDate] = useState<Date>(new Date());
  const [difference, setDifference] = useState<string>(secondsToHoursMinutesSeconds(0));
  
  useEffect(() => {
    const getServerDate = () => {
      // Set fetching
      setFetching(true);

      // Make API request
      axios({
        headers: {
          authorization: credentials,
        },
        method: 'get',
        url: `${apiHost}time`,
      }).then((response) => {
        const { data } = response;
        if (data?.epoch) {
          // Multiple by 1000 to convert seconds to milliseconds
          setEpochDate(new Date(data.epoch * 1000));
        }
      }).finally(() => {
        // Clear fetching
        setTimeout(() => {
          setFetching(false);
        }, hideFetchDelay);
      });
    }

    // Make initial call to API endpoint
    getServerDate();

    // Make subsequent requests to update data at given interval
    const serverIntervalObject = setInterval(() => getServerDate(), serverInterval);

    // Update local date at given interval
    const localIntervalObject = setInterval(() => setLocalDate(new Date()), localInterval);

    return () => {
      if (serverIntervalObject) {
        clearInterval(serverIntervalObject);
      }
      if (localInterval) {
        clearInterval(localIntervalObject);
      }
    }
  }, [apiHost, credentials, localInterval, serverInterval]);

  useEffect(() => {
    if (epochDate && localDate) {
      const seconds = Math.floor((localDate.getTime() - epochDate.getTime()) / 1000);
      setDifference(secondsToHoursMinutesSeconds(seconds));
    }
  }, [epochDate, localDate])

  return (
    <div className={`left`}>
      {
        // Check if fetching, and display overlay where relevant
        fetching
          ? (
            <div className="overlay">
              <div className="pleaseWait">
                Loading...
              </div>
            </div>    
          )
          : null
      }
      <div className="time">
        {difference}
      </div>
    </div>
  );
}

export default LeftSide;
