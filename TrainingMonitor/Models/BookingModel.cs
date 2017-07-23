using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TrainingMonitor.Models
{
    public class BookingModel
    {
        public int Id { get; set; }
        public DateTime DateTime { get; set; }
        public int Court { get; set; }
        public List<TraineeModel> Trainees { get; set; }

        public string TraineeNames
        {
            get
            {
                return string.Join(", ", Trainees.Select(t=> t.Firstname + " " + t.Surname));
            }
        }

        public int Duration { get; set; }//in mins
    }
}