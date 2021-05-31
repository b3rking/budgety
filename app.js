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

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    }

    return {
        addItem: function(type, id, description, value) {
            var newItem;

            // create new id
            var id = data.allItems[type].length + 1;
            // create a item
            if (type === 'exp') {
                newItem = new Expense(id, description, value);
            } else if (type === 'inc') {
                newItem = new Income(id, description, value);
            }
            // add the item in the datastructure
            data.allItems[type].push(newItem);

            return newItem;
        }
    };

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
        var inputs, newItem;
        // 1. get the field input data
        inputs = uiController.getInput();
        // 2. add the item to the budget controller
        newItem = budgetController.addItem(inputs.type, 1, inputs.descr, inputs.value);
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