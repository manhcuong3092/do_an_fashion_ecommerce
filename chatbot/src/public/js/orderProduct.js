(function (d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) { return; }
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/messenger.Extensions.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'Messenger'));

window.extAsyncInit = function () {
  // the Messenger Extensions JS SDK is done loading 
  MessengerExtensions.getContext(facebookAppId,
    function success(thread_context) {
      // success
      // set psid to input
      $('#psid').val(thread_context.psid);
      handleClickButtonOrderProduct();
    },
    function error(err) {
      // error
      console.log('Lỗi tạo đơn hàng Amando bot with MessengerExtensions.getContext. ', err);

      //run fallback, get sender psid from url
      console.log('Run fallback handle error');
      $('#psid').val(sender_psid);
      handleClickButtonOrderProduct();
    }
  );
};

//validate inputs
function validateInputFields() {
  const EMAIL_REG = /[a-zA-Z][a-zA-Z0-9_\.]{1,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}/g;

  let email = $("#email");
  let phoneNo = $("#phoneNo");
  let name = $("#name");
  let city = $("#city");
  let address = $("#address");

  if (!email.val().match(EMAIL_REG)) {
    email.addClass("is-invalid");
    return true;
  } else {
    email.removeClass("is-invalid");
  }

  if (!phoneNo.val().match(/[0-9]{10,11}/)) {
    phoneNo.addClass("is-invalid");
    return true;
  } else {
    phoneNo.removeClass("is-invalid");
  }

  if (name.val() === "") {
    name.addClass("is-invalid");
    return true;
  } else {
    name.removeClass("is-invalid");
  }

  if (city.val() === "") {
    city.addClass("is-invalid");
    return true;
  } else {
    city.removeClass("is-invalid");
  }

  if (address.val() === "") {
    address.addClass("is-invalid");
    return true;
  } else {
    address.removeClass("is-invalid");
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
    };

    if (!check) {
      //close webview
      MessengerExtensions.requestCloseBrowser(function success() {
        // webview closed
      }, function error(err) {
        // an error occurred
        console.log("MessengerExtensions.requestCloseBrowser", err);
        window.top.close();
      });

      //send data to node.js server 
      $.ajax({
        url: `${window.location.origin}/order`,
        method: "POST",
        data: data,
        success: function (data) {
          console.log(data);
          $('#toast-body').text('Đặt hàng thành công');
          $('#toast-body').addClass('text-success');
          $('#liveToast').removeClass('hide');
          $('#liveToast').addClass('show');
        },
        error: function (error) {
          console.log(error);
          $('#toast-body').text('Đặt hàng thất bại');
          $('#toast-body').addClass('text-danger');
          $('#liveToast').removeClass('hide');
          $('#liveToast').addClass('show');
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