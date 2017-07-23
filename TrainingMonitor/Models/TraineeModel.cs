using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TrainingMonitor.Models
{
    public class TraineeModel
    {
        public int Id { get; set; }
        public string Firstname { get; set; }
        public string Surname { get; set; }
        public DateTime DateOfBirth { get; set; }

        public int Age => DateTime.Now.Year - DateOfBirth.Year;

        public string Avatar { get; set; }
        public string Description { get; set; }

        public string BeNumber { get; set; }
    }
}