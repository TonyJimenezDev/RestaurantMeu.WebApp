using RestaurantMeu.WebApp.Models;
using RestaurantMeu.WebApp.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RestaurantMeu.WebApp.Repositories
{
    public class OrderRepo
    {
        private readonly RestaurantDBEntities _restaurantDBEntities;
        public OrderRepo()
        {
            _restaurantDBEntities = new RestaurantDBEntities();
        }

        public bool AddOrder(OrderViewModel orderViewModel)
        {
            Order order = new Order();
            order.CustomerId = orderViewModel.CustomerId;
            order.FinalTotal = orderViewModel.FinalTotal;
            order.OrderDate = DateTime.Now;
            order.OrderNumber = String.Format("{0:ddmmmyyyyhhmmss}", DateTime.Now);
            order.PaymentTypeId = orderViewModel.PaymentTypeId;
            _restaurantDBEntities.Orders.Add(order);
            _restaurantDBEntities.SaveChanges();
            int orderId = order.OrderId;
            foreach(OrderDetailViewModel itemDetails in orderViewModel.ListOfOrderDetailViewModels)
            {
                OrderDetail orderDetail = new OrderDetail();
                orderDetail.OrderId = orderId;
                orderDetail.Discount = itemDetails.Discount;
                orderDetail.ItemId = itemDetails.ItemId;
                orderDetail.Total = itemDetails.Total;
                orderDetail.UnitPrice = itemDetails.UnitPrice;
                orderDetail.Tax = itemDetails.Tax;
                orderDetail.ItemName = itemDetails.ItemName;
                orderDetail.Quantity = itemDetails.Quantity;
                _restaurantDBEntities.OrderDetails.Add(orderDetail);
                _restaurantDBEntities.SaveChanges();

                Transaction transaction = new Transaction();
                transaction.ItemId = itemDetails.ItemId;
                transaction.Quantity = (-1) * itemDetails.Quantity;
                transaction.TransactionDate = DateTime.Now;
                transaction.TypeId = "Restaurant";
                _restaurantDBEntities.Transactions.Add(transaction);
                _restaurantDBEntities.SaveChanges();
            }

            return true;
        }
    }
}