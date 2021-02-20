const db = require('_helpers/db');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    const media = await db.Media.findAll({ include: db.Profile });
    return media.map(x => basicDetails(x));
}

async function getById(id) {
    const media = await getMedia(id);
    return basicDetails(media);
}

async function create(params) {

    const media = new db.Media(params);

    // save user
    await media.save();

    return basicDetails(media);
}

async function update(id, params) {
    const media = await getMedia(id);

    // copy params to user and save
    Object.assign(media, params);

    console.log(media) // eslint-disable-line no-console

    // media.updated = Date.now();
    await media.save();

    return basicDetails(media);
}

async function _delete(id) {
    const media = await getMedia(id);
    await media.destroy();
}

// helper functions

async function getMedia(id) {
    const media = await db.Media.findByPk(id, { include: db.User });
    if (!media) throw 'Media not found';
    return media;
}

function basicDetails(media) {
    const { id, description, userId, value, type } = media;
    const { firstName, lastName, } = media.user;
    const user = {
      id: userId,
      firstName,
      lastName
    }
    return { id, description, userId, value, type, user };
}
