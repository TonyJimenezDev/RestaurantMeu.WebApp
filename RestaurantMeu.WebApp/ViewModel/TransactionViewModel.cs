using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RestaurantMeu.WebApp.ViewModel
{
    public class TransactionViewModel
    {
        public int TransactionId { get; set; }
        public decimal Quantity { get; set; }
        public DateTime TransactionDate { get; set; }
        public string TypeId { get; set; }
    }
}