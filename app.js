var budgetController = (function() {
    var x = 5;

    function add(x) {
        return x + x;
    }

    return {
        publicTest: function (b) {
            return add(b);
        }
    }
})();

var uiController = (function() {

    // some code

})();

var controller = (function() {

    return {
        anotherF: function() {
            console.log(budgetController.publicTest(10)),
            console.log(budgetController.publicTest(50)),
            console.log(budgetController.publicTest(60))
        }
    }

})(budgetController, uiController);