var baseUrl = "https://wind-bow.gomix.me/twitch-api/";
var channels = [
  "ESL_SC2",
  "OgamingSC2",
  "cretetion",
  "freecodecamp",
  "storbeck",
  "habathcx",
  "RobotCaleb",
  "noobs2ninjas",
  "asdjkfladslfkasdlfkj"
];
var defaultLogo = "https://dummyimage.com/300x300/000/fff&text=00";

function getData() {
  channels.forEach(function(channel) {
    $.getJSON(txtUrl("streams", channel), function(json) {
      console.log(json);

      var status;
      var current = "";

      if (json.stream == null) {
        status = "offline";
        current = "offline";
      } else {
        status = "online";
        current = json.stream.game;
      }

      $.getJSON(txtUrl("channels", channel), function(json2) {
        if (json2.status == 404) {
          current = "Channel does not exist";
        }
        console.log(json2);
        var logo = json2.logo;
        if (logo == null || logo == "") {
          logo = defaultLogo;
        }
        if (status == "online") {
          var description = json2.status;
        } else {
          var description = "";
        }
        var html =
          "<div class='row eleme " +
          status +
          "'><div class='col-xs-4 col-sm-1'><img class='icon' src='" +
          logo +
          "'></div><div class='names col-xs-8 col-sm-3'><a target='_blank' href='" +
          json2.url +
          "'>" +
          channel +
          "</a></div><div class='col-xs-8 col-sm-8'>" +
          current +
          ": " +
          description +
          "</div></div>";
        if (status == "online") {
          $(".display").prepend(html);
        } else {
          $(".display").append(html);
        }
      });
    });
  });
}

function txtUrl(prop, chnl) {
  return baseUrl + prop + "/" + chnl + "?callback=?";
}

$(document).ready(function() {
  getData();
  //$('.ho').append('sadfadf');
});
