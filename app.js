// budget controller
var budgetController = (function() {
    
    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }

    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }

})();

// ui controller
var uiController = (function() {
    var domStrings = {
        type: '.add__type',
        description: '.add__description',
        value: '.add__value',
        add: '.add__btn'
    }
    return {
        getInput: function() {
            return {
                type: document.querySelector(domStrings.type).value, // inc or exp
                descr: document.querySelector(domStrings.description).value,
                value: document.querySelector(domStrings.value).value
            };
        },
        domStrings
    };

})();

// global app controller
var controller = (function() {


    var setupEventListeners = function() {
        var dom = uiController.domStrings; // contain all strings for the selectors!!!!
        document.querySelector(dom.add).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function(e){
            if (e.keyCode === 13 || e.which === 13) {
                ctrlAddItem();
            }
        });
    }
    
    var ctrlAddItem = function() {

        console.log(uiController.getInput());
        // 1. get the field input data
        // 2. add the item to the budget controller
        // 3. add the item to the ui
        // 4. calculate the budget
        // 5. display the budget to the ui

    }

    return {
        init: function() {
            console.log("app started!");
            setupEventListeners();
        }
    }

})(budgetController, uiController);

controller.init();