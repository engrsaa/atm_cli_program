#! /usr/bin/env node
import inquirer from "inquirer";
let myBalance = 25000;
let myPin = 9221;
function checkBalance(usrAmount:number):boolean{
    let checkBalanceResult= true;
    if(myBalance<usrAmount){checkBalanceResult=false;console.log(`Insufficient Balace.`);}
    else{myBalance-=usrAmount;console.log(`Your remaining balance is $${myBalance}.`)}
    return checkBalanceResult
}
let userPin = await inquirer.prompt(
    {
        name:"pin",
        type:"number",
        message:"Please provide your PIN code : "
    }
);
if(userPin.pin===myPin){
    console.log('Welcome userName!');
    let userAction = await inquirer.prompt(
        {
            name:"action",
            type:"list",
            message:"Please select one of the following Operations.",
            choices:['Balance Inquiry','Fast Cash','Cash Withdrawal','Fund Transfer']
        }
    );
    if(userAction.action==='Balance Inquiry'){
        console.log(`Your Balance is $${myBalance}.`);
    }else if(userAction.action==='Fast Cash'){
        let userAmount = await inquirer.prompt(
        {    
            name:"requestedAmount",
            type:"list",
            message:"Select Amount",
            choices:['1000','2000','5000','10000']
            }
        );
        checkBalance(userAmount.requestedAmount);
    }else if(userAction.action==='Cash Withdrawal'){
        let userAmount = await inquirer.prompt(
            {
                name:"withdrawalAmount",
                type:"number",
                message:"Please provide the amount you want to withdraw : "
            }
        );
        checkBalance(userAmount.withdrawalAmount);
    }else if(userAction.action==='Fund Transfer'){
        const beneficary = await inquirer.prompt(
            [
                {
                    name:"targetAccount",
                    type:'number',
                    message:'Please provide recipient account number : '
                },
                {
                    name:'transferAmount',
                    type:'number',
                    message:'Please provide Amount to Transfer : '
                }
            ]
        );
        if(checkBalance(beneficary.transferAmount)){
            console.log(`$${beneficary.transferAmount} is transfered to Accont No. ${beneficary.targetAccount}`);
            // checkBalance(beneficary.transferAmount);
        }
    }
}else {
    console.log('Incorrect PIN code.')
}