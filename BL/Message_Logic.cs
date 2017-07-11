using Bo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using Repository;

namespace BL
{
    public abstract class Message_Logic
    {
        public static Result SendMsg(MessageSend MessageSend)
        {
            MessageSend.Body = MessageSend.Body.Replace("\n", "<br>");
            Result result = new Result();
            try
            {
                List<Message> members = (List<Message>)GetAllMembers().Data;

                MailAddress fromAddress = new MailAddress("colel.ovadia@gmail.com", "כולל חזון עובדיה");
                String fromPassword = "qwrtqwrt1988";

                //2.The Destination email Addresses
                MailAddressCollection TO_addressList = new MailAddressCollection();

                //3.Prepare the Destination email Addresses list
                foreach (Message curr_address in members)
                {
                    MailAddress mytoAddress = new MailAddress(curr_address.Email, "Custom display name");
                    
                    string token = (string)GetTokenById(Convert.ToInt32(curr_address.ID)).Data;
                   // TO_addressList.Add(mytoAddress);


                    //4.The Email Body Message
                    String body = "<div style='text-align:right'; text-align:right'>";
                    body += "<img style='    position: relative;top: 24px;' src='http://www.colel.co.il/Content/images/logozakai.png'/>";
                    body += "<h2>עדכונים - כולל חזון עובדיה - מושב בן זכאי</h2>";
                    body += "<h3>" + MessageSend.Subject + "</h3>";
                    body += MessageSend.Body;
                    body += "<br><br>" +
                        "על מנת להסיר את עצמך מרשימת הדיוור " +
                        "<a href='http://www.colel.co.il/message/RemoveEmailByToken?msgId=" + curr_address.ID + "&token=" + token + " '>לחץ כאן</a></div>";
                    //5.Prepare GMAIL SMTP: with SSL on port 587
                    var smtp = new SmtpClient
                    {
                        Host = "smtp.gmail.com",
                        Port = 587,
                        EnableSsl = true,
                        DeliveryMethod = SmtpDeliveryMethod.Network,
                        Credentials = new NetworkCredential(fromAddress.Address, fromPassword),
                        Timeout = 30000
                    };


                    //6.Complete the message and SEND the email:
                    using (var message = new MailMessage()
                    {
                        From = fromAddress,
                        Subject = MessageSend.Subject,
                        Body = body,
                        IsBodyHtml = true
                    })
                    {
                        message.To.Add(mytoAddress.ToString());
                        smtp.Send(message);
                    }
                }
                result.ErrorCode = 0;   
            }
            catch(Exception e)
            {
                result.ErrorCode = 0;
            }

            return result;
        }
        public static Result SendPasswordMsg(MessageSend MessageSend)
        {
            MessageSend.Body = MessageSend.Body.Replace("\n", "<br>");
            Result result = new Result();
            try
            {
                List<Message> members = (List<Message>)GetAllMembers().Data;

                MailAddress fromAddress = new MailAddress("colel.ovadia@gmail.com", "כולל חזון עובדיה");
                String fromPassword = "qwrtqwrt1988";

                //2.The Destination email Addresses
                MailAddressCollection TO_addressList = new MailAddressCollection();

                //3.Prepare the Destination email Addresses list
                foreach (Message curr_address in members)
                {
                    MailAddress mytoAddress = new MailAddress(curr_address.Email, "Custom display name");

                    string token = (string)GetTokenById(Convert.ToInt32(curr_address.ID)).Data;
                    // TO_addressList.Add(mytoAddress);


                    //4.The Email Body Message
                    String body = "<div style='text-align:right'; text-align:right'>";
                    body += "<img style='    position: relative;top: 24px;' src='http://www.colel.co.il/Content/images/logozakai.png'/>";
                    body += "<h2> - כולל חזון עובדיה - מושב בן זכאי</h2>";
                    body += "<h3>" + MessageSend.Subject + "</h3>";
                    body += MessageSend.Body;
                    //5.Prepare GMAIL SMTP: with SSL on port 587
                    var smtp = new SmtpClient
                    {
                        Host = "smtp.gmail.com",
                        Port = 587,
                        EnableSsl = true,
                        DeliveryMethod = SmtpDeliveryMethod.Network,
                        Credentials = new NetworkCredential(fromAddress.Address, fromPassword),
                        Timeout = 30000
                    };


                    //6.Complete the message and SEND the email:
                    using (var message = new MailMessage()
                    {
                        From = fromAddress,
                        Subject = MessageSend.Subject,
                        Body = body,
                        IsBodyHtml = true
                    })
                    {
                        message.To.Add(mytoAddress.ToString());
                        smtp.Send(message);
                    }
                }
                result.ErrorCode = 0;
            }
            catch (Exception e)
            {
                result.ErrorCode = 0;
            }

            return result;
        }
        public static Result AddEmail(Message msg)
        {
            Result result = new Result();

            if (Common.IsMailValid(msg.Email) == false)
            {
                result.ErrorCode = 1;
                return result;
            }
            
            result = MessageResult.AddEmail(msg);

            return result;
        }
        public static Result RemoveEmail(int msgId)
        {
            Result result = new Result();
            result = MessageResult.RemoveEmail(msgId);

            return result;
        }
        public static Result RemoveEmailByToken(int msgId, string token)
        {
            Result result = new Result();
            result = MessageResult.RemoveEmailByToken(msgId, token);

            if(result.ErrorCode == 0)
            {
                result.Data = "הוסרת בהצלחה מרשימת התפוצה";
            }
            else
            {
                result.Data = "ארעה שגיאה במהלך ההסרה, אנא נסה שנית מאוחר יותר";
            }

            return result;
        }
        public static Result GetAllMembers()
        {
            Result result = new Result();
            result = MessageResult.GetAllMembers();
            List<Message> boResult = new List<Message>();

            try
            {
                List<Repository.Emails> repo_list = ((List<Repository.Emails>)result.Data);
                int listCount = repo_list.Count;
                for (int i = 0; i < listCount; i++)
                {
                    Message msg = new Message();
                    msg.Email = repo_list[i].email;
                    msg.ID = repo_list[i].ID.ToString();
                    msg.Full_Name = repo_list[i].FullName;
                    boResult.Add(msg);
                }
                result.Data = boResult;
                result.ErrorCode = 0;
            }
            catch (Exception e)
            {
                result.ErrorCode = 1;
            }

            return result;
        }
        public static Result GetTokenById(int msgId)
        {
            Result result = new Result();
            result = MessageResult.GetTokenById(msgId);

            return result;
        }

    }
}