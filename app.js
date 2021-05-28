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