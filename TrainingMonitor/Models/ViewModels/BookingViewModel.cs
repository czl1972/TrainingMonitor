using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TrainingMonitor.Models.ViewModels
{
    public class BookingViewModel
    {
        public List<BookingModel> Bookings { get; set; }
        public List<TraineeModel> Trainees { get; set; }
    }
}