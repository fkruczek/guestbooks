import QRCode from "qrcode";

export function generateQRCode(guestbookId: number) {
  return QRCode.toCanvas(
    window.location.origin + "/create-entry/" + guestbookId,
    { errorCorrectionLevel: "H", width: 300 },
    function (err, canvas) {
      if (err) throw err;

      const container = document.getElementById("qr-code-container");
      if (!container) throw new Error("Container not found");
      container.appendChild(canvas);
    }
  );
}
