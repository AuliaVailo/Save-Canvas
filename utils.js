function generateQRCode(nama, identitas) {
    var stringToEnc = nama + "::" + identitas
    var encString = btoa(stringToEnc)
    var modal = new bootstrap.Modal(document.getElementById('exampleModal'), {
        keyboard: false
      })
    var namaQr = document.getElementById('namaQr')
    var identitasQr = document.getElementById('identitasQr')
    var qrCodeDom = document.getElementById('qrcode')

    namaQr.innerHTML = nama
    identitasQr.innerHTML = identitas
    document.getElementById("qrcode").innerHTML = ""
    new QRCode(document.getElementById("qrcode"), encString);
    modal.show()
}

function saveAndClose(jenis) {
    console.log(jenis)
    if (jenis === 'image') {
        html2canvas(document.getElementById('qrcode')).then(function(canvas) {
            console.log(canvas);
            saveToCanvas(canvas.toDataURL(), 'myQrCodeBukuTamu.png');
        });
    }

    if (jenis === 'pdf') {
        html2canvas(document.getElementById('qrcode')).then(function(canvas) {
            console.log(canvas);
            saveToPDF(canvas.toDataURL());
        });
    }

    if (jenis === 'email') {
        sendToEmail()
    }
}

function saveToCanvas(uri, filename) {
    console.log('processing')
    var link = document.createElement('a');

    if (typeof link.download === 'string') {

        link.href = uri;
        link.download = filename;

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);

    } else {

        window.open(uri);

    }

    window.close()
}

function saveToPDF(imageData) {
    console.log(imageData)
    var doc = new jsPDF()

    doc.setFontSize(40)
    doc.text(35, 25, 'QRCode Buku Tamu')
    doc.addImage(imageData, 'JPEG', 15, 40, 180, 160)

    doc.save( 'QRCode Buku Tamu' + '.pdf')

    window.close()
}

function sendToEmail() {
    Email.send({
        Host: "smtp.gmail.com",
        Username : "Your Gmail Address",
        Password : "Your Gmail Password",
        To : 'recipient’s email address',
        From : "sender’s email address",
        Subject : "email subject",
        Body : "email body",
        Attachments : [
            {
                name : "smtpjs.png",
                path:"https://networkprogramming.files.wordpress.com/2017/11/smtpjs.png"
            }]
        }).then(
            message => alert("mail sent successfully")
        );
    
    window.close()
}