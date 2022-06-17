import { useEffect } from "react";

/* A custom hook that is used to send the sessionID to the server to print the ticket. */
const useSuccessPayment = () => {
  // PATH
  const path = window.location.pathname;
  const query = window.location.search;
  const sessionID = new URLSearchParams(query).get("sessionID");

  // FETCH TO SEND
  useEffect(() => {
    if (path.startsWith("/payment/success"))
      fetch(`http://localhost:3000/v1/print/sendToPrint`, {
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
  }, [path]);
};

export default useSuccessPayment;
