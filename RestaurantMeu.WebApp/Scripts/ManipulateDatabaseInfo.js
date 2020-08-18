/* Jquery dependent */

$(document).ready(function () {
    $("#item").val(0);
    $("#txtTotal").val("0.00");
  
    $("#item").change(function () { /* Drop down item name */
        var itemId = $("#item").val(); 
        $("#txtQuantity").val(0); 
        GetItemPrice(itemId);
    });
    $("input[type=number]").change(function () { 
        CalculateSubTotal();
    })
    $("#txtPaymentAmount, #txtReturnTotal").change(function () { 
        CalculateBalance();
        NotificationAlerts();
    })
    $("#btnAddToList").click(function () { 
        AddToTheItemList();
    })
});


function AddToTheItemList() {
    var tblItemList = $("#tblRestaurantItemList");
    var unitPrice = parseFloat($("#txtPrice").val());
    var quantity = parseFloat($("#txtQuantity").val());
    var discount = parseFloat($("#txtDiscount").val());
    var itemId = $("#item").val(); /* Hidden field */
    var itemName = $("#item option:selected").text();
    var tax = parseFloat($("#txtTax").val());
    var total = parseFloat($("#txtTotal").val());
    var checkoutBtn = $("#btnCheckOut");
    var count = 0;

    if (isNaN(discount)) discount = 0.00;
    else if (discount >= unitPrice) discount = unitPrice; /* Sets discount to unitPrice if over the unit price*/
    if (isNaN(quantity)) quantity = 0;

    var itemList = "<tr><td hidden>" + itemId + "</td>" +
        "<td>" + itemName + "</td>" +
        "<td>" + unitPrice.toFixed(2) + "</td>" +
        "<td>" + quantity + "</td>" +
        "<td>" + discount.toFixed(2) + "</td>" +
        "<td>" + tax.toFixed(2) + "</td/>" +
        "<td>" + total.toFixed(2) + "</td>" +
        "<td> <input type='button' value='Remove' name='remove' class='btn btn-danger' onclick='RemoveItemOnClick(this)' /> </td></tr>";

    $("#tblRestaurantItemList").find("tr:gt(0)").each(function () {
        if ($(this).find("td:eq(1)").text() == itemName && count < 2) {
            count++;
        } 
    });

    if (quantity > 0 && itemName != "") {
        if (count < 1) {
            checkoutBtn.removeAttr("disabled");
            tblItemList.append(itemList);
        } else {
            UpdateItemList(quantity, discount, tax, total);
        }
    }
    FinalItemTotal();
    NotificationAlerts();
    ResetItems();
}

function UpdateItemList(quantity, discount, tax, total) {
    var itemName = $("#item option:selected").text();
    $("#tblRestaurantItemList").find("tr:gt(0)").each(function () {
        if ($(this).find("td:eq(1)").text() == itemName) {
            var listQuantity = parseFloat($(this).find("td:eq(3)").text()); /* equal to index td in tr = quantity in list */
            var listDiscount = parseFloat($(this).find("td:eq(4)").text()); /* equal to index td in tr = discount in list*/
            var listTax = parseFloat($(this).find("td:eq(5)").text()); /* equal to index td in tr = tax in list*/
            var listSubTotal = parseFloat($(this).find("td:eq(6)").text()); /* equal to index td in tr = total in list*/
            quantity = quantity + listQuantity;
            discount = discount + listDiscount;
            tax = tax + listTax;
            total = total + listSubTotal;

            parseFloat($(this).find("td:eq(3)").text(quantity));
            parseFloat($(this).find("td:eq(4)").text(discount.toFixed(2)));
            parseFloat($(this).find("td:eq(5)").text(tax.toFixed(2)));
            parseFloat($(this).find("td:eq(6)").text(total.toFixed(2)));
        }
    });
}

