using System;
using System.Collections.Generic;
using System.Text;

namespace Bo
{
    public class CategoryBo
    {
        public int id { get; set; }
        public int ParentId { get; set; }
        public string Name { get; set; }
        public string Cat_Order { get; set; }
        public bool isActive { get; set; }
        public List<CategoryBo> Children { get; set; }
    }
}
