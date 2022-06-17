import React, { useEffect } from "react";
const SuccessPage = () => {
  const sessionID = "";

  useEffect(() => {
    fetch(`http://localhost:4000/v1/print/sendToPrint`, {
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
  }, []);

  return <div>Thank you for purchasing</div>;
};

export default SuccessPage;