function CalculateBalance() {
    var finalAmount = $("#txtPaymentTotal").val();
    var paymentAmount = $("#txtPaymentAmount").val();
    var returnAmount = $("#txtReturnTotal").val();
    var balanceAmount = parseFloat(finalAmount) - parseFloat(paymentAmount) + parseFloat(returnAmount);
    $("#txtBalanceAmount").val(parseFloat(balanceAmount).toFixed(2)); /* needs to be a number */

    if (parseFloat(balanceAmount) == 0) $("#btnPayment").removeAttr("disabled");
    else $("#btnPayment").attr("disabled", "disabled");
}

function FinalItemTotal() {
    var finalTotal = 0.00;
    var finalTax = 0.00;
    $("#tblRestaurantItemList").find("tr:gt(0)").each(function () {
        var tax = parseFloat($(this).find("td:eq(5)").text()); /* equal to index td in tr = tax */
        var subTotal = parseFloat($(this).find("td:eq(6)").text()); /* equal to index td in tr = total */
        finalTotal = finalTotal + subTotal;
        finalTax = finalTax + tax;
    });
    $("#txtFinalTax").val(parseFloat(finalTax).toFixed(2));
    $("#txtFinalTotal").val(parseFloat(finalTotal).toFixed(2));
    $("#txtPaymentTotal").val(parseFloat(finalTotal).toFixed(2));
    $("#txtBalanceAmount").val(parseFloat(finalTotal).toFixed(2));
}

function RemoveItemOnClick(itemId) {
    var finalTax = parseFloat($("#txtFinalTax").val());
    var finalTotal = parseFloat($("#txtFinalTotal").val()); 
    var tax = parseFloat($(itemId).closest("tr").find("td:eq(5)").text()); /* equal to index td in tr = tax */
    var total = parseFloat($(itemId).closest("tr").find("td:eq(6)").text()); /* equal to index td in tr = total */
    
    finalTax = finalTax - tax;
    finalTotal = finalTotal - total;

    $("#txtFinalTax").val(finalTax.toFixed(2));
    $("#txtFinalTotal").val(finalTotal.toFixed(2));
    $("#txtPaymentTotal").val(parseFloat(finalTotal).toFixed(2));
    $("#txtBalanceAmount").val(parseFloat(finalTotal).toFixed(2));
    $(itemId).closest('tr').remove(); 
    var rowCount = $('#tblRestaurantItemList').find('tr').length;
    if (rowCount == 1) $("#btnCheckOut").attr("disabled", "disabled");
}

function ResetItems() {
    if ($("#txtQuantity").val() > 0 && $("#item").val() > 0) {
        $("#item").val(0);
        $("#txtQuantity").val(0);
        $("#txtPrice").val('');
        $("#txtDiscount").val('0.00');
        $("#txtTotal").val("0.00");
        $("#txtTax").val("0.00");
    }
}

function CalculateSubTotal() { /* Tax included */
    var unitPrice = $("#txtPrice").val();
    var quantity = $("#txtQuantity").val();
    var discount = $("#txtDiscount").val();
    var tax = $("#txtTax").val();
    if (quantity > 0) {
        tax = ((unitPrice * quantity) - discount) * .0825;
        if (parseFloat(tax) <= 0.00) $("#txtTax").val("0.00");
        else $("#txtTax").val(tax.toFixed(2));
    }

    var Total = (unitPrice * quantity) - discount + tax;
    if (Total <= 0) $("#txtTotal").val("0.00")
    else $("#txtTotal").val(Total.toFixed(2))
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

function NotificationAlerts() {
    var itemName = $("#item option:selected").text();
    var quantity = parseFloat($("#txtQuantity").val());
    var finalTotal = $("#txtFinalTotal").val();
    var balanceAmount = $("#txtBalanceAmount").val();
    if ($("#divPayment").is(":hidden")) {
        if (itemName == "") $("#item").notify("Item cannot be empty");
        if (quantity < 1 || isNaN(quantity)) $("#txtQuantity").notify("Quantity cannot be 0")
    } else {
        if (balanceAmount == "") $("#txtBalanceAmount").val(finalTotal); 
    }

}
