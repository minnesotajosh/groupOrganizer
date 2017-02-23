Template.insertGroup.events({
    'submit form': function(event) {
        event.preventDefault();

        var formArray = $(event.target).serializeArray();
        var streetAddress;
        var group = {};

        group.members = [{
            _id: Meteor.userId(),
            firstName: Meteor.user().profile.firstName,
            lastName: Meteor.user().profile.lastName
        }];

        group.leaders = [{
            _id: Meteor.userId(),
            firstName: Meteor.user().profile.firstName,
            lastName: Meteor.user().profile.lastName
        }];

        for (var i = 0; i < formArray.length; i++) {
            if (formArray[i].name !== "location.address") {
                group[formArray[i].name] = formArray[i].value;
            } else {
                streetAddress = formArray[i].value;
            }
        }

        getMapLocation(streetAddress);

        function getMapLocation(streetAddress) {
            var geocoder = new google.maps.Geocoder();
            var lat, lng;

            geocoder.geocode({
                'address': streetAddress
            }, function(results, status) {
                if (status === 'OK') {
                    lat = results[0].geometry.location.lat();
                    lng = results[0].geometry.location.lng();

                    group.location = {
                        address: streetAddress,
                        lat: lat,
                        lng: lng
                    };

console.log(group);
                    var groupId = Groups.insert(group);
                    Router.go('/group/' + groupId);
                } else {
                    alert('Geocode was not successful for the following reason: ' + status);
                }
            });

        }

    },
    'reset form': function(event) {
        Router.go('/');
    }
});
