//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace TrainingMonitor
{
    using System;
    using System.Collections.Generic;
    
    public partial class Trainee
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Trainee()
        {
            this.UserTrainees = new HashSet<UserTrainee>();
            this.TraineeBookings = new HashSet<TraineeBooking>();
        }
    
        public int Id { get; set; }
        public string Firstname { get; set; }
        public string Surname { get; set; }
        public System.DateTime DateOfBirth { get; set; }
        public string BeNumber { get; set; }
        public string Avatar { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<UserTrainee> UserTrainees { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<TraineeBooking> TraineeBookings { get; set; }
    }
}
