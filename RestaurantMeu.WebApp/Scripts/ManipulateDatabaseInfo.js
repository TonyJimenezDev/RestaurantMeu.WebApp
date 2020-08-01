/* Jquery dependent*/

$(document).ready(function () {
    $("#Item").val(0);
    $("#Item").change(function () { /* Drop down item name */
        var itemId = $("#Item").val();
        GetItemPrice(itemId);
        $("#txtQuantity").val(0);
        $("#txtTotal").val(0);
    });
    $("input[type=text]").change(function () { /*Fires off input type=text */
        CalculateSubTotal();
    })
    $("#txtQuantity").change(function () { /*Fires off on Quantity */
        CalculateSubTotal();
    })
});

function CalculateSubTotal() { 
    var UnitPrice = $("#txtPrice").val();
    var Quantity = $("#txtQuantity").val();
    var Discount = $("#txtDiscount").val();

    var Total = (UnitPrice * Quantity) - Discount;
    if (Discount >= Total) {
        $("#txtTotal").val("0.00")
    }
    else {
        $("#txtTotal").val(Total.toFixed(2))
    }
}
function GetItemPrice(itemId) {
    $.ajax({
        async: true,
        type: 'GET',
        dataType: 'Json',
        contentType: 'application/json; charset=utf-8',
        data: { itemId: itemId },
        url: "/home/getItemPrice",
        success: function (data) {
            $("#txtPrice").val(parseFloat(data).toFixed(2)) /* Adds value to price Text box */
        },
        error: function () {
            alert("Issue getting price");
        }
    });
}
