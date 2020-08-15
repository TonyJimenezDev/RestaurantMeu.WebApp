/* Jquery dependent*/

$(document).ready(function () {
    $("#item").val(0);
    $("#item").change(function () { /* Drop down item name */
        var itemId = $("#item").val();
        $("#txtQuantity").val(0);
        $("#txtTotal").val("0.00");
        GetItemPrice(itemId);
    });
    $("input[type=text]").change(function () { /*Fires off input type=text */
        CalculateSalesTax();
        CalculateSubTotal();
    })
    $("#txtQuantity").change(function () { /*Fires off on Quantity */
        CalculateSalesTax();
        CalculateSubTotal();
    })
    $("#btnAddToList").click(function () { /*Fires off on button add */
        AddToTheItemList();
    })
});

function AddToTheItemList() {
    var tblItemList = $("#tblRestaurantItemList");
    var unitPrice = $("#txtPrice").val();
    var quantity = $("#txtQuantity").val();
    var discount = $("#txtDiscount").val();
    var itemId = $("#item").val(); /* Hidden field */
    var itemName = $("#item option:selected").text();
    var tax = $("#txtTax").val();
    var Total = (unitPrice * quantity) - discount;

    var itemList = "<tr><td hidden>" + itemId + "</td>" +
        "<td>" + itemName + "</td>" +
        "<td>" + unitPrice + "</td>" +
        "<td>" + quantity + "</td>" +
        "<td>" + parseFloat(discount).toFixed(2) + "</td>" +
        "<td>" + parseFloat(tax).toFixed(2) + "</td/>" +
        "<td>" + parseFloat(Total).toFixed(2) + "</td>" +
        "<td> <input type='button' value='Remove' name='remove' class='btn btn-danger' onclick='RemoveItem(this)' /> </td></tr>";

    tblItemList.append(itemList);
    FinalItemTotal();
    ResetItem();
}

function FinalItemTotal() {
    $("#txtFinalTotal").val("0.00");
    var finalTotal = 0.00;
    $("#tblRestaurantItemList").find("tr:gt(0)").each(function () {
        var tax = parseFloat($(this).find("td:eq(5)").text()); /* equal to index td in tr = tax */
        var subTotal = parseFloat($(this).find("td:eq(6)").text()); /* equal to index td in tr = total */
        finalTotal += tax + subTotal;
    });
    $("#txtFinalTotal").val(parseFloat(finalTotal).toFixed(2));
}

/* ToDo: remove from final price */
function RemoveItem(itemId) {
    $(itemId).closest('tr').remove(); /* Remove closes tr tag */
}

function ResetItem() {
    $("#txtPrice").val('');
    $("#txtQuantity").val('');
    $("#txtDiscount").val('0.00');
    $("#item").val(0);
    $("#txtTotal").val("0.00");
    $("#txtTax").val("0.00");
}

function CalculateSubTotal() { 
    var unitPrice = $("#txtPrice").val();
    var quantity = $("#txtQuantity").val();
    var discount = $("#txtDiscount").val();
    var tax = ((unitPrice * quantity) - discount) * .0825; 

    var Total = (unitPrice * quantity) - discount + tax;
    if (Total <= 0) {
        $("#txtTotal").val("0.00")
    }
    else {
        $("#txtTotal").val(Total.toFixed(2))
    }
}

function CalculateSalesTax() {
    var unitPrice = $("#txtPrice").val();
    var quantity = $("#txtQuantity").val();
    var discount = $("#txtDiscount").val();
    var tax = ((unitPrice * quantity) - discount) * .0825; 
    $("#txtTax").val(tax.toFixed(2));
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
