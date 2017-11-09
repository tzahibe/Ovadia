using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BO
{
    public class Sidur
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }
        public int Publish { get; set; }
        public string ProfilePic { get; set; }
        public int isCategory { get; set; }
        public int Parent { get; set; }
        public int Views { get; set; }
    }
}
