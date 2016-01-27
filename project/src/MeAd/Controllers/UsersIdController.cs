// Template: Controller Implementation (ApiControllerImplementation.t4) version 3.0

using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;

namespace MeAd.Raml
{
    public partial class UsersIdController : IUsersIdController
    {

		/// <summary>
		/// View profile of an user - User
		/// </summary>
		/// <param name="id"></param>
        public IActionResult Get(string id)
        {
            // TODO: implement Get - route: users/{id}/
			return new ObjectResult("");
        }

		/// <summary>
		/// The user can edit his profile - User
		/// </summary>
		/// <param name="content"></param>
		/// <param name="id"></param>
        public IActionResult Post([FromBody] string content,string id)
        {
            // TODO: implement Post - route: users/{id}/
			return new ObjectResult("");
        }

    }
}
