using System.Web.Mvc;

namespace WebUI.Areas.Logistic
{
    public class LogisticAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "Logistic";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "Logistic_default",
                "Logistic/{controller}/{action}/{id}",
                new { action = "Index", controller = "Home", id = UrlParameter.Optional },
                new string[] { "WebUI.Areas.Logistic.Controllers" }
            );
        }
    }
}
