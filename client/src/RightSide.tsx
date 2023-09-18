import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Fetch is so fast on local network, the 'Loading...' indicator is barely seen, without
// adding a small delay
const hideFetchDelay = 500;

const RightSide = ({ apiHost, credentials, serverInterval, }:
  { apiHost: string, credentials: string, serverInterval: number }) => {
  const [fetching, setFetching] = useState<Boolean>(true);
  const [metrics, setMetrics] = useState<string>('');
  
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
        url: `${apiHost}metrics`,
      }).then((response) => {
        setMetrics(response?.data ?? '');
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

    return () => {
      if (serverIntervalObject) {
        clearInterval(serverIntervalObject);
      }
    }
  }, [apiHost, credentials, serverInterval]);

  return (
    <div className={`right`}>
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
      <div className="metrics">
        <pre>
          {metrics}
        </pre>
      </div>
    </div>
  );
}

export default RightSide;
