using System;
using System.Collections.Generic;
using System.Text;

namespace Bo
{
    public class Message
    {
        public string Full_Name { get; set; }
        public string ID { get; set; }
        public string Email { get; set; }
    }

    public class MessageSend
    {
        public string Subject { get; set; }
        public string Body { get; set; }
    }
}
