/**
 * Created by Esha Mayuri on 6/24/2017.
 */

var myapp = angular.module("home", [])
    .controller('homepage', ['$scope', function ($scope) {
        $scope.followersList = new Array();
        $scope.repoList = new Array();

        $scope.search = function () {
            var username = document.getElementById("username").value;
            if(username != null || username!="")
            {
                var Url = "https://api.github.com/users/"+username;
                $.getJSON(Url,function (json) {
                    var data = json;
                    $.each(data, function (index) {
                        $scope.profilename = data["login"].toString();
                        $scope.id = data["id"].toString();
                        $scope.profilepic = data["avatar_url"].toString();
                        $scope.htmlurl = data["html_url"].toString();
                        $scope.creationDate = data["created_at"].toString().substring(0,10);
                        $scope.following = data["following"].toString();
                        $scope.followers = data["followers"].toString();
                        $scope.publicRepo = data["public_repos"].toString();
                    })
                })
                if($scope.id!= null || $scope.id!="" )
                {
                    document.getElementById('details').style.display = 'block';
                }
                else
                {
                    document.getElementById('details').style.display = 'none';
                    document.getElementById('message').style.display ='block';
                }
            }
            else
            {
                alert("Please enter a user name to search!")
            }
        }
        $scope.followers_func = function () {
            var username = document.getElementById("username").value;
            document.getElementById('div_repos').style.display = 'none';
            var Url = "https://api.github.com/users/" +username+"/followers";
            $.getJSON(Url,function (json) {
                var data = json;
                    for(var i = 0; i<5; i++) {
                        alert(data[i].login.toString());
                        $scope.followersList[i] = {
                            "followerPic": data[i].avatar_url.toString(),
                            "followerName": data[i].login.toString(),
                            "followerUrl": data[i].avatar_url.toString()
                        };
                        document.getElementById('div_followers').style.display ='block';

                        // $scope.follower_pic[i] = result["avatar_url"].toString();
                        // $scope.follower_name[i] = result["login"].toString();
                        // alert(result["login"].toString())
                    }
            })
        }

        $scope.repo_func = function () {
            var username = document.getElementById("username").value;
            document.getElementById('div_followers').style.display = 'none';
            var Url = "https://api.github.com/users/" +username +"/repos";
            $.getJSON(Url,function (json) {
                var data = json;
                for(var i = 0; i<5; i++) {
                    alert(data[i].name.toString());
                    $scope.repoList[i] = {
                        "repoName": data[i].name.toString(),
                        "repoUrl": data[i].html_url.toString()
                    };
                    document.getElementById('div_repos').style.display ='block';

                    // $scope.follower_pic[i] = result["avatar_url"].toString();
                    // $scope.follower_name[i] = result["login"].toString();
                    // alert(result["login"].toString())
                }
            })
        }
        $scope.git = function () {

            var link = document.getElementById("link").value;
            alert($scope.htmlurl);
            window.open($scope.htmlurl, '_blank');
        }
}])

