using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using TrainingMonitor.Models;
using TrainingMonitor.Models.ViewModels;
using TrainingMonitor.Query;

namespace TrainingMonitor.Controllers
{
    public class BookingController : Controller
    {
        // GET: Booking
        public ActionResult Index()
        {
            var m = new BookingViewModel();
            using (var repo = new Repository())
            {
                m.Bookings = (from b in repo.BookingsByUser(User.Identity.GetUserId())
                    select new BookingModel
                    {
                        Id = b.Id,
                        DateTime = b.Datetime,
                        Duration = b.Duration,
                        Trainees = (from t in repo.TraineesByBooking(b.Id)
                                   select new TraineeModel
                                   {
                                       Id = t.Id,
                                       Firstname = t.Firstname,
                                       Surname = t.Surname,
                                       Avatar = t.Avatar,
                                       DateOfBirth = t.DateOfBirth,
                                       BeNumber = t.BeNumber
                                   }).ToList()
                    }).ToList();
                m.Trainees = (from t in repo.TraineesByUser(User.Identity.GetUserId())
                             select new TraineeModel
                             {
                                 Id = t.Id,
                                 Firstname = t.Firstname,
                                 Surname = t.Surname,
                                 Avatar = t.Avatar,
                                 DateOfBirth = t.DateOfBirth,
                                 BeNumber = t.BeNumber
                             }).ToList();
            }
            return View(m);
        }

        [HttpPost]
        public ActionResult Add(BookingModel m)
        {
            using (var repo = new Repository())
            {
                repo.AddBooking(m, User.Identity.GetUserId());
            }
            return RedirectToAction("Index");
        }
    }
}