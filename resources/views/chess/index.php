<!DOCTYPE html>
<html lang="en" ng-app="chessApp" ng-cloak="">
<head>
    <meta charset="UTF-8">
    <title>Chess</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="node_modules/angular-ui-bootstrap/dist/ui-bootstrap-csp.css"/>
    <link href='https://fonts.googleapis.com/css?family=Playfair+Display&subset=latin,cyrillic' rel='stylesheet'
          type='text/css'>
    <link rel="stylesheet" href="node_modules/bootstrap/dist/css/bootstrap.min.css"/>
    <link rel="stylesheet" href="css/app.min.css"/>
    <script src="node_modules/angular/angular.js"></script>
</head>
<body>
<div>
    <nav class="navbar navbar-default" ng-show="showMenu">
        <div class="container-fluid">
            <div id="logo-container">
                    <span id="logo">
                        <img src="images/vector_logo_final.png" alt="logo"/>
                    </span>
                <a ng-click="logout()" id="logout">Logout</a>
            </div>
            <div id="notifications" class="pull-right">
                 <span uib-dropdown on-toggle="toggled(open)">
              <a href id="simple-dropdown" uib-dropdown-toggle>
                  Notifications <span class="badge">{{count}}</span>
              </a>
              <ul class="dropdown-menu" id="notifications-menu" uib-dropdown-menu aria-labelledby="simple-dropdown">
                  <!--<li ng-repeat="users in notifications">
                      <span>{{users.name}}</span>
                      <button class="accept" ng-click="accept({{users.name}})" id="{{users.name}}">Accept</button>
                      <button class="decline" ng-click="decline({{users.name}})" id="{{users.name}}">&times;</button>
                  </li>-->

                  <li ng-repeat="not in challenges" class="notifications-list">
                      <span>{{not}}</span>
                      <button>Accept</button>
                  </li>


              </ul>
            </span>

            </div>

            <!--  <div class="btn-group">
                  <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Action <span class="caret"></span>
                  </button>
                  <ul class="dropdown-menu">
                      <li><a href="#">Action</a></li>
                      <li><a href="#">Another action</a></li>
                      <li><a href="#">Something else here</a></li>
                      <li role="separator" class="divider"></li>
                      <li><a href="#">Separated link</a></li>
                  </ul>
              </div>
          </div>-->

    </nav>

    <div ng-view></div>

</div>


<script src="node_modules/angular-resource/angular-resource.min.js"></script>
<script src="node_modules/angular-route/angular-route.min.js"></script>
<script src="node_modules/angular-animate/angular-animate.min.js"></script>
<script src="node_modules/jquery/dist/jquery.min.js"></script>
<script src="node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js"></script>
<script type="text/javascript" src="bower_components/phaser/build/phaser.min.js"></script>
<!--<script src="node_modules/requirejs/require.js"></script>-->
<script src="https://cdn.socket.io/socket.io-1.4.5.js"></script>
<script src="js/GameController.js"></script>
<script src="app.js"></script>
<script src="directives.js"></script>
<!--<script src="views/home/Services/usersService.js"></script>-->
<!--<script src="socketServer/server.js"></script>-->
<script src="views/home/services/identityService.js"></script>
<script src="views/home/Services/authService.js"></script>
<script src="views/home/controllers/HomeController.js"></script>
<script src="views/home/controllers/LoginController.js"></script>
<script src="views/home/controllers/RegistrationController.js"></script>
<script src="views/profile/services/ProfileInfoService.js"></script>
<script src="views/profile/controllers/ProfileInfoController.js"></script>
<script src="js/Cell.js"></script>
<script src="js/Figure.js"></script>
<script src="js/Bishop.js"></script>
<script src="js/King.js"></script>
<script src="js/Queen.js"></script>
<script src="js/Knight.js"></script>
<script src="js/Pawn.js"></script>
<script src="js/Rook.js"></script>
<script src="js/GameController.js"></script>
<script src="socketServer/SocketService.js"></script>
<script src="views/game/controllers/GameViewController.js"></script>

</body>
</html>