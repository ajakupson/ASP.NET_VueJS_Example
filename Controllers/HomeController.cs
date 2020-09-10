using Microsoft.AspNetCore.Mvc;

namespace ASPNET_VueJS_Example.Controllers
{
    public class HomeController : Controller
    {
        //[HttpGet("home")]
        //[Route("home")]
        public IActionResult Home()
        {
            return View("~/Views/Home.cshtml");
        }
    }
}
