using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BO
{
    public class Comment
    {   
        public int Id { get; set; }
        public int Show { get; set; }
        public DateTime PublishDate { get; set; }
        public string Text { get; set; }
    }
    
}
