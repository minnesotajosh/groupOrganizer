Template.groupPage.events({
    'submit form': function(e) {
        event.preventDefault();

        var formArray = $(event.target).serializeArray();
        var group = {};
        for (var i=0; i<formArray.length; i++) {
            if (formArray[i].name !== "location.address") {
                group[formArray[i].name] = formArray[i].value;
            } else {
                group.location = getMapLocation(formArray[i].value);
            }
        }

        function getMapLocation(streetAddress) {
            return {
                address: streetAddress,
                lat: '123',
                lng: '456'
            }
        }
        Groups.update({ _id: this._id }, { $set: group });
    },
    'click [name=deleteGroup]': function() {
        Groups.remove({ _id: this._id });
        Router.go('groupsList');
    },
    'click [name=leaveGroup]': function() {
        this.members = _.reject(this.members, function(member) {
            return Meteor.userId() === member._id;
        });
        Groups.update({ _id: this._id }, { $set: { members: this.members }});
    },
    'click [name=joinGroup]': function() {
        this.members.push({
            _id: Meteor.userId(),
            firstName: Meteor.user().profile.firstName,
            lastName: Meteor.user().profile.lastName
        });
        Groups.update({ _id: this._id }, { $set: { members: this.members }});

        var leaderIds = this.leaders.map(leader => {
            return { _id: leader._id };
        });
        Notifications.insert({
            assignedTo: leaderIds,
            message: `<a href='/group/${this._id}'>Someone joined your group!</a>`
        });
    }
});

Template.groupPage.helpers({
    'isLeader': function() {
        if (!this.leaders) return;
        var leaderIds = [];
        this.leaders.forEach(leader => {
            leaderIds.push(leader._id);
        });
        return (leaderIds.indexOf(Meteor.userId()) > -1);
    },
    'canJoin': function() {
        var isInGroup = _.find(this.members, function(member) {
            return Meteor.userId() === member._id;
        });
        return Meteor.userId() && !isInGroup;
    },
    'canLeave': function() {
        var isInGroup = _.find(this.members, function(member) {
            return Meteor.userId() === member._id;
        });
        return Meteor.userId() && isInGroup;
    },
    'nonLeaderMembers': function() {
        var leaderIds = [];
        this.leaders.forEach(leader => {
            leaderIds.push(leader._id);
        });
        return _.filter(this.members, function(member) {
            return leaderIds.indexOf(member._id) === -1
        });
    }
});
