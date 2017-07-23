using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TrainingMonitor.Models;

namespace TrainingMonitor.Controllers
{
    [Authorize]
    public class TraineeController : Controller
    {
        // GET: Trainee
        public ActionResult Index()
        {
            var m = new List<TraineeModel>
            {
                new TraineeModel
                {
                    Id = 1,
                    Firstname = "Ryan",
                    Surname = "Chen",
                    Avatar ="RyanChen.jpg",
                    Description = "Ryan has been trained with me since 2015, he is a J3 player.",
                    DateOfBirth = DateTime.ParseExact("19/10/2005", "dd/MM/yyyy", CultureInfo.InvariantCulture)
                },
                new TraineeModel
                {
                    Id = 1,
                    Firstname = "Lawrence",
                    Surname = "Chen",
                    Avatar ="LawrenceChen.jpeg",
                    Description = "Lawrence has been trained with me since 2015, he is a J2 player.",
                    DateOfBirth = DateTime.ParseExact("06/07/2008", "dd/MM/yyyy", CultureInfo.InvariantCulture)
                },
                new TraineeModel
                {
                    Id = 1,
                    Firstname = "Sam",
                    Surname = "Baker",
                    Avatar = "avatar-2.jpg",
                    Description = "Sam has been trained with me since 2015, he is a J4 player.",
                    DateOfBirth = DateTime.ParseExact("06/07/2004", "dd/MM/yyyy", CultureInfo.InvariantCulture)
                },
                new TraineeModel
                {
                    Id = 1,
                    Firstname = "Alex",
                    Surname = "Green",
                    Avatar = "avatar-1.jpg",
                    Description = "Sam has been trained with me since 2015, he is a J4 player.",
                    DateOfBirth = DateTime.ParseExact("06/07/2000", "dd/MM/yyyy", CultureInfo.InvariantCulture)
                }
            };
            return View(m);
        }

        [HttpPost]
        public ActionResult Add(TraineeModel m)
        {
            return RedirectToAction("Index");
        }
    }
}