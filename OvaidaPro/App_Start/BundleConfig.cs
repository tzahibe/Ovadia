//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Web;
//using System.Web.Optimization;

//namespace OvaidaPro.App_Start
//{
//    public class BundleConfig
//    {
//        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
//        public static void RegisterBundles(BundleCollection bundles)
//        {
//            //bundles.IgnoreList.Clear();
//            string ver = DateTime.Today.GetHashCode().ToString();

//            bundles.Add(new ScriptBundle("~/bundles").Include(
//                        "~/bundle/bundle.js?ver=" + ver
//                    ));

//            BundleTable.EnableOptimizations = false;
//        }
//    }
//}