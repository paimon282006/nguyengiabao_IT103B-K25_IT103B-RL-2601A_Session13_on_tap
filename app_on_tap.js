let bookings = [
  {
    bookingCode: "CIN-001",
    customerName: "Nguyễn Văn An",
    movieTitle: "Ánh Trăng Cuối Phố",
    ticketCount: 2,
    pricePerTicket: 90000,
    totalAmount: 194400
  },
  {
    bookingCode: "CIN-002",
    customerName: "Trần Thị Bình",
    movieTitle: "Biệt Đội Sao Băng",
    ticketCount: 4,
    pricePerTicket: 90000,
    totalAmount: 349920
  },
  {
    bookingCode: "CIN-003",
    customerName: "Lê Minh Châu",
    movieTitle: "Mùa Hè Rực Lửa",
    ticketCount: 6,
    pricePerTicket: 110000,
    totalAmount: 641520
  }
];

function normalizeName(str) {
  if (str === null || str === undefined || str === "") {
    return "";
  }
  let trimmed = str.trim();
  let words = trimmed.split(" ");
  let result = "";
  for (let i = 0; i < words.length; i++) {
    if (words[i] !== "") {
      let firstChar = words[i].charAt(0).toUpperCase();
      let restChar = words[i].slice(1).toLowerCase();
      let capitalized = firstChar + restChar;
      if (result === "") {
        result = capitalized;
      } else {
        result = result + " " + capitalized;
      }
    }
  }
  return result;
}

function validateBookingCode(code) {
  if (code === null || code === undefined) {
    return "Hủy thao tác";
  }
  let cleaned = code.trim();
  if (cleaned === "") {
    return "Chưa nhập mã đặt vé";
  }
  if (cleaned.length < 6) {
    return "Độ dài nhỏ hơn 6 ký tự";
  }
  let upperCode = cleaned.toUpperCase();
  if (upperCode.indexOf("CIN-") !== 0) {
    return "Sai tiền tố \"CIN-\"";
  }
  for (let i = 0; i < cleaned.length; i++) {
    if (cleaned[i] === " ") {
      return "Chứa khoảng trắng";
    }
  }
  if (findBookingIndex(upperCode) !== -1) {
    return "Mã đặt vé đã tồn tại";
  }
  return "";
}

function findBookingIndex(code) {
  if (code === null || code === undefined || code === "") {
    return -1;
  }
  let targetCode = code.trim().toUpperCase();
  for (let i = 0; i < bookings.length; i++) {
    if (bookings[i].bookingCode.toUpperCase() === targetCode) {
      return i;
    }
  }
  return -1;
}

function inputPositiveInteger(message) {
  while (true) {
    let input = prompt(message);
    if (input === null) {
      return null;
    }
    let trimmed = input.trim();
    if (trimmed === "") {
      continue;
    }
    let number = Number(trimmed);
    if (!isNaN(number) && number > 0) {
      return number;
    }
  }
}

function calculateTotal(ticketCount, pricePerTicket) {
  let baseCost = ticketCount * pricePerTicket;
  let discount = 0;
  if (ticketCount >= 4) {
    discount = Math.round(baseCost * 0.1);
  }
  let serviceFee = Math.round((baseCost - discount) * 0.08);
  let totalAmount = baseCost - discount + serviceFee;
  return {
    baseCost: baseCost,
    discount: discount,
    serviceFee: serviceFee,
    totalAmount: totalAmount
  };
}

function displayBookings(list) {
  if (list === null || list === undefined || list.length === 0) {
    alert("Danh sách đơn đặt vé trống");
    return;
  }
  let totalRevenue = 0;
  let text = "DANH SÁCH ĐƠN ĐẶT VÉ:\n\n";
  for (let i = 0; i < list.length; i++) {
    let item = list[i];
    let stt = i + 1;
    totalRevenue = totalRevenue + item.totalAmount;
    text += stt + ". " + item.bookingCode + " - " + item.customerName + " - " + item.movieTitle + "\n";
    text += "   SL: " + item.ticketCount + " | Giá: " + item.pricePerTicket + " | Tổng TT: " + item.totalAmount + "\n\n";
  }
  text += "Tổng: " + list.length + " đơn đặt vé – Doanh thu: " + totalRevenue;
  alert(text);
}

