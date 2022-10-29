(function (d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) { return; }
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/messenger.Extensions.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'Messenger'));

window.extAsyncInit = function () {
  // the Messenger Extensions JS SDK is done loading 
  MessengerExtensions.getContext('3339980812901528',
    function success(thread_context) {
      // success
      // set psid to input
      $('#psid').val(thread_context.psid);
      handleClickButtonOrderProduct();
    },
    function error(err) {
      // error
      console.log('Lỗi tạo đơn hàng Amando bot. ', err)
    }
  );
};

//validate inputs
function validateInputFields() {
  const EMAIL_REG = /[a-zA-Z][a-zA-Z0-9_\.]{1,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}/g;

  let email = $("#email");
  let phoneNumber = $("#phoneNumber");

  if (!email.val().match(EMAIL_REG)) {
    email.addClass("is-invalid");
    return true;
  } else {
    email.removeClass("is-invalid");
  }

  if (phoneNumber.val() === "") {
    phoneNumber.addClass("is-invalid");
    return true;
  } else {
    phoneNumber.removeClass("is-invalid");
  }

  return false;
}


function handleClickButtonOrderProduct() {
  $("#btnOrder").on("click", function (e) {
    let check = validateInputFields(); //return true or false

    const price = parseInt($("#price").text());
    const quantity = $('#quantity').val();
    const itemsPrice = price * quantity;
    const shippingPrice = itemsPrice >= 500000 ? 0 : 30000

    const orderItems = [{
      product: $('#productId').val(),
      size: $('#size').val(),
      color: $('#color').val(),
      quantity: quantity,
      price: parseInt($('#price').text())
    }]

    const shippingInfo = {
      name: $("#name").val(),
      email: $("#email").val(),
      phoneNo: $("#phoneNo").val(),
      city: $('#city').val(),
      address: $('#address').val(),
    }

    let data = {
      psid: $("#psid").val(),
      shippingInfo,
      orderItems,
      itemsPrice: itemsPrice,
      shippingPrice: shippingPrice,
      totalPrice: itemsPrice + shippingPrice,
      paymentStatus: false,
      paymentType: 'Thanh toán khi nhận hàng',
      user: null
    };

    console.log(data);
    return
    if (!check) {
      //close webview
      MessengerExtensions.requestCloseBrowser(function success() {
        // webview closed
      }, function error(err) {
        // an error occurred
        console.log(err);
      });

      //send data to node.js server 
      $.ajax({
        url: `${window.location.origin}/order-ajax`,
        method: "POST",
        data: data,
        success: function (data) {
          console.log(data);
        },
        error: function (error) {
          console.log(error);
        }
      })
    }
  });
}

$('#quantity').change(function () {
  const price = parseInt($("#price").text());
  const quantity = $('#quantity').val();
  $('#totalPrice').text((price * quantity).toLocaleString('vi-VN') + '₫')
})