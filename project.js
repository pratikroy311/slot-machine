const promt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    "A":2,
    "B":4,
    "C":6,
    "D":8
}

const SYMBOL_VALUES = {
    "A":5,
    "B":4,
    "C":3,
    "D":2
}



const Deposit =() => {
    while(true){
        const depositAmount = promt("Enter a deposit amount: ");
        const numberDepositAmount = parseFloat(depositAmount);

        if(isNaN(numberDepositAmount) || numberDepositAmount<=0){
            console.log("Invalid deposit amount, try again!");
        }
        else{
            return numberDepositAmount;
        }
    };
};

const getNumberofLines = () => {
    while(true){
        const NumberofLines = promt("Enter the number of lines to bet on(1-3): ");
        const numberLines = parseFloat(NumberofLines);
        if(isNaN(numberLines) || numberLines<=0 || numberLines>3){
            console.log("Invalid number of lines, try again between 1 and 3!");
        }
        else{
            return numberLines;
        }
    };
}

const getBet = (Balance,lines) =>{
    while(true){
        const betAmount = promt("Enter the bet per line: ");
        const numberbetAmount = parseFloat(betAmount);
        if(isNaN(numberbetAmount) || numberbetAmount<=0 || numberbetAmount>Balance/lines){
            console.log("Invalid bet Amount, please try again!");
        }
        else{
            return numberbetAmount;
        }
    }
}
 
const spin= ()=>{
    const symbols = [];
    for (const [symbol,count] of Object.entries(SYMBOLS_COUNT)){
        for (let i=0;i<count;i++){
            symbols.push(symbol);
        }
    }
    const reels = [];
    for (let i=0;i<COLS;i++){
        reels.push([]);
        const reelSymbols = [...symbols];
        for (let j=0;j<ROWS;j++){
            const randomIndex = Math.floor(Math.random()* reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex,1);
        }
    }
    return reels;
};

const transpose=(reels)=>{
    const rows = [];
    
    for(let i=0;i<ROWS;i++){
        rows.push([]);
        for (let j=0;j<COLS;j++){
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
};

const printRows=(reels)=>{
    for (const row of reels){
        let rowString = "";
        for( const [i,symbol] of row.entries()){
            rowString+= symbol;
            if(i != row.length-1){
                rowString += " | ";
            }
        }
        console.log(rowString);
    }
}
const getWinnings = (rows,bet,lines)=>{
    let winnings= 0;
    for(let row=0;row<lines;row++){
        const symbols = rows[row];
        let allSame = true;

        for (const symbol of symbols){
            if (symbol != symbols[0]){
                allSame= false;
                break;
            }
        }
        if (allSame){
            winnings += bet* SYMBOL_VALUES[symbols[0]];
        };
    }
    return winnings;
};
const Game=()=>{
    let Balance =  Deposit();
    while(true){
        console.log("Your current balance is, $"+ Balance.toString());
        const numberLines =  getNumberofLines();
        const bet = getBet(Balance,numberLines);
        Balance -= bet*numberLines;
        const reels=spin();
        const reelsT = transpose(reels);
        printRows(reelsT)
        const winnings = getWinnings(reelsT,bet,numberLines);
        Balance += winnings;
        console.log("you won, $"+winnings.toString());

        if(Balance <=0){
            console.log("You ran out of money");
            break;
        }
        const playAgain = promt("Do you want to play again(y/n ?: ");
        if (playAgain!='y') break;
    }
};

Game();
