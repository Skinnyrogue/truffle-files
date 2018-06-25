function showAllExperiments() {

  var preregisterInstance;
  var overview = document.getElementById('overview');


  App.contracts.PreRegister.deployed().then(function(instance) {
    preregisterInstance = instance;


    preregisterInstance.currentID.call({from: user}).then(function(id) {
      var index;
      var counter = 0;
      var arrayLength = id.c;
      for (index = 0; index < id.c; index++) {
        preregisterInstance.getPreregistration.call(index, {from: user}).then(function(experiment) {
          preregisterInstance.getPreregistrationHash.call(experiment[0].c, {from: user}).then(function(hash) {
            preregisterInstance.getTimestamp.call(experiment[0].c, {from: user}).then(function(timestamp) {
              preregisterInstance.getReviewers.call(experiment[0].c, {from: user}).then(function(reviewers) {
                preregisterInstance.getOrcid.call(experiment[0].c, {from: user}).then(function(orcid) {
                  var outputid = "outputid" + (experiment[0].c);

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
                  + "<br><br><b>Reviewers:</b><br>" + sortReviewers(reviewers)
                  + "<br><br><b>Review result: </b><br>" + "<pre id=" + outputid + "></pre>"
                  + "<br><hr>";

                  overview.innerHTML += s;


                  counter++;
                  if (counter == arrayLength){

                    preregisterInstance.currentID.call({from: user}).then(function(idone) {
                      var index1;
                      for (index1 = 0; index1 < idone.c; index1++) {
                        (function(cntr) {
                          preregisterInstance.getReviewers.call(cntr, {from: user}).then(function(reviewersone) {
                            var sorted = pureReviewers(reviewersone);
                            var index2;
                            for (index2 = 0; index2 < sorted.length; index2++) {
                              (function(cntr2) {
                                preregisterInstance.getReview.call(cntr, sorted[cntr2], {from: user}).then(function(review) {
                                  preregisterInstance.getReviewDecision.call(cntr, sorted[cntr2], {from: user}).then(function(decision) {
                                    var choice;
                                    if (decision.c[0] == 2){
                                      choice = " - <font color='green'>accepted</font>";
                                    }
                                    else if (decision.c[0] == 1){
                                      choice = " - <font color='red'>rejected</font>";
                                    }
                                    else if (decision.c[0] == 0){
                                      choice = "";
                                    }

                                    var outputid = "outputid" + cntr;
                                    var saying = "Reviewer " + cntr2 + ": " +  web3.toAscii(review) + choice +"<br>";
                                    document.getElementById(outputid).innerHTML += saying
                                  });
                                });
                              })(index2);
                            }
                          });
                        })(index1);
                      }
                    });
                  } //end of if
                }); //getOrcid
              }); //getReviewers
            }); //getTimestamptimestamp
          }); //getPreregistrationHash
        }); //getPreregistration
      } //1st for-loop
    }); //currentID
  });  //preregister.deployed

}; //showAllExperiments


$(function() {
  $(window).load(function() {

    App.init();

    if (document.cookie.length != 0) {
      var splittedcookie = document.cookie.split('=');
      user = splittedcookie[1];
      console.log("Selected user: " + user);
    }
    setTimeout(showAllExperiments, 200);
  });
});
