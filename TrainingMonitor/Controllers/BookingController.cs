using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TrainingMonitor.Models;

namespace TrainingMonitor.Controllers
{
    public class BookingController : Controller
    {
        // GET: Booking
        public ActionResult Index()
        {
            var m = new List<BookingModel>
            {
                new BookingModel
                {
                    DateTime = DateTime.ParseExact("05/08/2017, 15:30:00", "dd/MM/yyyy, HH:mm:ss", CultureInfo.InvariantCulture),
                    Court = 1,
                    Duration = 60,
                    Trainees = new List<TraineeModel>
                    {
                        new TraineeModel
                        {
                            Id = 1,
                            Firstname = "Ryan",
                            Surname = "Chen",
                            Avatar ="RyanChen.jpg",
                            Description = "Ryan has been trained with me since 2015, he is a J3 player.",
                            DateOfBirth = DateTime.ParseExact("19/10/2005", "dd/MM/yyyy", CultureInfo.InvariantCulture)
                        }
                    }
                },new BookingModel
                {
                    DateTime = DateTime.ParseExact("07/08/2017, 16:00:00", "dd/MM/yyyy, HH:mm:ss", CultureInfo.InvariantCulture),
                    Court = 1,
                    Duration = 180,
                    Trainees = new List<TraineeModel>
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
                    }
                },new BookingModel
                {
                    DateTime = DateTime.ParseExact("08/08/2017, 16:30:00", "dd/MM/yyyy, HH:mm:ss", CultureInfo.InvariantCulture),
                    Court = 1,
                    Duration = 120,
                    Trainees = new List<TraineeModel>
                    {
                        new TraineeModel
                        {
                            Id = 1,
                            Firstname = "Lawrence",
                            Surname = "Chen",
                            Avatar ="LawrenceChen.jpeg",
                            Description = "Lawrence has been trained with me since 2015, he is a J2 player.",
                            DateOfBirth = DateTime.ParseExact("06/07/2008", "dd/MM/yyyy", CultureInfo.InvariantCulture)
                        }
                    }
                },
            };
            return View(m);
        }
    }
}