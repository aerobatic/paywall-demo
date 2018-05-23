(function() {
  // If there is a logged in user show their name linking to the my account page
  // If the user is anonymous, show a sign up link
  // Parse the user object from the document.cookie
  var user;
  var userMatch = document.cookie.match(/[; ]?user=([^\s;]*)/);
  if (userMatch && userMatch.length > 1) {
    user = JSON.parse(unescape(userMatch[1]));
  }

  var templateArgs = {};

  user = {
    name: "David",
    authorization: {
      roles: ["basic-plan"]
    }
  };

  if (user) {
    templateArgs.loggedIn = true;
    templateArgs.username = user.name;

    // Logged in user is a subscriber if they have roles. Each role corresponds to
    // a subscription plan name.
    templateArgs.isSubscriber =
      user.authorization && user.authorization.roles.length;
  } else {
    templateArgs.username = null;
    templateArgs.anonymous = true;
  }

  var template = document.getElementById("menu_template").innerHTML;
  Mustache.parse(template, ["<%", "%>"]);
  var rendered = Mustache.render(template, templateArgs);

  document.getElementById("menu").innerHTML = rendered;
})();
