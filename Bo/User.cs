using System;
using System.Collections.Generic;
using System.Text;

namespace Bo
{
    public class User
    {
        public string FullName { get; set; }
        public string UserRole { get; set; }
        public string Password { get; set; }
        public int ID { get; set; }
        public string Active { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public DateTime LastLogin { get; set; }
        public DateTime AccountCreate { get; set; }
    }
}
