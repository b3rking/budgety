//BUDGET CONTROLLER
var budgetController = (function() {
    
    var Expence = function(id, description, value) {
       this.id = id;
       this.description = description;
       this.value = value;
    };

    Expence.prototype.alert = function() {
        return this.id;
    }
    
    var Income = function(id, description, value) {
       this.id = id;
       this.description = description;
       this.value = value;
    };
    
    var calculateTotal = function(type) {
        
        var sum = 0;
        data.allItems[type].forEach(function(cur) {
            sum = sum + cur.value;
        });
        data.totals[type] = sum;
        
    };
    
    var data = {
        allItems: {
            inc: [],
            exp: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
    };

    return {
        addItem: function(type, des, val) {
            
            var newItem, ID;
            if(data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;    
            } else {
                ID = 0;
            }
            
            if (type === 'exp') {
                
                newItem = new Expence(ID, des, val);
                
            } else if (type === 'inc') {
                
                newItem = new Income(ID, des, val);
                
            }
            data.allItems[type].push(newItem);
            
            return newItem;
        },
        
        deleteItem: function() {
            
            
            
        },
        
        calculateBudget: function() {
        
            // calculate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');
            // calculate the budget: income - expenses
            
            data.budget = data.totals.inc - data.totals.exp;
            // calculate percentage of the income we spent
            
            if(data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            }
            else {
                data.percentage = -1;
            }
            
        },
        
        getBudget: function() {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            }
        },
        
        testing: function() {
            console.log(data);
        },
        
    }

})();


// UI CONTROLLER
var uiController = (function() {
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expenceContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentage: '.budget__expenses--percentage',
        container: '.container'
    }
    
    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseInt(document.querySelector(DOMstrings.inputValue).value)
            }
        },
        
        addListItem: function(obj, type) {
            
            var html, newhtml, element;
            // create some html with some placeholder
            
            if (type === 'inc') {
                
                element = DOMstrings.incomeContainer;
                
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } 
            
            else if (type === 'exp') {
                
                element = DOMstrings.expenceContainer;
                
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            
            // remplace the placeholder text with some actual data
            
            newhtml = html.replace('%id%', obj.id);
            newhtml = newhtml.replace('%description%', obj.description);
            newhtml = newhtml.replace('%value%', obj.value);
            
            // insert the html to the dom
            
            document.querySelector(element).insertAdjacentHTML('beforeend', newhtml);
            
        },
        
        clearFields: function() {
            
            var fields, fieldsArr;
            
            fields = document.querySelectorAll(DOMstrings.inputDescription + ', '+ DOMstrings.inputValue);
            fieldsArr = Array.prototype.slice.call(fields);
            
            fieldsArr.forEach(function(current, index, array) {
                current.value = "";
            });
            
            fieldsArr[0].focus();
        },
        
        updateBudget: function(obj) {
            
            document.querySelector(DOMstrings.budgetLabel).textContent = obj.value;
            document.querySelector(DOMstrings.incomeLabel).textContent = obj.value;
            
        },
        
        displayBudget: function(obj) {
            
            document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
            document.querySelector(DOMstrings.expensesLabel).textContent = obj.totalExp;
            document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
            
            
            if(obj.percentage > 0) {
                document.querySelector(DOMstrings.percentage).textContent = obj.percentage+'%';
            }
            else {
                document.querySelector(DOMstrings.percentage).textContent = '--';
            }
            
        },
        
        getDomStrings: function() {
            return DOMstrings;
        }
    }
    
})();




//GLOBAL CONTROLLER
var controller = (function(budgetCrtl, uiCtrl) {
  
    var setupEventListerners = function() {
        document.addEventListener('keypress', function(e) {
            
            if (e.keyCode === 13 || e.which === 13) {
                ctrlAddItem();
            }
        });
        document.querySelector(dom.inputBtn).addEventListener('click', ctrlAddItem);
        
        document.querySelector(dom.container).addEventListener('click', ctrlDeleteItem);
    };

    
    var updateBudget = function() {
        
        // 1.calculate the budget
        budgetCrtl.calculateBudget();
        
        
        // 2.return the budget
        var budget = budgetCrtl.getBudget();
        
        // 3.display to the UI
        uiCtrl.displayBudget(budget);
    };
    
    var dom = uiCtrl.getDomStrings(); 
    var ctrlAddItem = function() {
        
        // 1.get the field input
        var input = uiCtrl.getInput();
        
        if (input.description !== "" && !isNaN(input.value) && input.value >0) {
            // 2.add the item to the budget controller
            var newItem = budgetController.addItem(input.type, input.description, input.value);
        
            // 3.add the item to the UI
            var addUi = uiController.addListItem(newItem, input.type);
        
            // 4. clear all fields
            uiCtrl.clearFields();
            
            // 5. update the budget!
            updateBudget();
        
        }
        
    };
    
    var ctrlDeleteItem = function(Event) {
        
        var itemID, splitID, type, ID;
        itemID = Event.target.parentNode.parentNode.parentNode.parentNode;
        
        if (itemID) {
            
            splitID = itemID.split('-');
            type = splitID[0];
            ID = splitID[1];
            
            // 1. delete item in data structure
            
            // 2. delete item on UI
            
            // 3. update and show the budget
            
        }
    }
    
    return {
        init: function() {
            console.log('app has started.');
            uiCtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            });
            setupEventListerners();
        }
    }
    
    
    
    
})(budgetController, uiController);

controller.init();































