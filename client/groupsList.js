Meteor.subscribe('groups');
Meteor.subscribe('notifications');

Template.groupsList.helpers({
    'groups': function() {
        return Groups.find({});
    },
    exampleMapOptions: function() {
        // Make sure the maps API has loaded
        if (GoogleMaps.loaded()) {
            // Map initialization options
            return {
                center: new google.maps.LatLng(44.7893446, -93.60183889999996),
                zoom: 12
            };
        }
    }
});

Template.groupsList.onCreated(function() {

    GoogleMaps.ready('exampleMap', function(map) {

        var groups = Groups.find().fetch();
        var marker;
        for (let group of groups) {
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(group.location.lat, group.location.lng),
                map: map.instance,
                groupId: group._id
            });

            google.maps.event.addListener(marker, 'click', function () {
               Router.go('/group/' + this.groupId);
            });
        }

    });
});

Template.groupsList.onRendered(function() {
    GoogleMaps.load({
        v: '3',
        key: 'AIzaSyDXkwg3LvhKmkfpoZbuy2tFEbf-l2gFPio'
    });
});