function handleDisplayBookings() {
  if (bookings.length === 0) {
    alert("Danh sách đơn đặt vé trống");
    return;
  }
  displayBookings(bookings);
}

function handleAddBooking() {
  let rawCode = prompt("Nhập mã đặt vé (ví dụ: CIN-004):");
  if (rawCode === null) {
    alert("Hủy thao tác thêm đơn đặt vé.");
    return;
  }
  let validationError = validateBookingCode(rawCode);
  if (validationError !== "") {
    alert(validationError);
    return;
  }
  let bookingCode = rawCode.trim().toUpperCase();

  let rawCustomerName = prompt("Nhập tên khách hàng:");
  if (rawCustomerName === null) {
    alert("Hủy thao tác thêm đơn đặt vé.");
    return;
  }
  let normalizedCustomer = normalizeName(rawCustomerName);
  if (normalizedCustomer === "") {
    alert("Tên khách hàng không được để trống.");
    return;
  }

  let rawMovieTitle = prompt("Nhập tên phim:");
  if (rawMovieTitle === null) {
    alert("Hủy thao tác thêm đơn đặt vé.");
    return;
  }
  let normalizedMovie = normalizeName(rawMovieTitle);
  if (normalizedMovie === "") {
    alert("Tên phim không được để trống.");
    return;
  }

  let ticketCount = inputPositiveInteger("Nhập số vé (số nguyên > 0):");
  if (ticketCount === null) {
    alert("Hủy thao tác thêm đơn đặt vé.");
    return;
  }

  let pricePerTicket = inputPositiveInteger("Nhập giá mỗi vé (VNĐ):");
  if (pricePerTicket === null) {
    alert("Hủy thao tác thêm đơn đặt vé.");
    return;
  }

  let costDetails = calculateTotal(ticketCount, pricePerTicket);

  let newBooking = {
    bookingCode: bookingCode,
    customerName: normalizedCustomer,
    movieTitle: normalizedMovie,
    ticketCount: ticketCount,
    pricePerTicket: pricePerTicket,
    totalAmount: costDetails.totalAmount
  };

  bookings.push(newBooking);

  alert("THÊM ĐƠN ĐẶT VÉ THÀNH CÔNG!\n\n" +
    "Mã đặt vé     : " + newBooking.bookingCode + "\n" +
    "Khách hàng    : " + newBooking.customerName + "\n" +
    "Tên phim      : " + newBooking.movieTitle + "\n" +
    "Số vé         : " + newBooking.ticketCount + "\n" +
    "Giá mỗi vé    : " + newBooking.pricePerTicket + "\n" +
    "Chi phí cơ sở : " + costDetails.baseCost + "\n" +
    "Giảm giá      : " + costDetails.discount + "\n" +
    "Phí dịch vụ   : " + costDetails.serviceFee + "\n" +
    "Tổng thanh toán: " + costDetails.totalAmount);
}

function handleUpdateBooking() {
  let rawCode = prompt("Nhập mã đặt vé cần cập nhật:");
  if (rawCode === null) {
    alert("Đã hủy cập nhật.");
    return;
  }
  let targetCode = rawCode.trim().toUpperCase();
  let index = findBookingIndex(targetCode);

  if (index === -1) {
    alert("Không tìm thấy đơn đặt vé có mã " + targetCode);
    return;
  }

  let currentBooking = bookings[index];
  let oldTotal = currentBooking.totalAmount;

  let newTicketCount = inputPositiveInteger("Nhập số vé mới (số nguyên > 0):");
  if (newTicketCount === null) {
    alert("Đã hủy cập nhật. Tổng thanh toán giữ nguyên: " + oldTotal);
    return;
  }

  let newPricePerTicket = inputPositiveInteger("Nhập giá mỗi vé mới (VNĐ):");
  if (newPricePerTicket === null) {
    alert("Đã hủy cập nhật. Tổng thanh toán giữ nguyên: " + oldTotal);
    return;
  }

  let newCostDetails = calculateTotal(newTicketCount, newPricePerTicket);

  currentBooking.ticketCount = newTicketCount;
  currentBooking.pricePerTicket = newPricePerTicket;
  currentBooking.totalAmount = newCostDetails.totalAmount;

  alert("Cập nhật thành công!\nTổng thanh toán cũ: " + oldTotal + "\nTổng thanh toán mới: " + currentBooking.totalAmount);
}

