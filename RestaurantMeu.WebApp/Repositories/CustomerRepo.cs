using RestaurantMeu.WebApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace RestaurantMeu.WebApp.Repositories
{
    public class CustomerRepo
    {
        private readonly RestaurantDBEntities restaurantDBEntities;

        public CustomerRepo()
        {
            restaurantDBEntities = new RestaurantDBEntities();
        }

        public IEnumerable<SelectListItem> GetAllCustomers()
        {
            IEnumerable<SelectListItem> selectListItems = new List<SelectListItem>();
            selectListItems = (from db in restaurantDBEntities.Customers
                               select new SelectListItem()
                               {
                                   Text = db.CustomerName,
                                   Value = db.CustomerId.ToString(),
                                   Selected = true
                               }).ToList();
            return selectListItems;
        }
    }
}