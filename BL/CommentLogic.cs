using Bo;
using BO;
using Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public abstract class CommentLogic
    {
        public static Result Save(Comment comment)
        {
            return  CommentResult.Save(comment);
        }
        public static Result GetComment()
        {
            return CommentResult.GetComment();
        }
    }
}
