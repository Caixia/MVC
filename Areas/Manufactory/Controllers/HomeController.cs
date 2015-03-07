using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebUI.Controllers;

namespace WebUI.Areas.Manufactory.Controllers
{
    public class HomeController : BaseController
    {
        //
        // GET: /Manufactory/Home/

        public ActionResult Index()
        {
            return View();
        }

    }
}
