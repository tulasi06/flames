var app = angular.module('flames', []);
app.controller('myController', function($scope) {

    $scope.determineRelationship = function()
    {
        var yourName = $scope.yourName;
        var friendName = $scope.friendName;
        var numberOfYearsKnownEachOther = $scope.numberOfYears;

        // if one of the text boxes or both textboxes are empty 
        if(!yourName || yourName === "" || !friendName || friendName === "")
        {
            alert("Please enter a name");
        }
        else
        {
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

            //F L A M E S
            var flamesArray = ['f','l','a','m','e','s'];

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
                flamesArray = flamesArray.reArrangeAndRemove(eliminationPosition);
            }

            var relationCharacter = flamesArray[0];

            switch(relationCharacter)
            {
                case 'f':
                    $scope.relation = "Friends";
                    break;

                case 'l':
                    $scope.relation = "Lovers";
                    break;

                 case 'a':
                    $scope.relation = "Attraction";
                    break;

                 case 'm':
                    $scope.relation = "Marriage";
                    break;

                 case 'e':
                    $scope.relation = "Enemies";
                    break;

                 case 's':
                    $scope.relation = "Siblings";
                    break;
                    
                default:
                    $scope.relation = "Unknown";
                    break;
            }
        }    
    }
    $scope.determineRelationship();

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