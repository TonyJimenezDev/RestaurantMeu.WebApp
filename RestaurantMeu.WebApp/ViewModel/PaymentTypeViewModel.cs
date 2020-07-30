using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace RestaurantMeu.WebApp.ViewModel
{
    public class PaymentTypeViewModel
    {
        [Required]
        public int PaymentTypeId { get; set; }
        [Required]
        public string PaymentTypeName { get; set; }

    }
}