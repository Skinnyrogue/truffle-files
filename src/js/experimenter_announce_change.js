function announceChange() {
  var preregisterInstance;

  var overview = document.getElementById('overview');

  App.contracts.PreRegister.deployed().then(function(instance) {
    preregisterInstance = instance;

    preregisterInstance.getList.call({from: user}).then(function(list) {
      var index;
      var arrayLength = list.length;
      var counter = 0;

      var inputidlist1 = [];
      var buttonidlist1 = [];
      var outputidlist1 = [];

      var inputidlist2 = [];
      var buttonidlist2 = [];
      var outputidlist2 = [];

      var experimentidlist = [];

      for (index = 0; index < arrayLength; index++) {
          preregisterInstance.getPreregistration.call(list[index].c, {from: user}).then(function(experiment) {
            preregisterInstance.getTimestamp.call(experiment[0].c, {from: user}).then(function(timestamp) {
              preregisterInstance.getPreregistrationHash.call(experiment[0].c, {from: user}).then(function(hash) {

                inputid1 = "inputid1" + (experiment[0].c);
                buttonid1 = "buttonid1" + (experiment[0].c);
                outputid1 = "outputid1" + (experiment[0].c);

                inputid2 = "inputid2" + (experiment[0].c);
                buttonid2 = "buttonid2" + (experiment[0].c);
                outputid2 = "outputid2" + (experiment[0].c);

                inputidlist1.push(inputid1);
                buttonidlist1.push(buttonid1);
                outputidlist1.push(outputid1);

                inputidlist2.push(inputid2);
                buttonidlist2.push(buttonid2);
                outputidlist2.push(outputid2);

                experimentidlist.push(experiment[0].c);

                s = "<b>ID of study:</b><br>" + experiment[0]
                + "<br><br><b>Address user:</b><br>" + experiment[1]
                + "<br><br><b>Preregistration URL:</b><br>" + web3.toAscii(experiment[3])
                + "<br><br><b>Preregistration SHA256 Hash:</b><br>" + web3.toAscii(hash[0]) + web3.toAscii(hash[1])
                + "<br><br><b>Time of preregistration:</b><br>" + timeConverter(timestamp.c)
                + "<br><br><b>Title:</b><br>" + web3.toAscii(experiment[2])
                + "<br><br><b>Deadline:</b><br>" + web3.toAscii(experiment[4])
                + "<br><br><input id=" + inputid1 + " type='text' placeholder='URL'>"
                + "<button id=" + buttonid1 + " name='button'>Insert Study Changes</button>"
                + "<pre id=" + outputid1 + " ></pre>"
                + "<input id=" + inputid2 + " type='text' placeholder='URL'>"
                + "<button id=" + buttonid2 + " name='button'>Insert Study Results</button>"
                + "<pre id=" + outputid2 + " ></pre>"

                + "<hr>";

                overview.innerHTML += s;

                counter ++;
                if(counter === arrayLength) {

                  var index2;
                  for (index2 = 0; index2 < arrayLength; index2++) {
                    (function(cntr) {

                      inputid1 = inputidlist1[cntr];
                      buttonid1 = buttonidlist1[cntr];
                      outputid1 = outputidlist1[cntr];

                      inputid2 = inputidlist2[cntr];
                      buttonid2 = buttonidlist2[cntr];
                      outputid2 = outputidlist2[cntr];

                      var experimentid = experimentidlist[cntr];

                      var button1 = document.getElementById(buttonid1);
                      var input1 = document.getElementById(inputid1);
                      var output1 = document.getElementById(outputid1);

                      var button2 = document.getElementById(buttonid2);
                      var input2 = document.getElementById(inputid2);
                      var output2 = document.getElementById(outputid2);


                      button1.addEventListener('click', function () {
                        preregisterInstance.setChanges(experimentid, input1.value, {from: user, gas: 1000000}).then(function() {
                          preregisterInstance.getPreregistration.call(experimentid, {from: user}).then(function(experiment) {
                            output1.innerHTML = "<h4>The following URL was succesfully deployed into the Blockchain:</h4>" + web3.toAscii(experiment[5]);

                          });
                        });
                      });

                      button2.addEventListener('click', function () {
                        preregisterInstance.setResults(experimentid, input2.value, {from: user, gas: 1000000}).then(function() {
                          preregisterInstance.getPreregistration.call(experimentid, {from: user}).then(function(experiment) {
                            output2.innerHTML = "<h4>The following URL was succesfully deployed into the Blockchain:</h4>" + web3.toAscii(experiment[6]);

                          });
                        });
                      });

                  })(index2); //end of cntr function
                } //end of 2nd for-loop
              } //end of if (true)
            }); //getHash
          }); //end of timestamp
        }); // end of getPreregistration
      } //end of 1st for-loop
    }); //end of preregisterinstance get list
  }); //end of deployed function

}; //end of function announceChange


$(function() {
  $(window).load(function() {
    App.init();
    if (document.cookie.length != 0) {
      var splittedcookie = document.cookie.split('=');
      user = splittedcookie[1];
      console.log("Selected user: " + user);
    }
    setTimeout(announceChange, 200);
  });
});
