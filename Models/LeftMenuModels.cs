using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebUI.Model;
using WebUI.BLL;

namespace WebUI.Models
{
    public class LeftMenuModels
    {
        public IList<NavModel> nav { 
            get 
            {
                FtpUploadHistoryBLL ftpbll = new FtpUploadHistoryBLL();
                NavBLL bll = new NavBLL();
                NavModel model = new NavModel();
                string UserName = string.Empty;
                string Domain = string.Empty;
                string[] UserNameArry = HttpContext.Current.Request.ServerVariables["LOGON_USER"].Split('\\');
                UserName = UserNameArry[1];
                Domain = UserNameArry[0];
                model.CreateUserId = UserName;
                return bll.getNavList(model);
            }
        }
       
    }
}