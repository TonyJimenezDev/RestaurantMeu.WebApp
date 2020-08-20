using RestaurantMeu.WebApp.Models;
using RestaurantMeu.WebApp.Repositories;
using RestaurantMeu.WebApp.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace RestaurantMeu.WebApp.Controllers
{
    public class HomeController : Controller
    {
        private readonly RestaurantDBEntities _restaurantDBEntities;

        public HomeController()
        {
            _restaurantDBEntities = new RestaurantDBEntities();
        }
        public ActionResult Index()
        {
            CustomerRepo customerRepo = new CustomerRepo();
            ItemRepo itemRepo = new ItemRepo();
            PaymentTypeRepo paymentTypeRepo = new PaymentTypeRepo();

            var multiModels = new Tuple<IEnumerable<SelectListItem>, IEnumerable<SelectListItem>, IEnumerable<SelectListItem>>
                (customerRepo.GetAllCustomers(), itemRepo.GetAllItems(), paymentTypeRepo.GetAllPaymentTypes());

            return View(multiModels);
        }

        [HttpGet]
        public JsonResult GetItemPrice(int itemId)
        {
            decimal price = _restaurantDBEntities.Items.Single(model => model.ItemId == itemId).ItemPrice;
            return Json(price, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Index(OrderViewModel orderViewModel)
        {
            return Json("", JsonRequestBehavior.AllowGet);
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