(function () {
    'use strict'

    // reviling moduel pattern
    const accountCreator = (function () {
        //this are hidden
        let accountName;
        let amount;
        //this is revieled
        return {
            createAccount: function (name, amt) {
                accountName = name;
                amount = amt;

                return { name: accountName, balance: amount };
            }
        }

    })();

    const accountCreated = [];

    function createNewAccount() {
        const newAccount = accountCreator.createAccount(document.getElementById('accName').value, document.getElementById('deposit').value);
        accountCreated.push(newAccount);
        document.getElementById('disResult').value = '';

        for (const account of accountCreated) {
            document.getElementById('disResult').value += `Account Name:${account.name}, Balance:${account.balance}`
        }
    }

    window.onload = function () {
        document.getElementById('createAcc').onclick = createNewAccount
    }

})();