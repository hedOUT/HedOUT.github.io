const { Client, PrivateKey, AccountCreateTransaction, AccountBalanceQuery, Hbar, TransferTransaction} = require("@hashgraph/sdk");
//const { create } = require("browser-sync");
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


// players for mocking 
const player1 = {
    id: "0.0.222772",//"0.0.221531",
    privateKey: "302e020100300506032b65700422042082ba57e7e71d5a50381b0e7bb09c1fc811d65f8667ebd0cf5204ed02f23d4ba0",
    publicKey: "302a300506032b6570032100c541045da8f65de030644c60896c663df4f4fd58e3279384fa7f81b1739a8caa",
}
const player2 = {
    id: "0.0.222773",//"0.0.221532",
    privateKey: "302e020100300506032b657004220420c0f38294900113598e492172c0c214d449f34069ea69bb4a90a41221c3d061ea",
    publicKey: "302a300506032b65700321003afec291cf9c35139769b5ae43a9151a26d057b49a272ac6ba78e17ee9144991",
}

/* 
output
private key: 302e020100300506032b65700422042082ba57e7e71d5a50381b0e7bb09c1fc811d65f8667ebd0cf5204ed02f23d4ba0
public key: 302a300506032b6570032100c541045da8f65de030644c60896c663df4f4fd58e3279384fa7f81b1739a8caa
private key: 302e020100300506032b657004220420c0f38294900113598e492172c0c214d449f34069ea69bb4a90a41221c3d061ea
public key: 302a300506032b65700321003afec291cf9c35139769b5ae43a9151a26d057b49a272ac6ba78e17ee9144991
The new account ID is: 0.0.222772
The new account ID is: 0.0.222773
The new account balance is: 1000 tinybar.
The new account balance is: 1000 tinybar.
*/

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

    console.log('private key: ' + newAccountPrivateKey);
    console.log('public key: ' + newAccountPublicKey);

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

    return newAccountId;

}

async function getBalance(id) {
    const balance = await new AccountBalanceQuery()
    .setAccountId(id)
    .execute(client);
    console.log("The account balance of " + id + " is: " + balance.hbars.toTinybars() +" tinybar.");

    return balance.hbars.toTinybars();
}


async function transaction(from, to, amount) {
    // balance check
    getBalance(from.id);
    getBalance(to.id);

    //Create the transfer transaction
    const transferTransaction = await new TransferTransaction()
        .addHbarTransfer(from.id, Hbar.fromTinybars(0 - amount))
        .addHbarTransfer(to.id, Hbar.fromTinybars(amount))
        .freezeWith(client)
        .sign(PrivateKey.fromString(from.privateKey));
    
    // sign with private key of fromID user
    const signedTransaction = await transferTransaction
        .execute(client);     
    
    //Verify the transaction status
    const transactionReceipt = await signedTransaction.getReceipt(client);
    console.log("The transfer transaction from my account to the new account was: " + transactionReceipt.status.toString());

    // balance check
    getBalance(from.id);
    getBalance(to.id);
}

// try a transaction
//transaction(player2, player1, 500);


module.exports = {
    startTimer,
    createAccount,
    getBalance,
    transaction,
}