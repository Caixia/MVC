using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebUI.Areas.Inventory.Controllers
{
    public class HomeController : WebUI.Controllers.BaseController
    {
        //
        // GET: /Inventory/Home/

        public ActionResult Index()
        {
            return View();
        }

    }
}
