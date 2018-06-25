function setPreregistration() {

  var preregisterInstance;

  var input_url = document.getElementById('input_url');
  var input_hash = document.getElementById('input_hash');
  var input_title = document.getElementById('input_title');
  var input_deadline = document.getElementById('input_deadline');
  var input_orcid = document.getElementById('input_orcid');


  var button = document.getElementById('button');
  var output = document.getElementById('output');

  button.addEventListener('click', function () {
    App.contracts.PreRegister.deployed().then(function(instance) {
      preregisterInstance = instance;

      var hash1 = input_hash.value.substring(0,32);
      var hash2 = input_hash.value.substring(32,64);

      preregisterInstance.setPreregistration(input_url.value, hash1, hash2, input_title.value, input_deadline.value, {from: user, gas: 1000000}).then(function(result) {
        preregisterInstance.setTimestamp(web3.eth.getBlock(result.receipt.blockNumber).timestamp, {from:user, gas: 1000000}).then(function() {
          preregisterInstance.setOrcid(input_orcid.value, {from: user, gas: 1000000}).then(function(result123) {
            preregisterInstance.getCurrentPreregistration.call({from: user}).then(function(experiment) {
              preregisterInstance.getPreregistrationHash.call(experiment[0].c, {from: user}).then(function(hash) {
                preregisterInstance.getTimestamp.call(experiment[0].c, {from: user}).then(function(timestamp) {
                  preregisterInstance.getOrcid.call(experiment[0].c, {from: user}).then(function(orcid) {

                    output.innerHTML = "<h2>Your preregistration was succesfully deployed into the Blockchain</h2><br>"
                    + "ID of your study:<br>" + experiment[0]
                    + "<br><br>Address user:<br>" + experiment[1]
                    + "<br><br>ORCID ID:<br>" + web3.toAscii(orcid)
                    + "<br><br>Preregistration URL:<br>" + web3.toAscii(experiment[2])
                    + "<br><br>Preregistration SHA256 Hash:<br>" + web3.toAscii(hash[0]) + web3.toAscii(hash[1])
                    + "<br><br>Time of preregistration:<br>" + timeConverter(timestamp.c)
                    + "<br><br>Study title:<br>" + web3.toAscii(experiment[3]) + "<br><br>Study deadline:<br>" + web3.toAscii(experiment[4]);
                  }); //getOrcid
                }); //getTimestamp
              }); //getHash
            }); // getCurrentPreregistration
          }); //setOrcid
        }); //setTimestamp
      }); //setPreregistration
    });
  });


};

$(function() {
  $(window).load(function() {
    if (document.cookie.length != 0) {
      var splittedcookie = document.cookie.split('=');
      user = splittedcookie[1];
      console.log("Selected user: " + user);
    }
    App.init();
    setPreregistration();
  });
});
