function submitReview() {

  var preregisterInstance;
  var overview = document.getElementById('overview');


  App.contracts.PreRegister.deployed().then(function(instance) {
    preregisterInstance = instance;
    var counter = 0;
    var inputidlist1 = [];

    var buttonidlist1 = [];
    var buttonidlist2 = [];
    var buttonidlist3 = [];

    var outputidlist1 = [];
    var outputidlist2 = [];

    var experimentidlist = [];




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
          preregisterInstance.getTimestamp.call(experiment[0].c, {from: user}).then(function(timestamp) {
            preregisterInstance.getReview.call(experiment[0].c, user, {from: user}).then(function(getreview) {
              preregisterInstance.getReviewDecision.call(experiment[0].c, user, {from: user}).then(function(decision) {
                preregisterInstance.getOrcid.call(experiment[0].c, {from: user}).then(function(orcid) {
                  preregisterInstance.getPreregistrationHash.call(experiment[0].c, {from: user}).then(function(hash) {



                    var inputid1 = "inputid" + (experiment[0].c);

                    var buttonid1 = "buttonid1" + (experiment[0].c);
                    var buttonid2 = "buttonid2" + (experiment[0].c);
                    var buttonid3 = "buttonid3" + (experiment[0].c);

                    var outputid1 = "outputid1" + (experiment[0].c);
                    var outputid2 = "outputid2" + (experiment[0].c);



                    inputidlist1.push(inputid1);
                    buttonidlist1.push(buttonid1);
                    buttonidlist2.push(buttonid2);
                    buttonidlist3.push(buttonid3);
                    outputidlist1.push(outputid1);
                    outputidlist2.push(outputid2);
                    experimentidlist.push(experiment[0].c);

                    s = "<b>ID of study:</b><br>" + experiment[0]
                    + "<br><br><b>Address user:</b><br>" + experiment[1]
                    + "<br><br><b>ORCID ID:</b><br>" + web3.toAscii(orcid)
                    + "<br><br><b>Preregistration URL:</b><br>" + web3.toAscii(experiment[3])
                    + "<br><br><b>Preregistration SHA256 Hash:</b><br>" + web3.toAscii(hash[0]) + web3.toAscii(hash[1])
                    + "<br><br><b>Time of transaction:</b><br>" + timeConverter(timestamp.c)
                    + "<br><br><b>Title:</b><br>" + web3.toAscii(experiment[2])
                    + "<br><br><b>Deadline:</b><br>" + web3.toAscii(experiment[4])
                    + "<br><br><b>Changes in study:</b><br>" + web3.toAscii(experiment[5])
                    + "<br><br><b>Results of study:</b><br>" + web3.toAscii(experiment[6])
                    + "<br><b>Submit review: </b>"
                    + "<br><br><input id=" + inputid1 + " type='text' placeholder='URL'>"
                    + "<button id=" + buttonid1 + " name='button'>Submit review</button>"
                    + "<pre id=" + outputid1 + "></pre>"
                    + "<button id=" + buttonid2 + " name='button'>Study accepted</button>"
                    + "<button id=" + buttonid3 + " name='button'>Study rejected</button>"
                    + "<pre id=" + outputid2 + "></pre>"
                    + "<br><hr>";
                    overview.innerHTML += s;

                    var outcome;

                    if (decision.c[0] == 2) {
                      console.log("testjsejsejr")
                      outcome = "This study has been <font color='green'>accepted</font>";
                    }
                    else if (decision.c[0] == 1) {
                      outcome = "This study has been <font color='red'>rejected</font>";
                    }

                    document.getElementById(outputid1).innerHTML = web3.toAscii(getreview);
                    document.getElementById(outputid2).innerHTML = outcome;

                    counter++;
                    if (counter == arrayLength) {
                      var index2;
                      for (index2 = 0; index2 < arrayLength; index2++) {
                        (function(cntr) {

                          inputid1 = inputidlist1[cntr];
                          buttonid1 = buttonidlist1[cntr];
                          buttonid2 = buttonidlist2[cntr];
                          buttonid3 = buttonidlist3[cntr];
                          outputid1 = outputidlist1[cntr];
                          outputid2 = outputidlist2[cntr];

                          var experimentid = experimentidlist[cntr];

                          var inputid1 = document.getElementById(inputid1);
                          var button1 = document.getElementById(buttonid1);
                          var button2 = document.getElementById(buttonid2);
                          var button3 = document.getElementById(buttonid3);
                          var output1 = document.getElementById(outputid1);
                          var output2 = document.getElementById(outputid2);


                          button1.addEventListener('click', function () {
                            preregisterInstance.setReview(experimentid, user, inputid1.value, {from: user, gas: 1000000}).then(function() {
                              preregisterInstance.getReview.call(experimentid, user, {from: user}).then(function(_review) {
                                output1.innerHTML = "<h4>The following review was succesfully deployed into the Blockchain:</h4>" + web3.toAscii(_review);

                              });
                            });
                          }); //button1

                          button2.addEventListener('click', function () {
                            preregisterInstance.setReviewDecision(experimentid, user, 2, {from: user, gas: 1000000}).then(function() {
                              preregisterInstance.getReviewDecision.call(experimentid, user, {from: user}).then(function(_decision) {
                                var __decision;
                                if (_decision.c[0] == 2){
                                  __decision = "accepted"
                                }
                                output2.innerHTML = "<h4>This study was <font color='green'>"+__decision+"</font> based on your review</h4>"

                              });
                            });
                          }); //button2

                          button3.addEventListener('click', function () {
                            preregisterInstance.setReviewDecision(experimentid, user, 1, {from: user, gas: 1000000}).then(function() {
                              preregisterInstance.getReviewDecision.call(experimentid, user, {from: user}).then(function(_decision) {
                                var __decision;
                                if (_decision.c[0] == 1){
                                  __decision = "rejected"
                                }
                                output2.innerHTML = "<h4>This study was <font color='red'>"+__decision+"</font> based on your review</h4>";

                              });
                            });
                          }); //button3

                        })(index2);
                      }
                    } //if-statement
                  });//getHash
                }); //getOrcid
              }); //getReviewDecision
            }); //getReviewers
          }); //getTimestamptimestamp
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
    setTimeout(submitReview, 200);
  });
});
