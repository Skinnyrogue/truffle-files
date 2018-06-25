App = {
  web3Provider: null,
  contracts: {},

  init: function() {

    return App.initWeb3();
  },

  initWeb3: function() {
    // Is there an injected web3 instance?
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
    } else {
      // If no injected web3 instance is detected, fall back to Ganache
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
    }
    web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  initContract: function() {
    $.getJSON('ScientificWorkflow.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract
      var PreRegisterArtifact = data;
      App.contracts.PreRegister = TruffleContract(PreRegisterArtifact);

      // Set the provider for our contract
      App.contracts.PreRegister.setProvider(App.web3Provider);
    });
  },

};

function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}

function sortReviewers(reviewers) {
  var lengthArray = reviewers.length;
  var s = '';
  var reviewers_list = []
  for (index = 0; index < lengthArray; index++) {
    if (reviewers[index] == 0x0000000000000000000000000000000000000000) {
      continue;
    }
    reviewers_list.push(reviewers[index]);
  }
  for (index = 0; index < reviewers_list.length; index++) {
    s += "Reviewer " + index + ": " + reviewers_list[index] + "<br>";
  }
  return s;
}

function pureReviewers(reviewers) {
  var lengthArray = reviewers.length;
  var s = '';
  var reviewers_list = []
  for (index = 0; index < lengthArray; index++) {
    if (reviewers[index] == 0x0000000000000000000000000000000000000000) {
      continue;
    }
    reviewers_list.push(reviewers[index]);
  }
  return reviewers_list;
}

function removeDuplicate(names) {
  var uniqueNames = [];
  $.each(names, function(i, el){
      if($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
  });
  return uniqueNames;
}
