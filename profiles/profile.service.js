const db = require('_helpers/db');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    const profiles = await db.Profile.findAll({
      include: [db.User, db.Media],
      order: [['createdAt', 'DESC']]
    });
    return profiles.map(x => basicDetails(x));
}

async function getById(id) {
    const profile = await getProfile(id);
    return basicDetails(profile);
}

async function create(params) {

    const profile = new db.Profile(params);

    // save user
    await profile.save();

    return basicDetails(profile);
}

async function update(id, params) {
    const profile = await getProfile(id);

    // copy params to user and save
    Object.assign(profile, params);

    // profile.updated = Date.now();
    await profile.save();

    return basicDetails(profile);
}

async function _delete(id) {
    const profile = await getProfile(id);
    await profile.destroy();
}

// helper functions

async function getProfile(id) {
    const profile = await db.Profile.findByPk(id, { include: [db.User, db.Media] });
    if (!profile) throw 'Profil finns ej';
    return profile;
}

function basicDetails(profile) {
    const { id, description, userId, stageName, avatarURL, coverURL, geoReach, contactDetails, media } = profile;
    const { firstName, lastName, } = profile.user;
    const user = {
      id: userId,
      firstName,
      lastName
    }
    return { id, description, user, userId, stageName, avatarURL, coverURL, geoReach, contactDetails, media };
}
