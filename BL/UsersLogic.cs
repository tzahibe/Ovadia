using Bo;
using Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public abstract class UsersLogic
    {
        public static Result Login(string userName, string password)
        {
            Result result = UsersResult.Login(userName, password);
            result = TranslateRpoToBo(result);
            return result;

        }
        public static Result GetActiveUsers()
        {
            Result result = UsersResult.GetActiveUsers();
            result = TranslateRpoListToBo(result);
            return result;
        }
        public static Result AddUser(User userObj)
        {
            Result result = UsersResult.AddUser(userObj);
            result = TranslateRpoToBo(result);
            return result;
        }
        public static Result RemoveUser(int userId)
        {
            Result result = UsersResult.RemoveUser(userId);
            result = TranslateRpoToBo(result);
            return result;
        }
        public static Result UpdateUser(User userObj)
        {
            Result result = UsersResult.UpdateUser(userObj);
            result = TranslateRpoToBo(result);
            return result;
        }
    
        /* Private */
        private static Result TranslateRpoToBo(Result result)
        {
            Repository.Users repo = (Repository.Users)result.Data;
            User user = new User();

            if (repo.AccountCreate != null){
                user.AccountCreate = (DateTime)repo.AccountCreate;
            }
            if (repo.LastLogin != null)
            {
                user.LastLogin = (DateTime)repo.LastLogin;
            }
            user.UserRole = repo.UserRole;
            user.UserName = repo.UserName;
            user.Email = repo.Email;
            user.FullName = repo.FullName;
            user.Active = repo.Active;

            result.ErrorCode = 0;
            result.Data = user;
            return result;
        }

        private static Result TranslateRpoListToBo(Result result)
        {
            List<Repository.Users> repoList = (List<Repository.Users>)result.Data;

            List<User> boList = new List<User>();

            for(int i=0; i< repoList.Count; i++)
            {
                User user = new User();
                if (repoList[i].AccountCreate != null)
                {
                    user.AccountCreate = (DateTime)repoList[i].AccountCreate;
                }
                if (repoList[i].LastLogin != null)
                {
                    user.LastLogin = (DateTime)repoList[i].LastLogin;
                }
                user.UserRole = repoList[i].UserRole;
                user.UserName = repoList[i].UserName;
                user.Email = repoList[i].Email;
                user.FullName = repoList[i].FullName;
                user.Active = repoList[i].Active;

                boList.Add(user);
            }

            result.Data = boList;
            result.ErrorCode = 0;
            return result;
        }

    }
}
