using RestaurantMeu.WebApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace RestaurantMeu.WebApp.Repositories
{
    public class ItemRepo
    {
        private readonly RestaurantDBEntities restaurantDBEntities;

        public ItemRepo()
        {
            restaurantDBEntities = new RestaurantDBEntities();
        }

        public IEnumerable<SelectListItem> GetAllItems()
        {
            IEnumerable<SelectListItem> selectListItems = new List<SelectListItem>();
            selectListItems = (from db in restaurantDBEntities.Items
                               select new SelectListItem()
                               {
                                   Text = db.ItemName,
                                   Value = db.ItemId.ToString(),
                                   Selected = true
                               }).ToList();
            return selectListItems;
        }
    }
}
