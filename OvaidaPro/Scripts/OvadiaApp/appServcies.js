OvadiaApp.service('appServices', ['$http', function ($http) {

    /* Event Services -------------------> */
    var url = '';

    this.getAllEvents = function () {
        return $http({
            url: url + '/event/GetAllEvents',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
    }

    this.GetActiveEvents = function () {
        return $http({
            url: url + '/event/GetActiveEvents',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
    }

    this.getAllFixedEvents = function () {
        return $http({
            url: url + '/event/GetAllFixedEvents',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
    }

    this.GetActiveFixedEvents = function () {
        return $http({
            url: url + '/event/GetActiveFixedEvents',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
    }

    this.GetWeekEvents = function () {
        return $http({
            url: url + '/event/GetWeekEvents',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
    }

    this.updateEvent = function (eventObj) {

        var data = {
            ID: eventObj.ID,
            Full_Date: eventObj.Full_Date,
            Event_Name: eventObj.Event_Name,
            From_Hour: eventObj.From_Hour,
            From_Minutes: eventObj.From_Minutes,
            To_Hour: eventObj.To_Hour,
            To_Minutes: eventObj.To_Minutes,
            Status: eventObj.Status,
            Date: eventObj.Date,
            Comment: eventObj.Comment
        }
        return $http({
            url: url + '/event/UpdateEvent',
            data: JSON.stringify(data) ,
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
    }

    this.addEvent = function (eventObj) {
        
        return $http({
            url: url + '/event/AddEvent',
            data: JSON.stringify(eventObj),
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }); 
    }

    this.removeEvent = function (idS) {
        var event = {
            eventId: idS
        }
        return $http({
            url: url + '/event/RemoveEvent',
            data: event,
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
    }

    /* Message Services -------------------> */

    this.getAllMembers = function () {
        return $http({
            url: url + '/Message/GetAllMembers',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
    }

    this.AddEmail = function (msgObj) {
        return $http({
            url: url + '/Message/AddEmail',
            data: JSON.stringify(msgObj),
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
    }

    this.removeEmail = function (idS) {
        var msg = {
            msgId: idS
        }
        return $http({
            url: url + '/message/RemoveEmail',
            data: msg,
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
    }

    this.sendEmail = function (msg) {
        return $http({
            url: url + '/Message/SendMail',
            data: JSON.stringify(msg),
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
    }

    /* TFILOT Services -------------------> */

    this.getAllTfilot = function () {
        return $http({
            url: url + '/tfila/GetAllTfilot',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
    }

    this.AddTfila = function (tfila) {
        return $http({
            url: url + '/tfila/AddTfila',
            data: JSON.stringify(tfila),
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
    }

    this.UpdateTfila = function (tfila) {
        return $http({
            url: url + '/tfila/UpdateTfila',
            data: JSON.stringify(tfila),
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
    }

    this.RemoveTfila = function (id) {
        var id = {
            ID: id
        }
        return $http({
            url: url + '/tfila/RemoveTfila',
            data: JSON.stringify(id),
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
    }

    /* USER Services -------------------> */
    this.Login = function (username, pass) {
        var param = {
            password: pass,
            UserName: username
        }
        return $http({
            url: url + '/UsersDetails/Login',
            data: JSON.stringify(param),
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
    }

    this.IsLogin = function () {
        return $http({
            url: url + '/UsersDetails/IsLogin',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
    }

    this.Logout = function () {
        return $http({
            url: url + '/UsersDetails/Logout',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
    }

     /* Category Services -------------------> */

    this.GetAllActiveCategories = function () {
        return $http({
            url: url + '/CategorySer/GetAllActiveCategories',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
            return response.data;
        });
    }

    this.GetAllCategories = function () {
        return $http({
            url: url + '/CategorySer/GetAllCategories',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
            return response.data;
        });
    }
     /* Article Services -------------------> */
    this.AddArticle = function (article) {
        return $http({
            url: url + '/ArticleSer/AddArticle',
            method: 'POST',
            data: JSON.stringify(article),
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
            return response.data;
        });
    }

    this.GetNewActiveArticles = function () {
        return $http({
            url: url + '/ArticleSer/GetNewActiveArticles',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
            return response.data;
        });
    }
    
    this.GetArticle = function (id) {
        var param = {
            articleId: id
        }
        return $http({
            url: url + '/ArticleSer/GetArticleById',
            method: 'POST',
            data: param,
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
            return response.data;
        });
    }

    this.GetArticlesByCategoryId = function (id) {
        var param = {
            categoryId: id
        }
        return $http({
            url: url + '/ArticleSer/GetArticlesByCategoryId',
            method: 'POST',
            data: param,
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
            return response.data;
        });
    }

    this.GetCategoriesByName = function (name) {
        return $http({
            url: url + '/ArticleSer/GetAllArticles?name=' + name,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
            return response.data.Data;
        });
    }

    this.GetAllArticles = function () {
        return $http({
            url: url + '/ArticleSer/GetAllArticles',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
            return response.data;
        });
    }
}]);