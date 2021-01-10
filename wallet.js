const { Client, PrivateKey, AccountCreateTransaction, AccountBalanceQuery, Hbar, TransferTransaction} = require("@hashgraph/sdk");
require("dotenv").config();

/////////////////////
// CONNECT TO HEDERA
/////////////////////

// get ID and private key from .env file
const myAccountId = process.env.MY_ACCOUNT_ID;
const myPrivateKey = process.env.MY_PRIVATE_KEY;

if (myAccountId == null ||
    myPrivateKey == null ) {
    throw new Error("Environment variables myAccountId and myPrivateKey must be present");
}    

console.log("accountid: " + myAccountId);
console.log("privacykey: " + myPrivateKey);

// Create connection to the Hedera network with my credentials
let client = Client.forTestnet();
client.setOperator(myAccountId, myPrivateKey);

///////////////////////////
// CONNECT TO HEDERA DONE
///////////////////////////

// players
const player1 = {
    id: "0.0.221531",
}
const player2 = {
    id: "0.0.221532",
}

// set timer
function startTimer() {
    console.log('timer started');
}


// create an account and return the account id
// we dont need this because every time we run the code a new account is created and saved forever in the hedera (test) database
// so just use player 1 and player 2 as generated already
async function createAccount() {
    //Create new keys
    const newAccountPrivateKey = await PrivateKey.generate(); 
    const newAccountPublicKey = newAccountPrivateKey.publicKey;

    //Create a new account with 1,000 tinybar starting balance
    const newAccountTransactionResponse = await new AccountCreateTransaction()
        .setKey(newAccountPublicKey)
        .setInitialBalance(Hbar.fromTinybars(1000))
        .execute(client);

    // Get the new account ID
    const getReceipt = await newAccountTransactionResponse.getReceipt(client);
    const newAccountId = getReceipt.accountId;

    console.log("The new account ID is: " +newAccountId);
    
    //Verify the account balance
    const accountBalance = await new AccountBalanceQuery()
        .setAccountId(newAccountId)
        .execute(client);

    console.log("The new account balance is: " +accountBalance.hbars.toTinybars() +" tinybar.");

    return newAccountIdl;

}

async function getBalance(id) {
    const balance = await new AccountBalanceQuery()
    .setAccountId(id)
    .execute(client);
    console.log("The account balance of " + id + " is: " + balance.hbars.toTinybars() +" tinybar.");

    return balance.hbars.toTinybars();
}


async function transaction(fromID, toID, amount) {
    // balance check
    getBalance(fromID);
    getBalance(toID);

    //Create the transfer transaction
    const transferTransactionResponse = await new TransferTransaction()
    .addHbarTransfer(fromID, Hbar.fromTinybars(0 - amount))
    .addHbarTransfer(toID, Hbar.fromTinybars(amount))
    .execute(client);

    //Verify the transaction status
    const transactionReceipt = await transferTransactionResponse.getReceipt(client);
    console.log("The transfer transaction from my account to the new account was: " + transactionReceipt.status.toString());

    // balance check
    getBalance(fromID);
    getBalance(toID);
}


// try a transaction
transaction(myAccountId, player1.id, 500);
