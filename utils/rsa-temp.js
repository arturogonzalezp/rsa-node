function GCD(a, b) {
    do {
        c = a % b;
        a = b;
        b = c;
    } while (c != 0);
    return a;
}


function PRIME(max, p1) {
    while (true) {
        var prime = Math.floor(Math.random() * max);
        var factor = 2;
        while (factor < prime && (prime % factor) != 0) {
            factor++;
            if (factor == prime && factor != p1) return prime;
        }
    }

}

function FACTOR(n) {
    i = 2;
    output = ''; m = n;
    while (i < 10000) {
        if (n % i == 0) { output += i + ", "; n = n / i; i = 1 }
        i++;
    };
    return output;
}

function MODINV(S, L) {
    a = new Array();
    q = new Array();
    x = new Array();

    a[0] = L; a[1] = S; i = 0;
    while (a[i] % a[i + 1] != 0) {
        a[i + 2] = a[i] % a[i + 1];
        q[i + 1] = Math.floor(a[i] / a[i + 1]);
        i++;
    }
    n = i + 1; x[n] = 0; x[n - 1] = 1;
    for (j = n - 2; j >= 0; j--)  x[j] = x[j + 1] * q[j + 1] + x[j + 2];
    if (a[n] != 1) return "No Inverse"
    if ((x[1] * a[0]) > (x[0] * a[1])) return L - x[0]
    else return x[0]
}


function PHI(n) {
    phi = n;
    factor = 2;
    while (factor <= n) {
        if (n % factor == 0) {
            n /= factor;
            while (n % factor == 0) { n /= factor; } //takes out multiple factors
            phi = phi * ((factor - 1) / (factor));
        }
        factor++;
    }

    return (phi);
}


var e;

function GETKEY(phi) {
    var e = 3;
    while (GCD(phi, e) != 1) {
        e += 2;
    }
    return (e)
}

function MODEXP(a, n, m) {
    pow = 1;
    while (n > 0) {
        if ((n % 2) == 1) {
            pow = pow * a;
        }
        a = (a * a) % m;
        n = Math.floor(n / 2);
    }
    return (pow % m)
}



var txt = "Enter Text!";
CIPHER_NUM = new Array();
function ENCODE(form) {
    pl_char = form.enc_plain_char.value;
    P_e = "";
    pl_num = ""; cl_num = ""; cl_char = "";
    pro = (form.prime1.value) * (form.prime2.value);
    e = form.e.value;
    if (pl_char == "") alert(txt);
    else {
        for (i = 0; i < pl_char.length; i++) {
            CIPHER_NUM[i] = MODEXP((pl_char.charCodeAt(i) - 97), e, pro);
            pl_num += (pl_char.charCodeAt(i) - 97) + " ";
            P_e += (pl_char.charCodeAt(i) - 97) + "^" + e + ", ";
            cl_num += CIPHER_NUM[i] + " ";
        }
    }
    form.enc_plain_num.value = pl_num;
    form.enc_cipher_num.value = cl_num;
    form.P_e.value = (P_e + " mod " + pro);
    form.dec_cipher_num.value = cl_num;
    form.C_d.value = " ";
    form.dec_plain_num.value = " ";
}

function DECODE(form) {
    var Temp = new Array();
    C_d = "";
    d = form.d.value;
    pro = (form.prime1.value) * (form.prime2.value);
    pl_num = ""; cl_num = ""; pl_char = "";
    for (i = 0; i < form.enc_plain_char.value.length; i++) {
        Temp[i] = MODEXP(CIPHER_NUM[i], d, pro);
        cl_num += (CIPHER_NUM[i]) + " ";
        pl_num += Temp[i] + " ";
        C_d += (CIPHER_NUM[i]) + "^" + d + ", ";
        pl_char += String.fromCharCode(Temp[i] + 97);
    }

    form.C_d.value = (C_d + " mod " + pro);
    form.P_e.value = "";
    form.dec_plain_char.value = pl_char;
    form.dec_plain_num.value = pl_num;
    form.dec_cipher_num.value = cl_num;
    form.enc_cipher_num.value = "";

}