using Bo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public abstract class UsersResult
    {
        public static Result Login(string userName, string password)
        {
            Result result = new Result();

            try
            {
                using (DB_A25801_OvadiaEntities context = new DB_A25801_OvadiaEntities())
                {
                    Repository.Users db_result = new Repository.Users();

                    db_result = (from r in context.Users
                                 where r.UserName.Equals(userName) && r.Password.Equals(password)
                                 select r).FirstOrDefault();
                    if (db_result != null) {
                        result.Data = db_result;
                        result.ErrorCode = 0;
                    }
                    else
                    {
                        result.Data = null;
                        result.ErrorCode = (int)ErrorEnumcs.DetailsNotMatch;
                    }
                    
                }
            }
            catch (Exception ex)
            {
                result.Exception = ex.ToString();
                result.ErrorCode = (int)ErrorEnumcs.ErrorServer;
                result.ErrorMsg = Consts.CODE_1_MSG;
                Logger.Write("UsersResult.cs", ex.StackTrace, ex.Source, DateTime.Now);
                return result;

            }

            return result;
        }
        public static Result GetAllUsers()
        {
            Result result = new Result();

            try
            {
                using (DB_A25801_OvadiaEntities context = new DB_A25801_OvadiaEntities())
                {
                    List<Repository.Users> db_result = new List<Repository.Users>();

                    db_result = (from r in context.Users select r).ToList();

                    result.Data = db_result;
                    result.ErrorCode = 0;
                }
            }
            catch (Exception ex)
            {
                result.Exception = ex.ToString();
                result.ErrorCode = 1;
                result.ErrorMsg = Consts.CODE_1_MSG;
                Logger.Write("UsersResult.cs", ex.StackTrace, ex.Source, DateTime.Now);
                return result;

            }

            return result;
        }
        public static Result GetActiveUsers()
        {
            Result result = new Result();

            try
            {
                using (DB_A25801_OvadiaEntities context = new DB_A25801_OvadiaEntities())
                {
                    List<Repository.Users> db_result = new List<Repository.Users>();
                    db_result = (from r in context.Users
                                 where !r.Active.Equals("1")
                                 select r).ToList();

                    result.Data = db_result;
                    result.ErrorCode = 0;
                }
            }
            catch (Exception ex)
            {
                result.Exception = ex.ToString();
                result.ErrorCode = (int)ErrorEnumcs.ErrorServer;
                result.ErrorMsg = Consts.CODE_1_MSG;
                Logger.Write("UsersResult.cs", ex.StackTrace, ex.Source, DateTime.Now);
                return result;

            }

            return result;
        }   
        public static Result AddUser(User userObj)
        {
            Result result = new Result();
            Repository.Users repo_user = new Users();

            repo_user.Active = userObj.Active;
            repo_user.Password = userObj.Password;
            repo_user.AccountCreate = DateTime.Today;
            repo_user.FullName = userObj.FullName;
            repo_user.LastLogin = DateTime.Today;
            repo_user.UserRole = userObj.UserRole;
            repo_user.Email = userObj.Email;

            try
            {
                using (DB_A25801_OvadiaEntities context = new DB_A25801_OvadiaEntities())
                {
                    context.Users.Add(repo_user);
                    context.SaveChanges();
                    result.ErrorCode = 0;
                    userObj.ID = repo_user.ID;
                    result.Data = userObj;
                }
            }
            catch (Exception ex)
            {
                result.Exception = ex.ToString();
                result.ErrorCode = (int)ErrorEnumcs.ErrorServer;
                result.ErrorMsg = Consts.CODE_1_MSG;
                Logger.Write("UsersResult.cs", ex.StackTrace, ex.Source, DateTime.Now);
            }

            return result;
        } 
        public static Result RemoveUser(int userId)
        {
            Result result = new Result();

            try
            {
                using (DB_A25801_OvadiaEntities context = new DB_A25801_OvadiaEntities())
                { 
                    Repository.Users db_result = new Users();
                    db_result = (from r in context.Users where r.ID == userId select r).FirstOrDefault();

                    context.Users.Attach(db_result);
                    context.Users.Remove(db_result);
                    context.SaveChanges();
                    result.ErrorCode = 0;
                    result.Data = db_result;
                }
            }
            catch (Exception ex)
            {
                result.Exception = ex.ToString();
                result.ErrorCode = (int)ErrorEnumcs.ErrorServer;
                result.ErrorMsg = Consts.CODE_1_MSG;
                Logger.Write("UsersResult.cs", ex.StackTrace, ex.Source, DateTime.Now);
            }

            return result;
        }
        public static Result UpdateUser(User userObj)
        {
            Result result = new Result();

            try
            {
                using (DB_A25801_OvadiaEntities context = new DB_A25801_OvadiaEntities())
                {
                    Repository.Users db_user = new Users();
                    db_user = (from r in context.Users where r.ID == userObj.ID select r).FirstOrDefault();

                    //db_user.AccountCreate = userObj.AccountCreate;
                    db_user.Active = userObj.Active;
                    db_user.FullName = userObj.FullName;
                    db_user.Password = userObj.Password;
                    db_user.Email = userObj.Email;
                    //db_user.LastLogin = userObj.Status;
                    db_user.UserRole = userObj.UserRole;

                    context.Users.Attach(db_user);
                    var entry = context.Entry(db_user);
                    entry.Property(e => e.Active).IsModified = true;
                    entry.Property(e => e.Password).IsModified = true;
                    entry.Property(e => e.FullName).IsModified = true;
                    entry.Property(e => e.Email).IsModified = true;
                    entry.Property(e => e.UserRole).IsModified = true;
                    context.SaveChanges();

                    result.ErrorCode = 0;
                    result.Data = userObj;
                }
            }
            catch (Exception ex)
            {
                result.Exception = ex.ToString();
                result.ErrorCode = (int)ErrorEnumcs.ErrorServer;
                result.ErrorMsg = Consts.CODE_1_MSG;
                Logger.Write("UsersResult.cs", ex.StackTrace, ex.Source, DateTime.Now);
            }

            return result;
        }
        public static Result GetUserByEmail(string Email)
        {
            Result result = new Result();

            try
            {
                using (DB_A25801_OvadiaEntities context = new DB_A25801_OvadiaEntities())
                {
                    Repository.Users db_user = new Users();
                    db_user = (from r in context.Users where r.Email.Equals(Email) select r).FirstOrDefault();
                    result.ErrorCode = 0;
                    result.Data = db_user;
                }
            }
            catch (Exception ex)
            {
                result.Exception = ex.ToString();
                result.ErrorCode = (int)ErrorEnumcs.ErrorServer;
                result.ErrorMsg = Consts.CODE_1_MSG;
                Logger.Write("UsersResult.cs", ex.StackTrace, ex.Source, DateTime.Now);
            }

            return result;
        }

    }
}
