using System.Web.Mvc;

namespace WebUI.Areas.Manufactory
{
    public class ManufactoryAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "Manufactory";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "Manufactory_default",
                "Manufactory/{controller}/{action}/{id}",
                new { action = "Index", controller="Home", id = UrlParameter.Optional },
                new string[] { "WebUI.Areas.Manufactory.Controllers" }
            );
        }
    }
}
