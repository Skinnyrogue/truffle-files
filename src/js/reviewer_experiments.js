function showExperiments() {

  var preregisterInstance;
  var overview = document.getElementById('overview');

  App.contracts.PreRegister.deployed().then(function(instance) {
    preregisterInstance = instance;

    preregisterInstance.getStudiesOfReviewer.call(user, {from: user}).then(function(list) {
      var listnumber = []
      var index1;
      var arrayLength1 = list.length;
      for (index1 = 0; index1 < arrayLength1; index1++) {
        listnumber.push(list[index1].c[0]);
      }
      listnumber = removeDuplicate(listnumber);

      var index;
      var arrayLength = listnumber.length;
      for (index = 0; index < arrayLength; index++) {
        preregisterInstance.getPreregistration.call(listnumber[index], {from: user}).then(function(experiment) {
          preregisterInstance.getPreregistrationHash.call(experiment[0].c, {from: user}).then(function(hash) {
            preregisterInstance.getTimestamp.call(experiment[0].c, {from: user}).then(function(timestamp) {
              preregisterInstance.getReviewers.call(experiment[0].c, {from: user}).then(function(reviewers) {
                preregisterInstance.getOrcid.call(experiment[0].c, {from: user}).then(function(orcid) {
                  s = "<b>ID of study:</b><br>" + experiment[0]
                  + "<br><br><b>Address user:</b><br>" + experiment[1]
                  + "<br><br><b>ORCID ID:</b><br>" + web3.toAscii(orcid)
                  + "<br><br><b>Preregistration URL:</b><br>" + web3.toAscii(experiment[3])
                  + "<br><br><b>Preregistration SHA256 Hash:</b><br>" + web3.toAscii(hash[0]) + web3.toAscii(hash[1])
                  + "<br><br><b>Time of preregistration:</b><br>" + timeConverter(timestamp.c)
                  + "<br><br><b>Title:</b><br>" + web3.toAscii(experiment[2])
                  + "<br><br><b>Deadline:</b><br>" + web3.toAscii(experiment[4])
                  + "<br><br><b>Changes in study:</b><br>" + web3.toAscii(experiment[5])
                  + "<br><br><b>Results of study:</b><br>" + web3.toAscii(experiment[6])
                  + "<br><hr>";
                  overview.innerHTML += s;
                });//getOrcid
              });//getReviewers
            }); //getTimestamptimestamp
          }); //getPreregistrationHash
        }); //getPreregistration
      } //end 1st for-loop
    });
  });

};


$(function() {
  $(window).load(function() {

    App.init();

    if (document.cookie.length != 0) {
      var splittedcookie = document.cookie.split('=');
      user = splittedcookie[1];
      console.log("Selected user: " + user);
    }
    setTimeout(showExperiments, 200);
  });
});
