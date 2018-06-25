function showAllExperiments() {

  var preregisterInstance;
  var overview = document.getElementById('overview');


  App.contracts.PreRegister.deployed().then(function(instance) {
    preregisterInstance = instance;
    var counter = 0;
    var selectidlist1 = [];
    var buttonidlist1 = [];
    var buttonidlist2 = [];
    var outputidlist1 = [];
    var experimentidlist = [];




    preregisterInstance.currentID.call({from: user}).then(function(id) {
      var index;
      for (index = 0; index < id.c; index++) {
        preregisterInstance.getPreregistration.call(index, {from: user}).then(function(experiment) {
          preregisterInstance.getTimestamp.call(experiment[0].c, {from: user}).then(function(timestamp) {
            preregisterInstance.getReviewers.call(experiment[0].c, {from: user}).then(function(reviewers3) {



              var selectid1 = "selectid" + (experiment[0].c);
              var buttonid1 = "buttonid1" + (experiment[0].c);
              var buttonid2 = "buttonid2" + (experiment[0].c);
              var outputid1 = "outputid" + (experiment[0].c);



              selectidlist1.push(selectid1);
              buttonidlist1.push(buttonid1);
              buttonidlist2.push(buttonid2);
              outputidlist1.push(outputid1);
              experimentidlist.push(experiment[0].c);

              s = "<b>ID of study:</b><br>" + experiment[0] + "<br><br><b>Address user:</b><br>" + experiment[1] + "<br><br><b>Preregistration URL:</b><br>" + web3.toAscii(experiment[3]) + "<br><br><b>Time of transaction:</b><br>" + timeConverter(timestamp.c) + "<br><br><b>Title:</b><br>"
              + web3.toAscii(experiment[2]) + "<br><br><b>Deadline:</b><br>" + web3.toAscii(experiment[4]) + "<br><br><b>Changes in study:</b><br>" + web3.toAscii(experiment[5]) + "<br><br><b>Results of study:</b><br>" + web3.toAscii(experiment[6])
              + "<br><b>Assign Reviewer: </b><br><br>"
              + "<select id=" + selectid1 + "><option value='Select account'>Select account</option></select>"
              + "<button id=" + buttonid1 + " name='button'>Set reviewer</button>"
              + "<button id=" + buttonid2 + " name='button'>Remove reviewer</button>"
              + "<pre id=" + outputid1 + "></pre>"

              + "<br><hr>";
              overview.innerHTML += s;

              document.getElementById(outputid1).innerHTML = sortReviewers(reviewers3);

              counter++;
              if (counter == id.c) {
                var index2;
                for (index2 = 0; index2 < id.c; index2++) {
                  (function(cntr) {

                    selectid1 = selectidlist1[cntr];
                    buttonid1 = buttonidlist1[cntr];
                    buttonid2 = buttonidlist2[cntr];
                    outputid1 = outputidlist1[cntr];

                    var experimentid = experimentidlist[cntr];

                    var selectid1 = document.getElementById(selectid1);
                    var button1 = document.getElementById(buttonid1);
                    var button2 = document.getElementById(buttonid2);
                    var output1 = document.getElementById(outputid1);

                    web3.eth.getAccounts(function(error, accounts) {
                      if (error) {
                        console.log(error);
                      }

                      var arrayLength = accounts.length;
                      for (index = 0; index < arrayLength; index++) {
                        (function (cntr2) {
                          preregisterInstance.reviewers.call(accounts[index], {from: user}).then(function(result) {
                            if (result == true) {
                              reviewer = accounts[cntr2];
                              selectid1.innerHTML += "<option>" + reviewer + "</option>";;
                            }
                          });
                        })(index);
                      }
                    });

                    button1.addEventListener('click', function () {
                      selected_option = selectid1.options[selectid1.selectedIndex].text;
                      duplicate = false;

                      if (selected_option != "Select account") {
                        preregisterInstance.getReviewers.call(experimentid, {from: user}).then(function(reviewers1) {
                          var lengthArray = reviewers1.length;
                          for (index = 0; index < lengthArray; index++) {
                            if (reviewers1[index] == selected_option) {
                              duplicate = true;
                              output1.innerHTML = "<h4>This reviewer is already assigned to this study</h4>" + sortReviewers(reviewers1);
                              break;
                            }
                          }
                          if (duplicate == false) {
                            preregisterInstance.assignReviewers(experimentid, selected_option, {from: user, gas: 1000000}).then(function() {
                              preregisterInstance.getReviewers.call(experimentid, {from: user}).then(function(reviewers2) {
                                output1.innerHTML = "<h4>Reviewer succesfully added:</h4>" + sortReviewers(reviewers2);
                              });
                            });
                          }
                        });
                      }
                    }); //button1

                    button2.addEventListener('click', function () {
                      selected_option = selectid1.options[selectid1.selectedIndex].text;

                      if (selected_option != "Select account") {
                        preregisterInstance.getReviewers.call(experimentid, {from: user}).then(function(reviewers1) {
                          var lengthArray = reviewers1.length;
                          for (index = 0; index < lengthArray; index++) {
                            if (reviewers1[index] == selected_option) {
                              preregisterInstance.removeReviewer(experimentid, reviewers1[index], {from: user, gas: 1000000}).then(function() {
                                preregisterInstance.getReviewers.call(experimentid, {from: user}).then(function(reviewers2) {
                                  output1.innerHTML = "<h4>Reviewer succesfully removed:</h4>" + sortReviewers(reviewers2);
                                });

                              });
                            }
                          }

                        });
                      }
                    }); //button2

                  })(index2);
                }
              } //if-statement
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
    setTimeout(showAllExperiments, 200);
  });
});
