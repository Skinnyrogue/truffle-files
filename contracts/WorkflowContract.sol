pragma solidity ^0.4.19; //compiler version

contract ScientificWorkflow{

    struct ExperimentData{
        uint id;
        address user;
        bytes32 preregistration_url;
        bytes32 preregistration_hash1;
        bytes32 preregistration_hash2;
        bytes32 title;
        bytes32 deadline;
        bytes32 changes_url;
        bytes32 results_url;
        uint timestamp;
        address[] reviewers;
        bytes32 orcid_id;
        mapping (address => uint) reviewersIndexes;
        mapping (address => bytes32) reviewersReview;
        mapping (address => uint) reviewersDecision;

    }

    struct AddressData{
        uint[] structArray;
    }

    uint public currentID;
    uint[] publishedStudies;

    mapping (address => bool) public editors;
    mapping (address => bool) public experimenters;
    mapping (address => bool) public reviewers;

    mapping (uint => ExperimentData) preregistrations;
    mapping (address => AddressData) addressToExperiments;
    mapping (address => AddressData) reviewerToExperiments;



    function setExperimenter() public{
        experimenters[msg.sender] = true;
    }
    function setReviewer() public{
        reviewers[msg.sender] = true;
    }

    function setEditor() public{
        editors[msg.sender] = true;
    }

    modifier ifExperimenter(){
      if(experimenters[msg.sender]!=true){
          revert();
      }
      else{
          _;
      }
    }
    modifier ifReviewer(){
      if(reviewers[msg.sender]!=true){
          revert();
      }
      else{
          _;
      }
    }

    modifier ifEditor(){
      if(editors[msg.sender]!=true){
          revert();
      }
      else{
          _;
      }
    }

    function setPreregistration(bytes32 _preregistration_url, bytes32 _preregistration_hash1, bytes32 _preregistration_hash2, bytes32 _title, bytes32 _deadline) ifExperimenter public{
        preregistrations[currentID].id = currentID;
        preregistrations[currentID].user = msg.sender;
        preregistrations[currentID].preregistration_url = _preregistration_url;
        preregistrations[currentID].preregistration_hash1 = _preregistration_hash1;
        preregistrations[currentID].preregistration_hash2 = _preregistration_hash2;
        preregistrations[currentID].title = _title;
        preregistrations[currentID].deadline = _deadline;
        addressToExperiments[msg.sender].structArray.push(currentID);
        currentID += 1;
    }

    function getPreregistration(uint index) public constant returns(uint, address, bytes32, bytes32, bytes32, bytes32, bytes32) {
     return (preregistrations[index].id, preregistrations[index].user, preregistrations[index].title, preregistrations[index].preregistration_url, preregistrations[index].deadline, preregistrations[index].changes_url, preregistrations[index].results_url);
    }

    function getPreregistrationHash(uint index) public constant returns(bytes32, bytes32) {
      return (preregistrations[index].preregistration_hash1, preregistrations[index].preregistration_hash2);
    }

    function getCurrentPreregistration() public constant returns(uint, address, bytes32, bytes32, bytes32, uint) {
      return (preregistrations[currentID-1].id, preregistrations[currentID-1].user, preregistrations[currentID-1].preregistration_url, preregistrations[currentID-1].title, preregistrations[currentID-1].deadline, preregistrations[currentID-1].timestamp);
    }

    function getList() public constant returns(uint[]) {
        return addressToExperiments[msg.sender].structArray;
    }

    function getListAddress(address sender) public constant returns(uint[]) {
        return addressToExperiments[sender].structArray;
    }

    function setChanges(uint index, bytes32 _changes_url) ifExperimenter public{
        preregistrations[index].changes_url = _changes_url;
    }

    function setResults(uint index, bytes32 _results_url) ifExperimenter public{
        preregistrations[index].results_url = _results_url;
    }

    function setOrcid(bytes32 _orcid_id) ifExperimenter public{
        preregistrations[currentID-1].orcid_id = _orcid_id;
    }

    function getOrcid(uint index) public constant returns(bytes32) {
      return preregistrations[index].orcid_id;
    }

    function setTimestamp(uint _timestamp) ifExperimenter public{
        preregistrations[currentID-1].timestamp = _timestamp;
    }

    function getTimestamp(uint index) public constant returns(uint) {
        return preregistrations[index].timestamp;
    }



    function assignReviewers(uint index, address _reviewer) ifEditor public {
        uint id = preregistrations[index].reviewers.length;
        preregistrations[index].reviewersIndexes[_reviewer] = id;
        preregistrations[index].reviewers.push(_reviewer);
        reviewerToExperiments[_reviewer].structArray.push(index);

    }

    function getReviewers(uint index) public constant returns(address[]) {
        return preregistrations[index].reviewers;
    }

    function getStudiesOfReviewer(address _reviewer) public constant returns(uint[]) {
        return reviewerToExperiments[_reviewer].structArray;
    }

    function setReview(uint index, address _reviewer, bytes32 _review) ifReviewer public{
        preregistrations[index].reviewersReview[_reviewer] = _review;
    }

    function getReview(uint index, address _reviewer) public constant returns(bytes32){
        return preregistrations[index].reviewersReview[_reviewer];
    }

    function setReviewDecision(uint index, address _reviewer, uint _decision) ifReviewer public{
        preregistrations[index].reviewersDecision[_reviewer] = _decision;
    }

    function getReviewDecision(uint index, address _reviewer) public constant returns(uint){
        return preregistrations[index].reviewersDecision[_reviewer];
    }

    function removeReviewer(uint index, address _reviewer) ifEditor public {
        uint id = preregistrations[index].reviewersIndexes[_reviewer];
        delete preregistrations[index].reviewers[id];
    }

    function publishStudy(uint _study) ifEditor public {
       publishedStudies.push(_study);
    }

    function removeStudy(uint _study) ifEditor public {
      for (uint i = _study; i<publishedStudies.length-1; i++){
            publishedStudies[i] = publishedStudies[i+1];
        }
        delete publishedStudies[publishedStudies.length-1];
        publishedStudies.length--;
    }

    function getPublishedStudies() public constant returns(uint[]) {
        return publishedStudies;
    }

}
