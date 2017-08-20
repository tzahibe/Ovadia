using Bo;
using OvaidaPro.App_Start;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace OvaidaPro.Controllers
{
    public class UploadsController : ControllerHelper
    {
        public string action = string.Empty;
        public string fileName = string.Empty;

        public ActionResult ShowFiles()
        {
            HttpContext context = System.Web.HttpContext.Current;
            Result resultToClient = new Result();

            //if (context.Session["Admin"] == null ||
            //    Convert.ToBoolean(context.Session["Admin"]) == false)
            //{
            //    resultToClient.ErrorCode = 5;
            //    resultToClient.ErrorMsg = "עליך להתחבר תחילה על מנת לבצע פעולה זו";
            //}
            //else
            //{
            DirectoryInfo dirInfo = new DirectoryInfo(System.AppDomain.CurrentDomain.BaseDirectory + "\\Uploads");
            FileInfo[] info = dirInfo.GetFiles("*sm_*");
            List<FileNames> items = new List<FileNames>();
            foreach (FileInfo f in info)
            {
                FileNames item = new FileNames();
                item.Name = f.Name;
                items.Add(item);
            }
            resultToClient.Data = items;
            //  }

            return Json(resultToClient, JsonRequestBehavior.AllowGet);

        }
        public void AddFile(int imgSize = 1) //imgsize = 1 small one
        {
            isAllow();
            HttpContext context = System.Web.HttpContext.Current;
            Result resultToClient = new Result();

            FileResult result = new FileResult();
         
            try
            {
                if (context.Request.Files.Count > 0)
                {
                    HttpFileCollection files = context.Request.Files;
                    for (int i = 0; i < files.Count; i++)
                    {
                        HttpPostedFile file = files[i];
                        //string fname = context.Server.MapPath("~\\Uploads\\" + file.FileName);
                        //file.SaveAs(fname);

                        string fileName = file.FileName;
                        // Get the bitmap data from the uploaded file
                        using (Bitmap src = Bitmap.FromStream(file.InputStream) as Bitmap)
                        {
                            Bitmap bitmapResult = ResizeBitmap(src, 130, 130);
                            string saveName = context.Server.MapPath("~\\Uploads\\sm_" + file.FileName);
                            bitmapResult.Save(saveName, ImageFormat.Jpeg);
                        }

                        using (Bitmap src = Bitmap.FromStream(file.InputStream) as Bitmap)
                        {
                            float widthS;
                            int width = src.Width;
                            int height = src.Height;

                            if (width < 800)
                                widthS = width;
                            else
                            {
                                widthS = width / 800;
                                width = Convert.ToInt32(width / widthS);
                                height = Convert.ToInt32(height / widthS);
                            }


                            Bitmap bitmapResult = ResizeBitmap(src, width, height);

                            string saveName = context.Server.MapPath("~\\Uploads\\lg_" + file.FileName);
                            bitmapResult.Save(saveName, ImageFormat.Jpeg);
                        }

                        result.Data = file.FileName;
                        result.ErrorMsg = "";
                        result.ErrorCode = 0;

                    }
                }
            }
            catch (Exception e)
            {
                result = new FileResult();
                result.ErrorCode = 1;
                result.ErrorMsg = " ארעה שגיאה בהעלת הקובץ " + fileName;
                result.Data = null;
                responseJsonFromServer(context);
                var serializer = new JavaScriptSerializer();
                var serializedResult = serializer.Serialize(result);
                context.Response.Write(serializedResult);
                return;
            }

            try
            {
                responseJsonFromServer(context);
                var serializer = new JavaScriptSerializer();
                var serializedResult = serializer.Serialize(result);
                context.Response.Write(serializedResult);
            }
            catch (Exception e)
            {
                result = new FileResult();
                result.ErrorCode = 1;
                result.ErrorMsg = " ארעה שגיאה בהעלת הקובץ " + fileName;
                result.Data = null;
                responseJsonFromServer(context);
                var serializer = new JavaScriptSerializer();
                var serializedResult = serializer.Serialize(result);
                context.Response.Write(serializedResult);
                return;
            }
        }
        public void DeleteFile(string fname)
        {
            isAllow();
            HttpContext context = System.Web.HttpContext.Current;
            Result resultToClient = new Result();

                       DirectoryInfo dirInfo = new DirectoryInfo(System.AppDomain.CurrentDomain.BaseDirectory + "\\Uploads");
            FileInfo[] info = dirInfo.GetFiles("*.*");
            List<string> items = new List<string>();
            foreach (FileInfo f in info)
            {

                if (fname.Equals(f.Name) || ("sm_" + fname).Equals(f.Name) || ("lg_" + fname).Equals(f.Name))
                {
                    string item = "/Uploads/" + f.Name;
                    items.Add(item);
                    f.Delete();
                }
            }
            resultToClient.ErrorCode = 0;
            resultToClient.Data = items;
            //}



            responseJsonFromServer(context);
            var serializer = new JavaScriptSerializer();
            var serializedResult = serializer.Serialize(resultToClient);
            context.Response.Write(serializedResult);
        }
        public void Rotate90(string fname)
        {
            isAllow();

            HttpContext context = System.Web.HttpContext.Current;
            Result resultToClient = new Result();
            string output = string.Empty;

            DirectoryInfo dirInfo = new DirectoryInfo(System.AppDomain.CurrentDomain.BaseDirectory + "\\Uploads");
            FileInfo[] info = dirInfo.GetFiles("*.*");

            try
            {
                foreach (FileInfo f in info)
                {

                    if (fname.Equals(f.Name) || ("sm_" + fname).Equals(f.Name) || ("lg_" + fname).Equals(f.Name))
                    {
                        //string item = "/Uploads/" + f.Name;
                        string saveName = f.FullName;

                        using (Image img = Image.FromFile(f.FullName))
                        {
                            //rotate the picture by 90 degrees and re-save the picture as a Jpeg
                            img.RotateFlip(RotateFlipType.Rotate90FlipNone);
                            img.Save(saveName, ImageFormat.Jpeg);
                        }

                    }

                }
                resultToClient.ErrorCode = 0;
                resultToClient.Data = true;
            }
            catch(Exception ex)
            {
                resultToClient.ErrorCode = 1;
                resultToClient.Data = false;
            }
          

            responseJsonFromServer(context);
            var serializer = new JavaScriptSerializer();
            var serializedResult = serializer.Serialize(resultToClient);
            context.Response.Write(serializedResult);
        }

        //Recomm
        public ActionResult ShowRecomFiles()
        {
            HttpContext context = System.Web.HttpContext.Current;
            Result resultToClient = new Result();

            //if (context.Session["Admin"] == null ||
            //    Convert.ToBoolean(context.Session["Admin"]) == false)
            //{
            //    resultToClient.ErrorCode = 5;
            //    resultToClient.ErrorMsg = "עליך להתחבר תחילה על מנת לבצע פעולה זו";
            //}
            //else
            //{
            DirectoryInfo dirInfo = new DirectoryInfo(System.AppDomain.CurrentDomain.BaseDirectory + "\\Recom");
            FileInfo[] info = dirInfo.GetFiles("*sm_*");
            List<FileNames> items = new List<FileNames>();
            foreach (FileInfo f in info)
            {
                FileNames item = new FileNames();
                item.Name = f.Name;
                items.Add(item);
            }
            resultToClient.Data = items;
            //  }

            return Json(resultToClient, JsonRequestBehavior.AllowGet);

        }
        public void AddRecomFile(int imgSize = 1) //imgsize = 1 small one
        {
            isAllow();
            HttpContext context = System.Web.HttpContext.Current;
            Result resultToClient = new Result();

            FileResult result = new FileResult();

            try
            {
                if (context.Request.Files.Count > 0)
                {
                    HttpFileCollection files = context.Request.Files;
                    for (int i = 0; i < files.Count; i++)
                    {
                        HttpPostedFile file = files[i];
                        //string fname = context.Server.MapPath("~\\Uploads\\" + file.FileName);
                        //file.SaveAs(fname);

                        string fileName = file.FileName;
                        // Get the bitmap data from the uploaded file
                        using (Bitmap src = Bitmap.FromStream(file.InputStream) as Bitmap)
                        {
                            Bitmap bitmapResult = ResizeBitmap(src, 130, 130);
                            string saveName = context.Server.MapPath("~\\Recom\\sm_" + file.FileName);
                            bitmapResult.Save(saveName, ImageFormat.Jpeg);
                        }

                        using (Bitmap src = Bitmap.FromStream(file.InputStream) as Bitmap)
                        {
                            float widthS;
                            int width = src.Width;
                            int height = src.Height;

                            if (width < 800)
                                widthS = width;
                            else
                            {
                                widthS = width / 800;
                                width = Convert.ToInt32(width / widthS);
                                height = Convert.ToInt32(height / widthS);
                            }


                            Bitmap bitmapResult = ResizeBitmap(src, width, height);

                            string saveName = context.Server.MapPath("~\\Recom\\lg_" + file.FileName);
                            bitmapResult.Save(saveName, ImageFormat.Jpeg);
                        }

                        result.Data = file.FileName;
                        result.ErrorMsg = "";
                        result.ErrorCode = 0;

                    }
                }
            }
            catch (Exception e)
            {
                result = new FileResult();
                result.ErrorCode = 1;
                result.ErrorMsg = " ארעה שגיאה בהעלת הקובץ " + fileName;
                result.Data = null;
                responseJsonFromServer(context);
                var serializer = new JavaScriptSerializer();
                var serializedResult = serializer.Serialize(result);
                context.Response.Write(serializedResult);
                return;
            }

            try
            {
                responseJsonFromServer(context);
                var serializer = new JavaScriptSerializer();
                var serializedResult = serializer.Serialize(result);
                context.Response.Write(serializedResult);
            }
            catch (Exception e)
            {
                result = new FileResult();
                result.ErrorCode = 1;
                result.ErrorMsg = " ארעה שגיאה בהעלת הקובץ " + fileName;
                result.Data = null;
                responseJsonFromServer(context);
                var serializer = new JavaScriptSerializer();
                var serializedResult = serializer.Serialize(result);
                context.Response.Write(serializedResult);
                return;
            }
        }
        public void DeleteRecomFile(string fname)
        {
            isAllow();
            HttpContext context = System.Web.HttpContext.Current;
            Result resultToClient = new Result();

            DirectoryInfo dirInfo = new DirectoryInfo(System.AppDomain.CurrentDomain.BaseDirectory + "\\Recom");
            FileInfo[] info = dirInfo.GetFiles("*.*");
            List<string> items = new List<string>();
            foreach (FileInfo f in info)
            {

                if (fname.Equals(f.Name) || ("sm_" + fname).Equals(f.Name) || ("lg_" + fname).Equals(f.Name))
                {
                    string item = "/Recom/" + f.Name;
                    items.Add(item);
                    f.Delete();
                }
            }
            resultToClient.ErrorCode = 0;
            resultToClient.Data = items;
            //}



            responseJsonFromServer(context);
            var serializer = new JavaScriptSerializer();
            var serializedResult = serializer.Serialize(resultToClient);
            context.Response.Write(serializedResult);
        }
        public void RotateRecom90(string fname)
        {
            isAllow();

            HttpContext context = System.Web.HttpContext.Current;
            Result resultToClient = new Result();
            string output = string.Empty;

            DirectoryInfo dirInfo = new DirectoryInfo(System.AppDomain.CurrentDomain.BaseDirectory + "\\Recom");
            FileInfo[] info = dirInfo.GetFiles("*.*");

            try
            {
                foreach (FileInfo f in info)
                {

                    if (fname.Equals(f.Name) || ("sm_" + fname).Equals(f.Name) || ("lg_" + fname).Equals(f.Name))
                    {
                        //string item = "/Uploads/" + f.Name;
                        string saveName = f.FullName;

                        using (Image img = Image.FromFile(f.FullName))
                        {
                            //rotate the picture by 90 degrees and re-save the picture as a Jpeg
                            img.RotateFlip(RotateFlipType.Rotate90FlipNone);
                            img.Save(saveName, ImageFormat.Jpeg);
                        }

                    }

                }
                resultToClient.ErrorCode = 0;
                resultToClient.Data = true;
            }
            catch (Exception ex)
            {
                resultToClient.ErrorCode = 1;
                resultToClient.Data = false;
            }


            responseJsonFromServer(context);
            var serializer = new JavaScriptSerializer();
            var serializedResult = serializer.Serialize(resultToClient);
            context.Response.Write(serializedResult);
        }

        public void responseJsonFromServer(HttpContext context)
        {
            context.Response.ContentType = "application/json";
            context.Response.AppendHeader("Cache-Control", "no-cache, no-store, must-revalidate");
            context.Response.AppendHeader("Pragma", "no-cache");
            context.Response.AppendHeader("Expires", "0");
        }
        private Bitmap rotateImage90(Bitmap b)
        {
            Bitmap returnBitmap = new Bitmap(b.Height, b.Width);
            Graphics g = Graphics.FromImage(returnBitmap);
            g.TranslateTransform((float)b.Width / 2, (float)b.Height / 2);
            g.RotateTransform(90);
            g.TranslateTransform(-(float)b.Width / 2, -(float)b.Height / 2);
            g.DrawImage(b, new Point(0, 0));
            return returnBitmap;
        }
        private Bitmap ResizeBitmap(Bitmap b, int nWidth, int nHeight)
        {
            Bitmap result = new Bitmap(nWidth, nHeight);
            using (Graphics g = Graphics.FromImage((Image)result))
                g.DrawImage(b, 0, 0, nWidth, nHeight);
            return result;
        }

        [Serializable]
        public class FileNames
        {
            public string Name { get; set; }
        }

        [Serializable]
        public class FileResult
        {
            public object Data { get; set; }
            public int ErrorCode { get; set; }
            public string ErrorMsg { get; set; }
        }
    }
}
