import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.post('/calculate', async (req, res) => {
  const { interest, principal, start, end, frequency, final } = req.body;

  try {
    const startDate = start ? start : new Date().toISOString().slice(0, 10);
    let result = {};

    
    if (!final && principal && interest && startDate && end) {
      result.finalAmount = await calculateFinalAmount(parseFloat(principal), parseFloat(interest), startDate, end, frequency);
    }

    
    if (!principal && interest && startDate && end && final) {
      result.principal = await calculatePrincipal(parseFloat(final), parseFloat(interest), startDate, end, frequency);
    }

   
    if (!interest && principal && startDate && end && final) {
      result.interest = await calculateInterest(parseFloat(final), parseFloat(principal), startDate, end, frequency);
    }

   
    if (!end && principal && interest && startDate && final) {
      result.endDate = await calculateEndDate(parseFloat(final), parseFloat(principal), parseFloat(interest), startDate, frequency);
    }


    const htmlResponse = `
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Compound Interest Calculator Result</title>
          <link rel="stylesheet" href="/css/styles.css">
        </head>
        <body>
          <h1>COMPOUND INTEREST CALCULATOR</h1>
          <div id="Layout">
            <div id="Total">
              <h2>Calculation Result</h2>
              ${result.principal ? `<p>Principal Amount: $${result.principal}</p>` : ''}
              ${result.interest ? `<p>Interest Rate: ${result.interest}%</p>` : ''}
              ${result.endDate ? `<p>End Date: ${result.endDate}</p>` : ''}
              ${result.finalAmount ? `<p>Final Amount: $${result.finalAmount}</p>` : ''}
            </div>
          </div>
        </body>
      </html>
    `;

   
    res.send(htmlResponse);
  } catch (error) {
    res.status(400).send(`<html><body><h1>Error: ${error.message}</h1></body></html>`);
  }
});


async function calculateFinalAmount(principal, rate, start, end, frequency) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const timeDiff = (endDate - startDate) / (1000 * 3600 * 24 * 365.25); // Time difference in years

  let timesCompounded;
  switch (frequency) {
    case "Annually":
      timesCompounded = 1;
      break;
    case "Half-Yearly":
      timesCompounded = 2;
      break;
    case "Quarterly":
      timesCompounded = 4;
      break;
    case "Monthly":
      timesCompounded = 12;
      break;
    default:
      throw new Error("Invalid frequency.");
  }

  const finalAmount = principal * Math.pow((1 + (rate / 100) / timesCompounded), timesCompounded * timeDiff);
  return finalAmount.toFixed(2);
}


async function calculatePrincipal(finalAmount, rate, start, end, frequency) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const timeDiff = (endDate - startDate) / (1000 * 3600 * 24 * 365.25); 

  let timesCompounded;
  switch (frequency) {
    case "Annually":
      timesCompounded = 1;
      break;
    case "Half-Yearly":
      timesCompounded = 2;
      break;
    case "Quarterly":
      timesCompounded = 4;
      break;
    case "Monthly":
      timesCompounded = 12;
      break;
    default:
      throw new Error("Invalid frequency.");
  }

  const principal = finalAmount / Math.pow((1 + (rate / 100) / timesCompounded), timesCompounded * timeDiff);
  return principal.toFixed(2);
}


async function calculateInterest(finalAmount, principal, start, end, frequency) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const timeDiff = (endDate - startDate) / (1000 * 3600 * 24 * 365.25); // Time difference in years

  let timesCompounded;
  switch (frequency) {
    case "Annually":
      timesCompounded = 1;
      break;
    case "Half-Yearly":
      timesCompounded = 2;
      break;
    case "Quarterly":
      timesCompounded = 4;
      break;
    case "Monthly":
      timesCompounded = 12;
      break;
    default:
      throw new Error("Invalid frequency.");
  }

  const interest = (Math.pow((finalAmount / principal), 1 / (timesCompounded * timeDiff)) - 1) * timesCompounded * 100;
  return interest.toFixed(2);
}


async function calculateEndDate(finalAmount, principal, rate, start, frequency) {
  const startDate = new Date(start);
  const years = Math.log(finalAmount / principal) / (Math.log(1 + (rate / 100) / getTimesCompounded(frequency)));
  const endDate = new Date(startDate.getTime() + years * 1000 * 3600 * 24 * 365.25);
  const year = endDate.getFullYear();
  const month = String(endDate.getMonth() + 1).padStart(2, '0');
  const day = String(endDate.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}


function getTimesCompounded(frequency) {
  switch (frequency) {
    case "Annually":
      return 1;
    case "Half-Yearly":
      return 2;
    case "Quarterly":
      return 4;
    case "Monthly":
      return 12;
    default:
      throw new Error("Invalid frequency.");
  }
}


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
