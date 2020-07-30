using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace RestaurantMeu.WebApp.ViewModel
{
    public class ItemViewModel
    {
        [Required]
        public int ItemId { get; set; }
        [Required]
        public string ItemName { get; set; }
        [Required]
        public decimal ItemPrice { get; set; }
    }
}