const bottomMsg = (msg) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "center",
    showConfirmButton: false,
    timer: 2000,
  });
  Toast.fire({ title: msg, icon: "error" });
}
const doFetch = async (code) => {
  const data = await (await fetch("/qr", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({ code }),
  })).json();
  if(data.code === "OK") location.href = "/course"
  else {
    bottomMsg(data.message);
    setTimeout(startScan, 3000);
  }
}

const startScan = () => {
  const video = document.createElement("video");
  const canvasElement = document.getElementById("canvas");
  const canvas = canvasElement.getContext("2d");

  const drawLine = (begin, end, color) => {
    canvas.beginPath();
    canvas.moveTo(begin.x, begin.y);
    canvas.lineTo(end.x, end.y);
    canvas.lineWidth = 4;
    canvas.strokeStyle = color;
    canvas.stroke();
  }
  const tick = () => {
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      // 읽어들이는 비디오 화면의 크기
      canvasElement.height = 400;
      canvasElement.width = 400;
      canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
      let imageData = canvas.getImageData(
          0,
          0,
          canvasElement.width,
          canvasElement.height
      );
      let code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: "dontInvert",
      });
      const waitText = document.querySelector(".wait-text");
      waitText.classList.add("hidden");

      // QR코드 인식에 성공한 경우
      if (code) {
        // 인식한 QR코드의 영역을 감싸는 사용자에게 보여지는 테두리 생성
        drawLine(
            code.location.topLeftCorner,
            code.location.topRightCorner,
            "#FF0000"
        );
        drawLine(
            code.location.topRightCorner,
            code.location.bottomRightCorner,
            "#FF0000"
        );
        drawLine(
            code.location.bottomRightCorner,
            code.location.bottomLeftCorner,
            "#FF0000"
        );
        drawLine(
            code.location.bottomLeftCorner,
            code.location.topLeftCorner,
            "#FF0000"
        );
        // QR코드 메시지 출력
        return doFetch(code.data);
      }
    }
    requestAnimationFrame(tick);
  }
  // 카메라 사용시
  navigator.mediaDevices
    .getUserMedia({ video: { facingMode: "environment" } })
    .then(function (stream) {
      video.srcObject = stream;
      video.setAttribute("playsinline", true); // iOS 사용시 전체 화면을 사용하지 않음을 전달
      video.play();
      requestAnimationFrame(tick);
    });
}
startScan();
