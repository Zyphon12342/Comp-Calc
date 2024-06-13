document.addEventListener('DOMContentLoaded', (event) => {
    const Interest = document.getElementById("InterestI"); 
    const Principal = document.getElementById("PrincipleI"); 
    const start = document.getElementById("start"); 
    const end = document.getElementById("end"); 
    const freq = document.getElementById("freqI"); 
    const Output = document.getElementById("FinalI"); 

    document.getElementById('calculate').addEventListener('click', () => {
        const rate = parseFloat(Interest.value);
        const principal = parseFloat(Principal.value);
        const starter = start.value;
        const ender = end.value;
        const frequency = freq.value;
        const finalAmount = parseFloat(Output.value); 
        if (start.value === "") {
            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const day = String(today.getDate()).padStart(2, '0');
            start.value = `${year}-${month}-${day}`;
        }
        if(freq){
            let count_Empty = 0; 
            if(Interest.value === "") count_Empty++; 
            if(Principal.value === "") count_Empty++;
            if(end.value === "") count_Empty++;
            if(Output.value === "") count_Empty++; 
            if(count_Empty>1){
                alert("At most only one field can be Empty!!"); 
            }
            else{
                if (Principal.value === "") {
                    Principal.value = calculatePrincipal(finalAmount, rate, starter, ender, frequency).toFixed(2);
                } 
                else if (Interest.value === "") {
                    Interest.value = calculateInterest(finalAmount, principal, starter, ender, frequency).toFixed(2);
                } 
                else if (end.value === "") {
                    end.value = calculateEndDate(finalAmount, principal, rate, starter, frequency);
                } 
                else if (Output.value === "") {
                    Output.value = calculateFinalAmount(principal, rate, starter, ender, frequency).toFixed(2);
                }
            }
        }
        else{
            alert("Frequency of Interest needs to be specified as it could lead to unexpected results"); 
        }

    });
});

function calculateCompoundInterest(principal, rate, start, end, frequency) {
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
    return finalAmount;
}

function calculatePrincipal(finalAmount, rate, start, end, frequency) {
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

    const principal = finalAmount / Math.pow((1 + (rate / 100) / timesCompounded), timesCompounded * timeDiff);
    return principal;
}

function calculateInterest(finalAmount, principal, start, end, frequency) {
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
    return interest;
}

function calculateEndDate(finalAmount, principal, rate, start, frequency) {
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

    const startDate = new Date(start);
    const years = Math.log(finalAmount / principal) / (Math.log(1 + (rate / 100) / timesCompounded));
    const endDate = new Date(startDate.getTime() + years * 1000 * 3600 * 24 * 365.25);
    const year = endDate.getFullYear();
    const month = String(endDate.getMonth() + 1).padStart(2, '0');
    const day = String(endDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
}

function calculateFinalAmount(principal, rate, start, end, frequency) {
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
    return finalAmount;
}