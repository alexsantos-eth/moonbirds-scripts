import { useEffect } from "react";

/* A custom hook that is used to send the sessionID to the server to print the ticket. */
const useSuccessPayment = () => {
  // PATH
  const path = window.location.pathname;
  const query = window.location.hash.substring(
    window.location.hash.indexOf("?sessionID") + 1
  );
  const sessionID = new URLSearchParams(query).get("sessionID");

  // FETCH TO SEND
  useEffect(() => {
    if (path.startsWith("/connect-wallet") && sessionID)
      fetch(`${import.meta.env.VITE_API_ENDPOINT}/print/sendToPrint`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionID }),
      })
        .then((data) => data.json())
        .then((json) => {
          if (json.ok) console.log(json);
        });
  }, [path, sessionID]);
};

export default useSuccessPayment;
