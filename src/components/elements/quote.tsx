import React, { useState, useEffect } from "react";
import quotes from "./quotes.json";

interface Props {}

interface Quote {
  text: string;
  author: string;
}

export default function Quote(props: Props) {
  const [quote, setQuote] = useState<Quote | undefined>(undefined);

  useEffect(() => {
    setQuote({ text: quotes.texts[0], author: quotes.authors[0] });

    const intervalId = setInterval(() => {
      const quoteIndex = Math.floor(Math.random() * quotes.texts.length);
      setQuote({ text: quotes.texts[quoteIndex], author: quotes.authors[quoteIndex] });
    }, 12000);


    return () => clearInterval(intervalId);
  }, [quotes]);

  return (
    <div id="quote-box" className="pt-4 pb-4">
      {quote ? (
        <>
          <p id="quote">{quote.text}</p>
          <p id="author">{quote.author}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

