//-----------------------------------------------------------Thomas Rosik---------------------------------------------
function testGenerator() {
  var testList = [];
  var testCount = 0;

  while (testCount < 100) {
    var num = randomInt(1, 10);
    testList.push(num);
    console.log(testList[testCount]);
    testCount++;
  }
}
