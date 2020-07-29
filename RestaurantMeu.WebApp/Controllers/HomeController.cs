using RestaurantMeu.WebApp.Models;
using RestaurantMeu.WebApp.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace RestaurantMeu.WebApp.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            CustomerRepo customerRepo = new CustomerRepo();
            ItemRepo itemRepo = new ItemRepo();
            PaymentTypeRepo paymentTypeRepo = new PaymentTypeRepo();

            var multiModels = new Tuple<IEnumerable<SelectListItem>, IEnumerable<SelectListItem>, IEnumerable<SelectListItem>>
                (customerRepo.GetAllCustomers(), itemRepo.GetAllItems(), paymentTypeRepo.GetAllPaymentTypes());

            return View(multiModels);
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}