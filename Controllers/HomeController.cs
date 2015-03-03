using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebUI.Models;


namespace WebUI.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Message = "Modify this template to jump-start your ASP.NET MVC application.";

            return View();
        }
         [ChildActionOnly]
        public ActionResult LeftMenu()
        {
            LeftMenuModels model = new LeftMenuModels();
            return PartialView("~/Views/Shared/_LeftMenuPartial.cshtml",model);
        }

        public ActionResult About()
        {
  
            ViewBag.Message = "Your app description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}
