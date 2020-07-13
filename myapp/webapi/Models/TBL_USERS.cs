namespace webapi.Models
{
    using System;
    using System.Collections.Generic;
    // using System.Runtime.Serialization;

    // [DataContract]
    public partial class TBL_USERS
    {
        public int id { get;set; }
        // [DataMember(Name = "userid")]
        public string user_id { get;set; }
        public string password { get;set; }
        public string sys_date { get;set; }
    }
}