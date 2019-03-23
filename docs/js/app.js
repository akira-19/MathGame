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
    App.web3Provider = new Web3.providers.HttpProvider('ropsten.infura.io/v3/e1fc7a67bed2467c93a6b19a65c49326');

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

    return App.initCondition();
  });
    return App.showQuestion();
  },

initCondition: function () {
    web3.eth.getAccounts((error, accounts) => {
       account = accounts[0];
       App.contracts.MathGame.deployed().then(instance => {
           return instance.balanceOf(account);
       }).then(math => {
           let mathAmount = parseInt(math)
           $("#ownedMath").html(mathAmount);
           if (mathAmount < 10){
               $("#level").html("Newbie");
           }else if (mathAmount < 20){
               $("#level").html("Beginner");
           }else if (mathAmount < 30){
               $("#level").html("Intermediate");
           }else if (mathAmount < 40){
               $("#level").html("Skillful");
           }else if (mathAmount < 50){
               $("#level").html("Advanced");
           }else{
               $("#level").html("Expert");
           }
       });

   });

},

generateMath: function() {
    let random1 = Math.ceil( Math.random()*99); // 1 - 99
    let random2 = Math.ceil( Math.random()*99); // 1 - 99
    let randOperator = Math.floor( Math.random()*4); // 0 - 3
    let operators = ['+', '-', '*', '/'];


    $("#mathNumber1").text(random1);
    $("#mathNumber2").text(random2);
    $("#mathOperator").text(operators[randOperator]);
    $("#answer").focus();
},

showQuestion: function(){
    let correctCounter = 0;
    let answerCounter = 0;
    let operators = ['+', '-', '*', '/'];

    $(document).on('click','.showQuestion', function(event){
           if (answerCounter == 0) {
            App.generateMath();
            answerCounter++;
            $(".initialDisplay").css('display','none');
            $(".mathMode").css('display','block');
        }else{
            let answer = App.getAnswer();
            let userAnswer = $("#answer").val();
            $("#answer").val("");

            if(userAnswer == answer){
                correctCounter++;
            }
            answerCounter++;

            if (answerCounter<=18){
                App.generateMath();
            }else{
                App.showResult(correctCounter);
            }
        }
    });

    $("#answer").on("keydown", function(e) {
           if(e.keyCode === 13) {
               $(".showQuestion").click();
           }
    });


},

showResult: function(n){
    $(".result").html("")
    if (n == 0){
        $(".mathMode").css('display','none');
        $(".result").css("display", "block");
        $(".result").append("Oops, you got 0 correct answer. Try one more time.")
    }else{
        $(".mathMode").css('display','none');
        $(".result").css("display", "block");
        $(".result").append("You got <span style='color:red; font-weight:bold;'>" + n + "</span> correct answers, so you can get <span style='color:red; font-weight:bold;'>" + n + "</span> math.")
        $(".result").append("<br><br><button class='btn btn-info' onclick='App.getMath("+n+")'>Get " + n + " math</button>")
    }
    $(".result").append("<br><br><button class='btn btn-primary' onclick='location.reload();'>Try Again</button>")

},

getMath: function(n){
     App.contracts.MathGame.deployed().then(instance => {
         let number = parseInt(n);
         return instance.giveMath(number);
     }).catch(function(err) {
         console.log(err.message);
     });
},

getAnswer: function() {
    let firstNum = $("#mathNumber1").text();
    let secondNum = $("#mathNumber2").text();
    let operator = $("#mathOperator").text();
    let answer;
    switch (operator) {
        case "+":
            answer = parseInt(firstNum) + parseInt(secondNum);
            break;
        case "-":
            answer = parseInt(firstNum) - parseInt(secondNum);
            break;
        case "*":
            answer = parseInt(firstNum) * parseInt(secondNum);
            break;
        case "/":
            answer = Math.round(parseInt(firstNum) / parseInt(secondNum));
            break;
    }
    return answer;
}

}

$(function() {
  $(window).load(function() {
    App.init();
  });
});
