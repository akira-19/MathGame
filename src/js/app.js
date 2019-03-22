App = {
  web3Provider: null,
  contracts: {},

  init: async function() {
    return await App.initWeb3();
  },

  initWeb3: async function() {
      // Modern dapp browsers...
  if (window.ethereum) {
    App.web3Provider = window.ethereum;
    try {
      // Request account access
      await window.ethereum.enable();
    } catch (error) {
      // User denied account access...
      console.error("User denied account access")
    }
  }
  // Legacy dapp browsers...
  else if (window.web3) {
    App.web3Provider = window.web3.currentProvider;
  }
  // If no injected web3 instance is detected, fall back to Ganache
  else {
    App.web3Provider = new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/a0e6bae2d4be4f749b0525b8f300a214');
    // App.web3Provider = new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/69c812a113224017b9f3d3357c7aa8c4');
  }

  web3 = new Web3(App.web3Provider);
  return App.initContract();
  },

  initContract: function() {
      $.getJSON('MathGame.json', function(data) {
    // Get the necessary contract artifact file and instantiate it with truffle-contract
    var MathGameArtifact = data;
    App.contracts.MathGame = TruffleContract(MathGameArtifact);

    // Set the provider for our contract
    App.contracts.MathGame.setProvider(App.web3Provider);

    // Use our contract to retrieve and mark the adopted pets

    return App.initialCondition();
  });
    return App.showQuestion();
  },

//
// mint token
//
//  createAndMint: function(){
//      $(document).on('click','#startButton', function(event){
//          event.preventDefault();
//          let mathGameInstance;
//
//          App.contracts.MathGame.deployed().then(instance => {
//              mathGameInstance = instance;
//              mathGameInstance.createAndMint();
//          }).catch(function(err) {
//              console.log(err.message)
//          });
//      })
//  },
//
//  getArt: function(){
//      $(document).off('click');
//      $(document).on('click','#getArt', function(event){
//          event.preventDefault();
//          let mathGameInstance;
//          App.contracts.MathGame.deployed().then(instance => {
//              mathGameInstance = instance;
//              return mathGameInstance.getArt();
//          }).then(result => {
//              App.showNFTokens();
//              App.showOwnedTokenAmount();
//          }).catch(function(err) {
//                  console.log(err.message)
//              });
//      });
//  },
//
//  showOnlyOwner: function(){
//      web3.eth.getAccounts((error, accounts) => {
//         account = accounts[0]
//         App.contracts.MathGame.deployed().then(instance => {
//             return instance.owner();
//         }).then(owner => {
//             if (owner == account){
//                 $("#trWrapper").append("<button  class='btn btn-primary'  id='startButton'>initiate</button><button  class='btn btn-primary'  id='registerPic' onclick='App.registerPic();'>get picture</button>");
//             }
//         })
//     });
//
//  },
//
//  registerPic: function(){
//      $(document).off('click');
//      $(document).on('click','#registerPic', function(event){
//          event.preventDefault();
//          let mathGameInstance;
//          App.contracts.MathGame.deployed().then(instance => {
//              mathGameInstance = instance;
//              instance.initiatePictures();
//          }).catch(function(err) {
//              console.log(err.message);
//          });
//
//
//     })
// },
initialCondition: function () {
        console.log("test");
},
generateMath: function() {
    let random1 = Math.ceil( Math.random()*99); // 1 - 99
    let random2 = Math.ceil( Math.random()*99); // 1 - 99
    let randOperator = Math.floor( Math.random()*4); // 0 - 3
    let operators = ['+', '-', '*', '/'];


    $("#mathNumber1").text(random1);
    $("#mathNumber2").text(random2);
    $("#mathOperator").text(operators[randOperator]);
},

showAndcheckAnswer: function(userAnswer){
    let answer = App.generateMath();
    return answer == userAnswer;
},

showQuestion: function(){
    let correctCounter = 0;
    let answerCounter = 0;
    let operators = ['+', '-', '*', '/'];
    $(document).on('click','.showQuestion', function(event){
        if (answerCounter == 0) {
            App.generateMath();
        }else{
            let firstNum = $("#mathNumber1").text();
            let secondNum = $("#mathNumber2").text();
            let operator = $("#mathOperator").text();
            let answer;
            switch (operator) {
                case "+":
                    answer = firstNum + secondNum;
                    break;
                case "-":
                    answer = firstNum - secondNum;
                    break;
                case "*":
                    answer = firstNum * secondNum;
                    break;
                case "/":
                    answer = firstNum / secondNum;
                    break;
            }

            let userAnswer = $("#answer").val();
            if(userAnswer == answer){
                correctCounter++;
            }
            answerCounter++;

            if (answerCounter<=10){
                console.log(correctCounter);
                App.generateMath();
            }else{
                App.showResult(correctCounter);
            }
        }
    })
},

showResult: function(n){
    console.log(n);

}

}

$(function() {
  $(window).load(function() {
    App.init();
  });
});
