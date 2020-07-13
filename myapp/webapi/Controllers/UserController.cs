using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using webapi.Logics;
using webapi.Models;

namespace webapi.Controllers
{

  [Route("api/[controller]/[action]")]
  [ApiController]
  public class UserController : ControllerBase
  {

    private readonly ILogger<UserController> _logger;

    public UserController(ILogger<UserController> logger)
    {
        _logger = logger;
    }
    
    public class ResposeData 
    {
      public String Status { get; set; }
      public Object ResultData { get; set; }
       
    }

    public class RequestData 
    {
      public long Id { get; set; }
      public string UserId { get; set; }
      public string Password { get; set; }
    }

    [HttpGet]
    public ResposeData List()
    {
      ResposeData responseData = new ResposeData();

      var logic = new UserLogic();
      try {
        var users = logic.GetUsers();
        responseData.Status = "success";
        responseData.ResultData = users;
      } catch(Exception e) {
        Console.WriteLine(e.ToString());
        responseData.Status = "error";
        responseData.ResultData = null;
      }

      return responseData;
    }

    [HttpPost]
    public ResposeData Add(RequestData requestData)
    {
      string userId = requestData.UserId;
      string password = requestData.Password;

      ResposeData responseData = new ResposeData();
      var logic = new UserLogic();
      try {
        logic.AddUser(userId, password);
        responseData.Status = "success";
        responseData.ResultData = userId;
      } catch(Exception e) {
        Console.WriteLine(e.ToString());
        responseData.Status = "error";
        responseData.ResultData = null;
      }

      return responseData;
    }

    [HttpPost]
    public ResposeData Update(RequestData requestData)
    {
      string userId = requestData.UserId;
      string password = requestData.Password;

      ResposeData responseData = new ResposeData();
      var logic = new UserLogic();
      try {
        logic.UpdateUser(userId, password);
        responseData.Status = "success";
        responseData.ResultData = userId;
      } catch(Exception e) {
        Console.WriteLine(e.ToString());
        responseData.Status = "error";
        responseData.ResultData = null;
      }

      return responseData;
    }

    [HttpPost]
    public ResposeData Delete(RequestData requestData)
    {
      string userId = requestData.UserId;

      ResposeData responseData = new ResposeData();
      var logic = new UserLogic();
      try {
        logic.DeleteUser(userId);
        responseData.Status = "success";
        responseData.ResultData = userId;
      } catch(Exception e) {
        Console.WriteLine(e.ToString());
        responseData.Status = "error";
        responseData.ResultData = null;
      }

      return responseData;
    }

  }
}
