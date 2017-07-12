using Bo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public abstract class MessageResult
    {
        public static Result AddEmail(Message msg)
        {
            Result result = new Result();
            byte[] time = BitConverter.GetBytes(DateTime.UtcNow.ToBinary());
            byte[] key = Guid.NewGuid().ToByteArray();
            Repository.Emails repo_mail = new Emails();
            string token = Convert.ToBase64String(time.Concat(key).ToArray());

            repo_mail.email = msg.Email;
            repo_mail.FullName = msg.Full_Name;
            repo_mail.Token = token;

            try
            {
                using (DB_A25801_OvadiaEntities context = new DB_A25801_OvadiaEntities())
                {
                    Repository.Emails db_result = new Emails();
                    db_result = (from r in context.Emails
                                 where r.email.ToLower().Equals(msg.Email.ToLower())
                                 select r).FirstOrDefault();

                    if(db_result != null)
                    {
                        result.ErrorCode = 2;
                        result.Data = msg;
                        return result;
                    }
                    context.Emails.Add(repo_mail);
                    context.SaveChanges();
                    msg.ID = repo_mail.ID.ToString();
                    result.ErrorCode = 0;
                    result.Data = msg;
                }
            }
            catch (Exception ex)
            {
                result.Exception = ex.ToString();
                result.ErrorCode = 1;
                result.ErrorMsg = Consts.CODE_1_MSG;

                Logger.Write("MessageResult.cs", ex.StackTrace, ex.Source, DateTime.Now);
            }

            return result;
        }
        public static Result RemoveEmail(int msgId)
        {
            Result result = new Result();
            Message msg = new Message();

            try
            {
                using (DB_A25801_OvadiaEntities context = new DB_A25801_OvadiaEntities())
                {
                    Repository.Emails db_result = new Emails();
                    db_result = (from r in context.Emails where r.ID == msgId select r).FirstOrDefault();

                    msg.ID = db_result.ID.ToString();
                    msg.Email = db_result.email;

                    context.Emails.Attach(db_result);
                    context.Emails.Remove(db_result);
                    context.SaveChanges();
                    result.ErrorCode = 0;
                    result.Data = msg;
                }
            }
            catch (Exception ex)
            {
                result.Exception = ex.ToString();
                result.ErrorCode = 1;
                result.ErrorMsg = Consts.CODE_1_MSG;
                Logger.Write("MessageResult.cs", ex.StackTrace, ex.Source, DateTime.Now);
            }

            return result;
        }
        public static Result RemoveEmailByToken(int msgId, string Token)
        {
            Result result = new Result();
            string realToken = Token.Replace(' ', '+');

            try
            {
                using (DB_A25801_OvadiaEntities context = new DB_A25801_OvadiaEntities())
                {
                    Repository.Emails db_result = new Emails();
                    db_result = (from r in context.Emails
                                 where r.ID == msgId && r.Token.Trim().Equals(realToken) select r).FirstOrDefault();

                    context.Emails.Attach(db_result);
                    context.Emails.Remove(db_result);
                    context.SaveChanges();
                    result.ErrorCode = 0;
                    result.Data = db_result;
                }
            }
            catch (Exception ex)
            {
                result.Exception = ex.ToString();
                result.ErrorCode = 1;
                result.ErrorMsg = Consts.CODE_1_MSG;
                Logger.Write("MessageResult.cs", ex.StackTrace, ex.Source, DateTime.Now);
            }

            return result;
        }
        public static Result GetAllMembers()
        {
            Result result = new Result();
            List<Message> messagesResult = new List<Message>();

            try
            {
                using (DB_A25801_OvadiaEntities context = new DB_A25801_OvadiaEntities())
                {
                    List<Repository.Emails> db_result = new List<Repository.Emails>();
                    db_result = (from r in context.Emails  select r).ToList();
                    result.Data = db_result;
                    result.ErrorCode = 0;
                }
            }
            catch (Exception ex)
            {
                result.Exception = ex.ToString();
                result.ErrorCode = 1;
                result.ErrorMsg = Consts.CODE_1_MSG;
                Logger.Write("MessageResult.cs", ex.StackTrace, ex.Source, DateTime.Now);
                return result;

            }

            return result;
        }
        public static Result GetTokenById(int msgId)
        {
            Result result = new Result();
            Message msg = new Message();

            try
            {
                using (DB_A25801_OvadiaEntities context = new DB_A25801_OvadiaEntities())
                {
                    Repository.Emails db_result = new Emails();
                    db_result = (from r in context.Emails where r.ID == msgId select r).FirstOrDefault();
                    result.Data = db_result.Token;
                    result.ErrorCode = 0;
                }
            }
            catch (Exception ex)
            {
                result.Exception = ex.ToString();
                result.ErrorCode = 1;
                result.ErrorMsg = Consts.CODE_1_MSG;
                Logger.Write("MessageResult.cs", ex.StackTrace, ex.Source, DateTime.Now);
            }

            return result;
        }
    }
}
