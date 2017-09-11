using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BO
{
    public class TrumaPerson
    {
        public int Id { get; set; }
        public int Type { get; set; }
        public string ExpDate { get; set; }
        public string Payment_FullName { get; set; }
        public string Total { get; set; }
        public string Phone1 { get; set; }
        public string NumberId { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public string FlatNumber { get; set; }
        public int Cur { get; set; }
        public DateTime PayDate { get; set; }
        public string Comment { get; set; }
        public string Donates { get; set; }
        public string Lesson_date { get; set; }
        public string Lesson_Name { get; set; }
    }

    public class TrumaPersonSmall
    {
        public int Id { get; set; }
        public int Type { get; set; }
        public string Lesson_date { get; set; }
        public string Lesson_Name { get; set; }
        public string Donates { get; set; }
        public string Email { get; set; }
    }
}
