namespace webapi.Models
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using Microsoft.EntityFrameworkCore;
    using MySql.Data.EntityFrameworkCore.Extensions;
    
    public partial class MyappEntities : DbContext
    {
        public DbSet<TBL_USERS> TBL_USERS{ get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            => optionsBuilder.UseMySQL(@"server=localhost;database=myapp;userid=myapp;pwd=myapp;sslmode=none;");      
    }
}