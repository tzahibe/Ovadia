using Bo;
using BO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public abstract class CommentResult
    {
        public static Result Save(Comment comment)
        {
            Result result = new Result();
            try
            {
                using (DB_A25801_OvadiaEntities context = new DB_A25801_OvadiaEntities())
                {
                    db_Comment commentRep = (from r in context.db_Comment
                                             select r).FirstOrDefault();

                    if (commentRep != null)
                    {

                        commentRep.Text = comment.Text;
                        commentRep.PublishDate = DateTime.Now;
                        commentRep.Show = comment.Show;

                        context.db_Comment.Attach(commentRep);
                        var entry = context.Entry(commentRep);
                        entry.Property(e => e.Text).IsModified = true;
                        entry.Property(e => e.PublishDate).IsModified = true;
                        entry.Property(e => e.Show).IsModified = true;
                        context.SaveChanges();
                    }
                    else
                    {
                        commentRep = new db_Comment();
                        commentRep.Text = comment.Text;
                        commentRep.PublishDate = DateTime.Now;
                        commentRep.Show = comment.Show;
                        context.db_Comment.Add(commentRep);
                        context.SaveChanges();
                       
                    }

                    result.Data = commentRep;
                    result.ErrorCode = 0;
                }
            }
            catch (Exception ex)
            {
                result.Data = false;
                result.ErrorCode = (int)ErrorEnumcs.ErrorServer;
                result.ErrorMsg = Consts.CODE_1_MSG;
                Logger.Write("CommentResult.cs", ex.StackTrace, ex.Source, DateTime.Now);
                return result;
            }
            return result;
        }

        public static Result GetComment()
        {
            Result result = new Result();
            try
            {
                using (DB_A25801_OvadiaEntities context = new DB_A25801_OvadiaEntities())
                {
                    db_Comment commentRep = (from r in context.db_Comment
                                             select r).FirstOrDefault();

                    result.Data = commentRep;
                    result.ErrorCode = 0;
                }
            }
            catch (Exception ex)
            {
                result.Data = false;
                result.ErrorCode = (int)ErrorEnumcs.ErrorServer;
                result.ErrorMsg = Consts.CODE_1_MSG;
                Logger.Write("CommentResult.cs", ex.StackTrace, ex.Source, DateTime.Now);
                return result;
            }
            return result;
        }

    }
}
