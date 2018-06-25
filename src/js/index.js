function inputFormUsers() {
  web3.eth.getAccounts(function(error, accounts) {
    if (error) {
      console.log(error);
    }

    var users = document.getElementById("users");
    var index;
    var arrayLength = accounts.length;
    for (index = 0; index < arrayLength; index++) {
      users.innerHTML += "<option>" + index + " - " + accounts[index] + "</option>";
    }
  });
};

function selectedUser() {
  var myList = document.getElementById("users");
  var selectedaccount = document.getElementById("selectedaccount");
  if (myList.options[myList.selectedIndex].text != "Select account") {
    user = myList.options[myList.selectedIndex].text.substring(4);
    console.log(user);

    var preregisterInstance;
    App.contracts.PreRegister.deployed().then(function(instance) {
      preregisterInstance = instance;
      preregisterInstance.experimenters.call(user).then(function(experimenter) {
        preregisterInstance.editors.call(user).then(function(editor) {
          preregisterInstance.reviewers.call(user).then(function(reviewer) {
            if (experimenter == true) {
              s = "You selected user account:    " + user + "-   <b>Experimenter</b>";
              selectedaccount.innerHTML = s;
            }
            else if (editor == true) {
              s = "You selected user account:    " + user + "-   <b>Editor</b>";
              selectedaccount.innerHTML = s;
            }
            else if (reviewer == true) {
              s = "You selected user account:    " + user + "-   <b>Reviewer</b>";
              selectedaccount.innerHTML = s;

            } else {
              s = "You selected user account:    " + user;
              selectedaccount.innerHTML = s;
            }
            console.log(user);
            document.cookie = "user=" + user + ";";
          });
        });
      });
    });

  }
};

function setUserCookie(user) {
  console.log(user);
  document.cookie = "user=" + user + ";";
}

function inputSelectedUsers() {
  web3.eth.getAccounts(function(error, accounts) {
    if (error) {
      console.log(error);
    }

    var output = document.getElementById("output");

    App.contracts.PreRegister.deployed().then(function(instance) {
      preregisterInstance = instance;

      var index;
      var arrayLength = accounts.length;
      for (index = 0; index < arrayLength; index++) {
        (function(cntr) {

          preregisterInstance.experimenters.call(accounts[cntr]).then(function(experimenter) {
            preregisterInstance.editors.call(accounts[cntr]).then(function(editor) {
              preregisterInstance.reviewers.call(accounts[cntr]).then(function(reviewer) {

                if (experimenter == true) {
                  s = cntr + " - " + accounts[cntr] + "   <b>Experimenter</b><br>";
                  output.innerHTML += s;
                }
                else if (editor == true) {
                  s = cntr + " - " + accounts[cntr] + "   <b>Editor</b><br>";
                  output.innerHTML += s;
                }
                else if (reviewer == true) {
                  s = cntr + " - " + accounts[cntr] + "   <b>Reviewer</b><br>";
                  output.innerHTML += s;

                }
              });
            });
          });
        })(index);
      }
    });
  });
};

function setRole() {

  var preregisterInstance;

  document.getElementById("button_experimenter").onclick = function () {
    App.contracts.PreRegister.deployed().then(function(instance) {
      preregisterInstance = instance;

      preregisterInstance.setExperimenter({from:user}).then(function() {
        location.href = "experimenter_dashboard.html";
      });
    });
  };

  document.getElementById("button_reviewer").onclick = function () {
    App.contracts.PreRegister.deployed().then(function(instance) {
      preregisterInstance = instance;

      preregisterInstance.setReviewer({from:user}).then(function() {
        location.href = "reviewer_dashboard.html";
      });
    });
  };

  document.getElementById("button_editor").onclick = function () {
    App.contracts.PreRegister.deployed().then(function(instance) {
      preregisterInstance = instance;

      preregisterInstance.setEditor({from:user}).then(function() {
        location.href = "editor_dashboard.html";
      });
    });
  };


};


$(function() {
  $(window).load(function() {
    App.init();
    if (document.cookie.length != 0) {
      var splittedcookie = document.cookie.split('=');
      user = splittedcookie[1];
      console.log("Selected user: " + user);
      document.getElementById("selectedaccount").innerHTML = "Your current active account is:    " + user;
    }
    setRole();
    inputFormUsers();
    setTimeout(inputSelectedUsers, 100);
  });
});
