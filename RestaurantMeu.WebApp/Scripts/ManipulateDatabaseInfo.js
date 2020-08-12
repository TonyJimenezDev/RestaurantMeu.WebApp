/* Jquery dependent*/

$(document).ready(function () {
    $("#Item").val(0);
    $("#Item").change(function () { /* Drop down item name */
        var itemId = $("#Item").val();
        $("#txtQuantity").val(0);
        $("#txtTotal").val("0.00");
        GetItemPrice(itemId);
    });
    $("input[type=text]").change(function () { /*Fires off input type=text */
        CalculateTax();
        CalculateSubTotal();
    })
    $("#txtQuantity").change(function () { /*Fires off on Quantity */
        CalculateTax();
        CalculateSubTotal();
    })
    $("#btnAddToList").click(function () {
        AddToTheItemList();
    })
});

function AddToTheItemList() {
    var tblItemList = $("#tblRestaurantItemList");
    var unitPrice = $("#txtPrice").val();
    var quantity = $("#txtQuantity").val();
    var discount = $("#txtDiscount").val();
    var itemId = $("#Item").val(); /* Hidden field */
    var itemName = $("#Item option:selected").text();
    var Total = (unitPrice * quantity) - discount;

    var itemList = "<tr><td hidden>" +
        itemId + "</td><td>" +
        itemName + "</td><td>" +
        unitPrice + "</td><td>" +
        quantity + "</td><td>" +
        parseFloat(discount).toFixed(2) + "</td><td>" +
        parseFloat(Total).toFixed(2) + "</td><td> <input type='button' value='Remove' name='remove' class='btn btn-danger' onclick='RemoveItem(this)' /> </td></tr>";

    tblItemList.append(itemList);
    ResetItem();
}


function RemoveItem(itemId) {
    $(itemId).closest('tr').remove(); /* Remove closes tr tag */
}

function ResetItem() {
    $("#txtPrice").val('');
    $("#txtQuantity").val('');
    $("#txtDiscount").val('0.00');
    $("#Item").val(0);
    $("#txtTotal").val("0.00");
}

function CalculateSubTotal() { 
    var unitPrice = $("#txtPrice").val();
    var quantity = $("#txtQuantity").val();
    var discount = $("#txtDiscount").val();
    var tax = (unitPrice * quantity) * .0825;

    var Total = (unitPrice * quantity) - discount + tax;
    if (Total <= 0) {
        $("#txtTotal").val("0.00")
    }
    else {
        $("#txtTotal").val(Total.toFixed(2))
    }
}

function CalculateTax() {
    var unitPrice = $("#txtPrice").val();
    var quantity = $("#txtQuantity").val();
    var tax = (unitPrice * quantity) * .0825;
    $("#txtTax").val(tax.toPrecision(2));
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
