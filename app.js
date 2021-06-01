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
        },data
    };

})();

// ui controller
var uiController = (function() {
    var domStrings = {
        type: '.add__type',
        description: '.add__description',
        value: '.add__value',
        add: '.add__btn',
        expencesContainer: '.expenses__list',
        incomeContainer: '.income__list'
    }
    return {
        getInput: function() {
            return {
                type: document.querySelector(domStrings.type).value, // inc or exp
                descr: document.querySelector(domStrings.description).value,
                value: parseFloat(document.querySelector(domStrings.value).value)
            };
        },
        addListItem: function(obj, type) {
            var html, newHtml, element;
            if (type === 'inc') {
                element = domStrings.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }
            else if (type === 'exp') {
                element = domStrings.expencesContainer;
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }
            
            // remplacing placeholder with the actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },
        domStrings,
        clearFields: function() {
            var fields, fieldArr;

            fields = document.querySelectorAll(domStrings.description + ", "+ domStrings.value);

            fieldArr = Array.prototype.slice.call(fields);

            fieldArr.forEach(function(current, index, array) {
                current.value = "";
            });

            fieldArr[0].focus();
        }
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

    var updateBudget = function() {
        // calculate the budget
        // return the budget
        // display the budget to the ui
    }
    
    var ctrlAddItem = function() {
        var inputs, newItem;
        // 1. get the field input data
        inputs = uiController.getInput();
        // 2. add the item to the budget controller
        newItem = budgetController.addItem(inputs.type, 1, inputs.descr, inputs.value);
        // 3. add the item to the ui
        uiController.addListItem(newItem,inputs.type);
        uiController.clearFields();
        // 4. calculate and update the budget

    }

    return {
        init: function() {
            console.log("app started!");
            setupEventListeners();
            uiController.clearFields();
        }
    }

})(budgetController, uiController);

controller.init();