import React, { useEffect, useState } from "react"

export const SecondsCounter = ({seconds, isPaused, alertLimit, alertHitted, restart}) => {
    const[elapsed, setElapsed] = useState(seconds)

    useEffect(() => {
        if(isPaused) return () => clearInterval(interval);
        (alertLimit >= elapsed && typeof alertHitted === "function") ? alertHitted(true) : alertHitted(false) //Creating alert for specific value
        const interval = setInterval(() => {
            setElapsed((prevState) => elapsed-1);
          }, 1000);
      
          return () => clearInterval(interval);
    }, [elapsed, isPaused, seconds, alertLimit])

    useEffect(() => {
        if(restart) setElapsed(seconds)
    }, [restart])

    return <div>
        <h1>{elapsed}</h1>
        {(alertLimit >= elapsed) && <span className="bg-warning p-2 rounded-2">You have reached the {alertLimit} limit set.</span>}
    </div>
}