function handleDeleteBooking() {
  let rawCode = prompt("Nhập mã đặt vé cần xóa:");
  if (rawCode === null) {
    alert("Đã hủy thao tác xóa.");
    return;
  }
  let targetCode = rawCode.trim().toUpperCase();
  let index = findBookingIndex(targetCode);

  if (index === -1) {
    alert("Không tìm thấy đơn đặt vé có mã " + targetCode);
    return;
  }

  let confirmVal = prompt("Bạn có chắc chắn muốn xóa đơn " + targetCode + " không? Nhập 'Y' hoặc 'y' để xác nhận:");
  if (confirmVal === null) {
    alert("Đã hủy thao tác xóa, còn " + bookings.length + " đơn");
    return;
  }

  let trimmedConfirm = confirmVal.trim();
  if (trimmedConfirm === "Y" || trimmedConfirm === "y") {
    bookings.splice(index, 1);
    alert("Xóa thành công, còn " + bookings.length + " đơn");
  } else {
    alert("Đã hủy thao tác xóa, còn " + bookings.length + " đơn");
  }
}

function handleSearchMovie() {
  let keywordInput = prompt("Nhập từ khóa tên phim cần tìm:");
  if (keywordInput === null) {
    alert("Chưa nhập từ khóa tìm kiếm");
    return;
  }
  let keyword = keywordInput.trim().toLowerCase();
  if (keyword === "") {
    alert("Chưa nhập từ khóa tìm kiếm");
    return;
  }

  let matchedBookings = [];
  let foundCodes = "";
  for (let i = 0; i < bookings.length; i++) {
    let movieLower = bookings[i].movieTitle.toLowerCase();
    if (movieLower.indexOf(keyword) !== -1) {
      matchedBookings.push(bookings[i]);
      if (foundCodes === "") {
        foundCodes = bookings[i].bookingCode;
      } else {
        foundCodes = foundCodes + ", " + bookings[i].bookingCode;
      }
    }
  }

  if (matchedBookings.length === 0) {
    alert("Không tìm thấy đơn đặt vé phù hợp");
  } else {
    alert("Số kết quả: " + matchedBookings.length + " | Mã đặt vé tìm thấy: " + foundCodes);
    displayBookings(matchedBookings);
  }
}

function handleExitProgram() {
  alert("Cảm ơn quý khách đã sử dụng hệ thống Moonlight Cinema. Tạm biệt!");
}

function startCinemaApp() {
  let isRunning = true;
  while (isRunning) {
    let menuMessage = 
"HỆ THỐNG QUẢN LÝ ĐẶT VÉ MOONLIGHT CINEMA\n\n" +
"1. Hiển thị danh sách đơn đặt vé\n" +
"2. Thêm đơn đặt vé mới\n" +
"3. Cập nhật đơn đặt vé\n" +
"4. Xóa đơn đặt vé\n" +
"5. Tìm kiếm đơn đặt vé theo tên phim\n" +
"0. Thoát chương trình\n\n" +
"Vui lòng nhập lựa chọn của bạn (0 - 5):";

    let choice = prompt(menuMessage);

    if (choice === null) {
      alert("Lựa chọn không hợp lệ hoặc đã hủy. Vui lòng nhập số từ 0 đến 5.");
      continue;
    }

    let trimmedChoice = choice.trim();

    if (trimmedChoice === "" || isNaN(Number(trimmedChoice))) {
      alert("Lựa chọn không hợp lệ. Vui lòng nhập số nguyên từ 0 đến 5.");
      continue;
    }

    let option = Number(trimmedChoice);

    switch (option) {
      case 1:
        handleDisplayBookings();
        break;
      case 2:
        handleAddBooking();
        break;
      case 3:
        handleUpdateBooking();
        break;
      case 4:
        handleDeleteBooking();
        break;
      case 5:
        handleSearchMovie();
        break;
      case 0:
        handleExitProgram();
        isRunning = false;
        break;
      default:
        alert("Lựa chọn nằm ngoài khoảng (0 - 5). Vui lòng thử lại.");
        break;
    }
  }
}

startCinemaApp();