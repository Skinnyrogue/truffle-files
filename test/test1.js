const PreRegister = artifacts.require("ScientificWorkflow");
var gasused = 0
contract('ScientificWorkflow', async(accounts) => {
  it("Assign roles", async () => {
    let instance = await PreRegister.deployed();

    let tx1 = await instance.setExperimenter({from: accounts[0]});
    let tx2 = await instance.setReviewer({from: accounts[0]})
    let tx3 = await instance.setEditor({from: accounts[0]});

    gasused += tx1.receipt.gasUsed
    gasused += tx2.receipt.gasUsed
    gasused += tx3.receipt.gasUsed

    console.log(gasused);

  });
  it("Author: Pre-register study", async () => {
    let instance = await PreRegister.deployed();

    let experimenter_0 = accounts[0];

    let tx4 = await instance.setPreregistration("https://goo.gl/8LBTZh", "351A783D7B6550B28CDFBD913D557954", "99C92A9B344AFC0928706F07053D1AC9", "Managing software processes", "20-04-2019", {from: experimenter_0, gas: 1000000})
    let tx5 = await instance.setTimestamp(web3.eth.getBlock(tx4.receipt.blockNumber).timestamp, {from: experimenter_0, gas: 1000000})
    let tx6 = await instance.setOrcid("0000-0002-0339-7838", {from: experimenter_0, gas: 1000000})

    gasused += tx4.receipt.gasUsed
    gasused += tx5.receipt.gasUsed
    gasused += tx6.receipt.gasUsed

    console.log(gasused);
  });

  it("Author: Submit changes to study", async () => {
    let instance = await PreRegister.deployed();

    let experimenter_0 = accounts[0];

    let experiment_id = await instance.getListAddress(experimenter_0)

    let tx7 = await instance.setChanges(experiment_id[0], "https://goo.gl/1aLwfF", {from: experimenter_0, gas: 1000000})

    gasused += tx7.receipt.gasUsed

    console.log(gasused);
  });

  it("Author: Submit manuscript", async () => {
    let instance = await PreRegister.deployed();

    let experimenter_0 = accounts[0];

    let experiment_id = await instance.getListAddress(experimenter_0)

    let tx8 = await instance.setResults(experiment_id[0], "https://goo.gl/1aLwfF", {from: experimenter_0, gas: 1000000})

    gasused += tx8.receipt.gasUsed

    console.log(gasused);

  });

  it("Editor: Retrieve pre-registration and manuscript", async () => {
    let instance = await PreRegister.deployed();

    let experimenter_0 = accounts[0];

    let experiment_id = await instance.getListAddress(experimenter_0)

    await instance.getPreregistration.call(experiment_id[0], {from: experimenter_0})
    await instance.getPreregistrationHash.call(experiment_id[0], {from: experimenter_0})
    await instance.getTimestamp.call(experiment_id[0], {from: experimenter_0})
    await instance.getOrcid.call(experiment_id[0], {from: experimenter_0})
  });

  it("Editor: Assign reviewers by editor", async () => {
    let instance = await PreRegister.deployed();

    let experimenter_0 = accounts[0];
    let reviewer_0 = accounts[0];
    let editor = accounts[0];

    let experiment_id = await instance.getListAddress(experimenter_0)

    let tx9 = await instance.assignReviewers(experiment_id[0], reviewer_0, {from: editor})
    let tx10 = await instance.assignReviewers(experiment_id[0], reviewer_0, {from: editor})
    let tx11 = await instance.assignReviewers(experiment_id[0], reviewer_0, {from: editor})
    let tx12 = await instance.assignReviewers(experiment_id[0], reviewer_0, {from: editor})
    let tx13 = await instance.assignReviewers(experiment_id[0], reviewer_0, {from: editor})

    gasused += tx9.receipt.gasUsed
    gasused += tx10.receipt.gasUsed
    gasused += tx11.receipt.gasUsed
    gasused += tx12.receipt.gasUsed
    gasused += tx13.receipt.gasUsed

    console.log(gasused);



  });

  it("Reviewers: Retrieve pre-registration, manuscript, and submit reviews", async () => {
    let instance = await PreRegister.deployed();

    let reviewer_0 = accounts[0];
    let experimenter_0 = accounts[0];


    let experiment_id = await instance.getListAddress(reviewer_0)

    await instance.getPreregistration.call(experiment_id[0], {from: experimenter_0})
    await instance.getPreregistrationHash.call(experiment_id[0], {from: experimenter_0})
    await instance.getTimestamp.call(experiment_id[0], {from: experimenter_0})
    await instance.getOrcid.call(experiment_id[0], {from: experimenter_0})

    await instance.getPreregistration.call(experiment_id[0], {from: experimenter_0})
    await instance.getPreregistrationHash.call(experiment_id[0], {from: experimenter_0})
    await instance.getTimestamp.call(experiment_id[0], {from: experimenter_0})
    await instance.getOrcid.call(experiment_id[0], {from: experimenter_0})

    await instance.getPreregistration.call(experiment_id[0], {from: experimenter_0})
    await instance.getPreregistrationHash.call(experiment_id[0], {from: experimenter_0})
    await instance.getTimestamp.call(experiment_id[0], {from: experimenter_0})
    await instance.getOrcid.call(experiment_id[0], {from: experimenter_0})

    await instance.getPreregistration.call(experiment_id[0], {from: experimenter_0})
    await instance.getPreregistrationHash.call(experiment_id[0], {from: experimenter_0})
    await instance.getTimestamp.call(experiment_id[0], {from: experimenter_0})
    await instance.getOrcid.call(experiment_id[0], {from: experimenter_0})

    await instance.getPreregistration.call(experiment_id[0], {from: experimenter_0})
    await instance.getPreregistrationHash.call(experiment_id[0], {from: experimenter_0})
    await instance.getTimestamp.call(experiment_id[0], {from: experimenter_0})
    await instance.getOrcid.call(experiment_id[0], {from: experimenter_0})

    let tx14 = await instance.setReview(experiment_id[0], reviewer_0, "https://goo.gl/BeZhKK", {from: reviewer_0})
    let tx15 = await instance.setReviewDecision(experiment_id[0], reviewer_0, 2, {from: reviewer_0})

    let tx16 = await instance.setReview(experiment_id[0], reviewer_0, "https://goo.gl/BeZhKK", {from: reviewer_0})
    let tx17 = await instance.setReviewDecision(experiment_id[0], reviewer_0, 2, {from: reviewer_0})

    let tx18 = await instance.setReview(experiment_id[0], reviewer_0, "https://goo.gl/BeZhKK", {from: reviewer_0})
    let tx19 = await instance.setReviewDecision(experiment_id[0], reviewer_0, 2, {from: reviewer_0})

    let tx20 = await instance.setReview(experiment_id[0], reviewer_0, "https://goo.gl/BeZhKK", {from: reviewer_0})
    let tx21 = await instance.setReviewDecision(experiment_id[0], reviewer_0, 2, {from: reviewer_0})

    let tx22 = await instance.setReview(experiment_id[0], reviewer_0, "https://goo.gl/BeZhKK", {from: reviewer_0})
    let tx23 = await instance.setReviewDecision(experiment_id[0], reviewer_0, 2, {from: reviewer_0})

    gasused += tx14.receipt.gasUsed
    gasused += tx15.receipt.gasUsed
    gasused += tx16.receipt.gasUsed
    gasused += tx17.receipt.gasUsed
    gasused += tx18.receipt.gasUsed
    gasused += tx19.receipt.gasUsed
    gasused += tx20.receipt.gasUsed
    gasused += tx21.receipt.gasUsed
    gasused += tx22.receipt.gasUsed
    gasused += tx23.receipt.gasUsed

    console.log(gasused)

  });

  it("Editor: Retrieve reviews and review decisions", async () => {
    let instance = await PreRegister.deployed();

    let experimenter_0 = accounts[0];


    let experiment_id = await instance.getListAddress(experimenter_0)

    await instance.getReview.call(experiment_id[0], experimenter_0, {from: experimenter_0})
    await instance.getReviewDecision.call(experiment_id[0], experimenter_0, {from: experimenter_0})

    await instance.getReview.call(experiment_id[0], experimenter_0, {from: experimenter_0})
    await instance.getReviewDecision.call(experiment_id[0], experimenter_0, {from: experimenter_0})

    await instance.getReview.call(experiment_id[0], experimenter_0, {from: experimenter_0})
    await instance.getReviewDecision.call(experiment_id[0], experimenter_0, {from: experimenter_0})

    await instance.getReview.call(experiment_id[0], experimenter_0, {from: experimenter_0})
    await instance.getReviewDecision.call(experiment_id[0], experimenter_0, {from: experimenter_0})

    await instance.getReview.call(experiment_id[0], experimenter_0, {from: experimenter_0})
    await instance.getReviewDecision.call(experiment_id[0], experimenter_0, {from: experimenter_0})

  });

  it("Editor: Publish manuscript into Blockchain journal", async () => {
    let instance = await PreRegister.deployed();

    let editor = accounts[0];
    let experimenter_0 = accounts[0];


    let experiment_id = await instance.getListAddress(experimenter_0)

    let tx24 = await instance.publishStudy(experiment_id, {from: editor, gas: 1000000})

    gasused += tx24.receipt.gasUsed

    console.log("Total gas used: " + gasused)


  });

})
