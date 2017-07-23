using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using TrainingMonitor.Models;
using TrainingMonitor.Query;

namespace TrainingMonitor.Controllers
{
    [Authorize]
    public class TraineeController : Controller
    {
        // GET: Trainee
        public ActionResult Index()
        {
            using (var repo = new Repository())
            {
                var m = from t in repo.TraineesByUser(User.Identity.GetUserId())
                    select new TraineeModel
                    {
                        Id = t.Id,
                        Firstname = t.Firstname,
                        Surname = t.Surname,
                        Avatar = t.Avatar,
                        Description = "Ryan has been trained with me since 2015, he is a J3 player.",
                        DateOfBirth = t.DateOfBirth
                    };
                return View(m.ToList());
            }
        }

        [HttpPost]
        public ActionResult Add(TraineeModel m)
        {
            using (var repo = new Repository())
            {
                repo.AddTrainee(m, User.Identity.GetUserId());
            }
            return RedirectToAction("Index");
        }
    }
}