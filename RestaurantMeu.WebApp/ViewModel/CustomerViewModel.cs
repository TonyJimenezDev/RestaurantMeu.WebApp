using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace RestaurantMeu.WebApp.ViewModel
{
    public class CustomerViewModel
    {
        [Required]
        public int CustomerId { get; set; }
        [Required]
        public string CustomerName { get; set; }
    }
}