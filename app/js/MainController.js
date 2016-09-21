var app = angular.module('flames', ['ngMessages']);
app.controller('myController', function($scope) {
    $scope.numberOfYears = document.getElementById("myRange").value = "5";
    $scope.determineRelationship = function()
    {
        //F L A M E S
        var flamesArray = ['f','l','a','m','e','s'];

        //clean up old highlights
        flamesArray.forEach(function(flame) {
            document.getElementById(flame).className = "";
        }, this);
        document.getElementById("f").innerHTML = "F - Friends";
        document.getElementById("l").innerHTML = "L - Lovers";
        document.getElementById("a").innerHTML = "A - Attraction";
        document.getElementById("m").innerHTML = "M - Marriage";
        document.getElementById("e").innerHTML = "E - Enemies";
        document.getElementById("s").innerHTML = "S - Siblings";

        var yourName = $scope.yourName;
        var friendName = $scope.friendName;
        var friendNameBackup = friendName;
        var numberOfYearsKnownEachOther = $scope.numberOfYears;

        // if one of the text boxes or both textboxes are empty 
        if(yourName && yourName !== "" && friendName && friendName !== "") {
            //Contains the characters that are different in both names
            var distinctCharacters = [];

            //Find different characters out of two strings 
            for(var i = 0; i < yourName.length; i++)
            {
                var foundMatch = false;
                for(var j = 0; j < friendName.length; j++)
                {
                    if(yourName[i] === friendName[j])
                    {
                        friendName = friendName.removeAt(j);
                        foundMatch = true;
                        break;
                    }
                }
                if(!foundMatch)
                {
                    distinctCharacters.push(yourName[i]);
                }
            }
            distinctCharacters = distinctCharacters.concat(friendName.split(''));

            //Count the number of distinct characters
            var remainingCharsCount = distinctCharacters.length;

            //Determine starting position based on the number of years
            var rearrangementPosition = numberOfYearsKnownEachOther % flamesArray.length;
            if(rearrangementPosition === -1) {
                rearrangementPosition = flamesArray.length-1;
            }
            flamesArray = flamesArray.reArrange(rearrangementPosition);

            //Determine actual relation
            for(var i = flamesArray.length; i > 1; i--)
            {
                var eliminationPosition = remainingCharsCount % flamesArray.length - 1;
                if(eliminationPosition === -1) {
                    eliminationPosition = flamesArray.length-1;
                }
                var eliminationLetter = flamesArray[eliminationPosition];
                flamesArray = flamesArray.reArrangeAndRemove(eliminationPosition);
            }

            var relationCharacter = flamesArray[0];
            var relationElement = document.getElementById(relationCharacter);
            relationElement.className = "highlighted";

            switch(relationCharacter)
            {
                case 'f':
                    relationElement.innerHTML = "The relationship between you and "+friendNameBackup+ " is <b>friendship</b>.<br>" + "\"True friendship is never serene.\"";
                    break;

                case 'l':
                    relationElement.innerHTML = "You and "+friendNameBackup+ " and are <b>lovers</b>.<br>" +"\"A heart in love with beauty never grows old.\""  
                    break;

                    case 'a':
                    relationElement.innerHTML = friendNameBackup+ " is <b>attracted</b> to you.<br>"+ "\"What you seek is seeking you.\"";
                    break;

                    case 'm':
                    relationElement.innerHTML = "The relationship between you and "+friendNameBackup+ " is <b>marriage</b>.<br>" +"\"Happiness is only real when shared.\"";
                    break;

                    case 'e':
                    relationElement.innerHTML = "You and "+friendNameBackup+ " are <b>enemies</b>.<br>" +"\"Who wishes to fight must first count the cost.\"";
                    break;

                    case 's':
                    relationElement.innerHTML = "You and "+friendNameBackup+ " are <b>siblings</b>.<br>" +"\"A sibling is your only enemy you cannot live without.\""; 
                    break;
                    
                default:
                    relationElement.innerHTML = "Unknown";
                    break;
            }
                
            //clean up highlight
            setTimeout(function() {
                    document.getElementById(relationCharacter).className = "";
            }, 6000); 
        }
    }
    $scope.determineRelationship();

    //Helper functions
    //Remove letter from given position in string
    String.prototype.removeAt = function(index)
    {
        return this.substr(0, index) + this.substr(index + 1);
    }

    //Remove element and rearrange the array such that it starts with the first position after the removed element
    Array.prototype.reArrangeAndRemove = function(index)
    {
        return this.slice(index + 1).concat(this.slice(0, index));
    }

    //Rearrange the array such that it starts with the element at the given position
    Array.prototype.reArrange = function(index)
    {
        return this.slice(index).concat(this.slice(0, index));
    }
});