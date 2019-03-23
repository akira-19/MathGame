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
    // instance.getMath();
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

    $(document).on('click keydown','.showQuestion', function(event){
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
    if (n == 0){
        $(".mathMode").css('display','none');
        $(".result").css("display", "block");
        $(".result").append("Oops, you got 0 correct answer. Try one more time.")
    }else{
        $(".mathMode").css('display','none');
        $(".result").css("display", "block");
        $(".result").append("You got <span style='color:red; font-weight:bold;'>" + n + "</span> correct answers, so you can get <span style='color:red; font-weight:bold;'>" + n + "</span> math.")
        $(".result").append("<br><br><button class='btn btn-info'>Get " + n + " math</button>")
    }

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
