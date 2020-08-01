using RestaurantMeu.WebApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace RestaurantMeu.WebApp.Repositories
{
    public class PaymentTypeRepo
    {
        private readonly RestaurantDBEntities _restaurantDBEntities;

        public PaymentTypeRepo()
        {
            _restaurantDBEntities = new RestaurantDBEntities();
        }

        public IEnumerable<SelectListItem> GetAllPaymentTypes()
        {
            IEnumerable<SelectListItem> selectListItems = new List<SelectListItem>();
            selectListItems = (from db in _restaurantDBEntities.PaymentTypes
                               select new SelectListItem()
                               {
                                   Text = db.PaymentTypeName,
                                   Value = db.PaymentTypeId.ToString(),
                                   Selected = false
                               }).ToList();
            return selectListItems;
        }
    }
}