using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebUI.Areas.Logistic.Controllers
{
    public class HomeController : WebUI.Controllers.BaseController
    {
        //
        // GET: /Logistic/Home/

        public ActionResult Index()
        {
            return View();
        }

    }
}
