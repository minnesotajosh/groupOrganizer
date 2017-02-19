Groups = new Mongo.Collection('groups');

const memberTypes = new SimpleSchema({
    _id: {
        type: String
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    }
});
const locationType = new SimpleSchema({
    address: {
        type: String
    },
    lat: {
        type: String,
        autoform: {
            omit: true
        }
    },
    lng: {
        type: String,
        autoform: {
            omit: true
        }
    }
});

Groups.attachSchema(new SimpleSchema({
    groupName: {
        type: String,
        label: "Group Name",
        max: 200
    },
    members: {
        type: [memberTypes],
        label: "Group Members",
        autoform: {
            omit: true
        }
    },
    leaders: {
        type: [memberTypes],
        label: "Group Leaders",
        autoform: {
            omit: true
        }
    },
    location: {
        type: locationType,
        label: "Location"
    },
    description: {
        type: String,
        label: "Group Description",
        max: 250,
        optional: true
    }
}));
