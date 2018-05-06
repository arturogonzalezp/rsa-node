const MAX_PRIME_NUMS = 10;
const generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
const generateRandomPrimeNumber = () => {
    var prime = 0;
    var i = 3;
    var n = generateRandomNumber(1, MAX_PRIME_NUMS);
    if (n == 1) {
        prime = 2;
    } else {
        for (var count = 2; count <= n;) {
            for (var c = 2; c <= i - 1; c++) {
                if (i % c == 0)
                    break;
            }
            if (c == i) {
                prime = i;
                count++;
            }
            i++;
        }
    }
    return prime;
};
const modInverse = function (e, phi) {
    e %= phi;
    for (var x = 2; x < phi; x++) {
        if ((e * x) % phi == 1) {
            return x;
        }
    }
    return 0;
}
module.exports = {
    generateKeys: (success) => {
        var keys = {
            public: {},
            private: {}
        };
        var p = 0;
        var q = 0;
        var phi = 0;
        var e_list = [3, 5];
        do {
            keys.public.e = e_list.splice(generateRandomNumber(0, e_list.length - 1), 1)[0];
            do {
                do {
                    p = generateRandomPrimeNumber();
                } while (p % keys.public.e == 1);
                do {
                    q = generateRandomPrimeNumber();
                } while (q % keys.public.e == 1 || p == q);
                keys.public.n = p * q;
            } while (keys.public.n < 26 || keys.public.n > 52);
            keys.private.n = keys.public.n;
            phi = (p - 1) * (q - 1);
            keys.private.d = modInverse(keys.public.e, phi);

        } while ((keys.private.d == 0 || keys.private.d == keys.public.e) && e_list.length > 0);

        if (keys.private.d == 0 || keys.private.d == keys.public.e) {
            console.error('d number invalid');
        }
        console.log(`\np: ${p}\nq: ${q}\nphi: ${phi}\n`);
        return keys;
    },
    getTokens: (key) => {
        var res = key.split('-');
        return {
            key: res[0],
            n: res[1]
        }
    },
    printKey: (key) => {
        return ((key['e']) ? key.e : key.d) + '-' + key.n;
    },
    encrypt: (message, key) => {
        var encryptedMessage = '';
        for (var i = 0; i < message.length; i++) {
            if (message[i] == ' ') {
                encryptedMessage += 's';
            } else {
                var m = message[i].charCodeAt(0) - 'a'.charCodeAt(0);
                var c = Math.pow(m, key.e);
                var newCode = c % key.n;
                //console.log(`${message[i]}(${m}) -> ${c} -> ${newCode}`);
                encryptedMessage += newCode;
            }
            encryptedMessage += '-';
        }
        return encryptedMessage.substring(0, encryptedMessage.length - 1);
    },
    decrypt: (message, key) => {
        var decryptedMessage = '';
        messageTokens = message.split(/-| /);
        for (var i = 0; i < messageTokens.length; i++) {
            if (messageTokens[i] == 's') {
                decryptedMessage += ' ';
            } else if (messageTokens[i] != '-') {
                var c = messageTokens[i];
                var m = Math.pow(c, key.d);
                var newCode = m % key.n;
                var newAscii = 'a'.charCodeAt(0) + newCode;
                var newChar = String.fromCharCode(newAscii);
                //console.log(`${messageTokens[i]} -> ${m} -> ${newCode} -> ${newChar}(${newAscii})`);
                decryptedMessage += newChar;
            }
        }
        return decryptedMessage;
    }
}