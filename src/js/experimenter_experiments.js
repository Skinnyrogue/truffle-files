function showExperiments() {

  var preregisterInstance;
  var overview = document.getElementById('overview');

  App.contracts.PreRegister.deployed().then(function(instance) {
    preregisterInstance = instance;

    preregisterInstance.getList.call({from: user}).then(function(list) {
      var index;
      var arrayLength = list.length;
      var counter = 0;
      for (index = 0; index < arrayLength; index++) {
        preregisterInstance.getPreregistration.call(list[index].c, {from: user}).then(function(experiment) {
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
                  + "<br><br><b>Assigned reviewers:</b><br>" + sortReviewers(reviewers)
                  + "<br><br><b>Review result: </b><br>" + "<pre id=" + outputid + "></pre>"
                  + "<br><hr>";
                  overview.innerHTML += s;


                  counter++;
                  if (counter == arrayLength){

                    preregisterInstance.getList.call({from: user}).then(function(listone) {
                      var index1;
                      for (index1 = 0; index1 < listone.length; index1++) {
                        (function(cntr) {
                          preregisterInstance.getReviewers.call(listone[cntr].c, {from: user}).then(function(reviewersone) {
                            var sorted = pureReviewers(reviewersone);
                            var index2;
                            for (index2 = 0; index2 < sorted.length; index2++) {
                              (function(cntr2) {
                                preregisterInstance.getReview.call(listone[cntr].c, sorted[cntr2], {from: user}).then(function(review) {
                                  preregisterInstance.getReviewDecision.call(listone[cntr].c, sorted[cntr2], {from: user}).then(function(decision) {
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

                                    var outputid = "outputid" + list[cntr].c;
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
                }); //getORcid
              }); //getReviewers
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
