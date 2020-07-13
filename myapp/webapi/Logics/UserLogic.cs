using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using MySql.Data.EntityFrameworkCore.Extensions;
using webapi.Models;

namespace webapi.Logics
{
    public class UserLogic
    {

        public List<TBL_USERS> GetUsers() {
            using(var context = new MyappEntities())
            {
                // var ret = context.TBL_USERS.ToList();
                var ret = context.TBL_USERS.ToList();
                return ret;
            }

        }
        public void AddUser(string userId, string password) {
            using(var context = new MyappEntities())
            {
                context.TBL_USERS.Add(new TBL_USERS() {
                    user_id = userId,
                    password = password
                });
                context.SaveChanges();
            }

        }
        public void UpdateUser(string userId, string password) {
            using(var context = new MyappEntities())
            {
                var user = context.TBL_USERS.Single(x => x.user_id == userId);
                user.password = password;
                context.SaveChanges();
            }
        }
        public void DeleteUser(string userId) {
            using(var context = new MyappEntities())
            {
                var user = context.TBL_USERS.Single(x => x.user_id == userId);
                context.TBL_USERS.Remove(user);
                context.SaveChanges();
            }
        }

    }
}