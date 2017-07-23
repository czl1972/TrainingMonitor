using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TrainingMonitor.Models;

namespace TrainingMonitor.Query
{
    public class Repository : IDisposable
    {
        private readonly TrainingMonitorEntities _dbContext;

        public Repository()
        {
            _dbContext = new TrainingMonitorEntities();
        }
        public void Dispose()
        {
            _dbContext?.Dispose();
        }

        public IEnumerable<Trainee> TraineesByUser(string userId)
        {
            var traineeIds = from x in _dbContext.UserTrainees
                             where x.UserId == userId
                             select x.TraineeId;
            return from t in _dbContext.Trainees
                   where traineeIds.Contains(t.Id)
                   select t;
        }

        public int AddTrainee(TraineeModel m, string userId)
        {
            var t = new Trainee
            {
                Firstname = m.Firstname,
                Surname = m.Surname,
                DateOfBirth = m.DateOfBirth,
                BeNumber = m.BeNumber,
                Avatar = m.Avatar
            };
            var ret = _dbContext.Trainees.Add(t);

            //middle table
            var exist = from x in _dbContext.UserTrainees
                where x.UserId == userId && x.TraineeId == ret.Id
                select x;
            if (!exist.Any())
            {
                var ut = new UserTrainee
                {
                    UserId = userId,
                    TraineeId = ret.Id
                };
                _dbContext.UserTrainees.Add(ut);
            }
            _dbContext.SaveChanges();
            return ret.Id;
        }

        public IEnumerable<Booking> BookingsByUser(string userId)
        {
            return from b in _dbContext.Bookings
                where b.UserId == userId
                select b;
        }

        public int AddBooking(BookingModel m, string userId)
        {
            var conflict = ConflictWithAnotherBooking(m.DateTime, userId);
            if (conflict != null)
            {
                throw new InvalidOperationException($"The time conflicts with an existing booking at {conflict.Datetime:dd MMM, HH:mm}");
            }
            ;
            var b = new Booking
            {
                UserId = userId,
                Court = (byte) m.Court,
                Datetime = m.DateTime,
                Duration = m.Duration
            };
            var ret = _dbContext.Bookings.Add(b);

            foreach (var t in m.Trainees)
            {
                var tb = new TraineeBooking
                {
                     BookingId = ret.Id,
                     TraineeId = t.Id
                };
                _dbContext.TraineeBookings.Add(tb);
            }
            _dbContext.SaveChanges();
            return ret.Id;
        }

        private Booking ConflictWithAnotherBooking(DateTime dateTime, string userId)
        {
            return (from b in _dbContext.Bookings
                where b.UserId == userId &&
                      dateTime >= b.Datetime &&
                      dateTime <= b.Datetime.AddMinutes(b.Duration)
                select b).FirstOrDefault();
        }

        public Trainee TraineeById(int traineeId)
        {
            return (from t in _dbContext.Trainees
                where t.Id == traineeId
                select t).FirstOrDefault();
        }

        //public IEnumerable<Trainee> TraineesByUser(string userId)
        //{
        //    return from ut in _dbContext.UserTrainees
        //            where ut.UserId == userId
        //            select TraineeById(ut.TraineeId);
        //}

        public IEnumerable<Trainee> TraineesByBooking(int bookingId)
        {
            return from tb in _dbContext.TraineeBookings
                where tb.BookingId == bookingId
                select TraineeById(tb.TraineeId);
        }
    }
}