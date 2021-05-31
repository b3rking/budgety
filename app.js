// budget controller
var budgetController = (function() {
    
    // some code

})();

// ui controller
var uiController = (function() {

    // some code

})();

// global app controller
var controller = (function() {

    var ctrlAddItem = function() {

        // 1. get the field input data
        // 2. add the item to the budget controller
        // 3. add the item to the ui
        // 4. calculate the budget
        // 5. display the budget to the ui

    }

    document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function(e){
        if (e.keyCode === 13 || e.which === 13) {
            ctrlAddItem();
        }
    });

})(budgetController, uiController);