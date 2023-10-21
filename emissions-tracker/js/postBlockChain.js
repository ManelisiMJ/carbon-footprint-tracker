
const ALGOD_TOKEN="aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
const ALGOD_SERVER="http://localhost"
const ALGOD_PORT="4001"

const algodClient = new algosdk.Algod(
  ALGOD_TOKEN,
  ALGOD_SERVER,
 ALGOD_PORT
);


  //account using
  let accountS= "";
  let accountMneomonic = "";

  const submitToNetwork = async (signedTxn) => {
    // send txn
    let tx = await algodClient.sendRawTransaction(signedTxn).do();
    console.log("Transaction : " + tx.txId);
  
    // Wait for transaction to be confirmed
    confirmedTxn = await algosdk.waitForConfirmation(algodClient, tx.txId, 4);
  
    //Get the completed Transaction
    console.log(
      "Transaction " +
        tx.txId +
        " confirmed in round " +
        confirmedTxn["confirmed-round"]
    );
  
    return confirmedTxn;
  };
 const token = 'YOUR_API_TOKEN';
const algodUrl = 'https://localhost/4001/v2';


  async function getTransactionParams() {
  const url = 'http://localhost:4001/v2/transactions/params';
  const token = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'X-Algo-API-Token': token
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch transaction parameters');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

  
  // Usage
  
  
  

  const transferAsset = async ( assetId, amount, CompanyName,weekN,fossilFuel,indirectSources,capitalGoods,powerConsumption,carbonN) => {
    console.log("Transferring asset...");
  
    const suggestedParams = await getTransactionParams();
    
    //carbon footprint data
    const carbonData = {
      company: CompanyName,
      week : weekN, 
      fossilFuel: fossilFuel,
      indirectSources: indirectSources,
      capitalGoods:capitalGoods,
      powerConsumption:powerConsumption,
      carbonEmmission: carbonN,
      
    };
     // Convert the carbonData to a string or any desired format suitable for submission
  const dataString = JSON.stringify(carbonData);
  
  // For the sake of example, let's assume we are storing the data in a note field
  const snote = algosdk.encodeObj(dataString);

    let txn = {
      from: accountS,
      to: accountS,
      assetIndex: assetId,
      amount : 0,
      note :snote,
      suggestedParams,
      type: 'axfer',
    };
    const txnBytes = algosdk.encodeUnsignedTransaction(txn);
    console.log(txnBytes)
    console.log("WORK")

    
    sender = algosdk.mnemonicToSecretKey(accountMneomonic);
    // sign the transaction
    const signedTxn = txn.signTxn(sender.sk);
    return await submitToNetwork(signedTxn);
  };
  


document.getElementById('my-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the form from submitting
    const inputData = {
        input: 10,
      };
    var companyName ="Company0"
    var week =13
    var fossilFuel= document.getElementById('fossilFuel').value;
    var indirectSources = document.getElementById('emmissionFromIndirectSources').value;
    var capitalGoods= document.getElementById('capitalGoods').value;
    var powerConsumption = document.getElementById('powerConsumption').value;

    //calculate the total carbon emission
   var totalCarbonEmission =65;

   //post the data to blockchain
   //get the account in json file
   accountS= "Y5QZBEJCXUC7MXHH47KWHUA447QJ32HPTJLIKQK422KORGRLB2TUPKHREI"
   //get the account mmneomonic in a json file
   accountMneomonic= "deliver close net cluster large follow assault adapt jeans mammal dinner resemble timber dance photo real canoe salt error party valve chase protect abandon fish";
      
   try {
    await transferAsset(1034, 1, companyName, week, fossilFuel, indirectSources, capitalGoods, powerConsumption, totalCarbonEmission);
    console.log('Transfer completed successfully');
  } catch (error) {
    console.error('Error:', error);
  }
  
  await new Promise(resolve => setTimeout(resolve, 15000));



    
    // Use the input value in your JavaScript code
    // Example: Display the value in the console
    console.log('Input Value:', "We made it Baby");
  });


  document.getElementById('predictor').addEventListener('click', function() {
    //retrieve the data from json to predict
    const inputData = {
        company :1,
        weekBackCO2:25,
        week2BackCO2:25,
        week3BackCO2:25,
        weekBackPowerConsumption:25,
        week2BackPowerConsumption:25,
        week3BackPowerConsumption:25
      };
      
      // Fetch API request
      fetch('http://127.0.0.1:8000/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputData), // Pass the data from the previous request as the request body
      })
        .then((response) => response.json())
        .then((inputData) => {
          // Handle the response from the API endpoint
          var toastBody = document.querySelector('#my-toast .toast-body');
         toastBody.textContent = inputData.output;

        var toast = new bootstrap.Toast(document.getElementById('my-toast'));
        toast.show();
          console.log('Output:', inputData.output);
        })
        .catch((error) => {
          console.error('Error:', error);
        });    
    // Use the input value in your JavaScript code
    // Example: Display the value in the console
    console.log('Input Value:', inputData);
  });