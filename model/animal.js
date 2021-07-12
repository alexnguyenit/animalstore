/**
 * Created by hoangnn on July, 12, 2021.
 */
let ListData = [
    { id: 1, name: 'Animal01', status: 'available' },
    { id: 2, name: 'Animal02', status: 'available' },
    { id: 3, name: 'Animal03', status: 'available' },
    { id: 4, name: 'Animal04', status: 'available' },
    { id: 5, name: 'Animal05', status: 'available' },
    { id: 6, name: 'Animal06', status: 'available' },
    { id: 7, name: 'Animal07', status: 'available' },
    { id: 8, name: 'Animal08', status: 'available' },
    { id: 9, name: 'Animal09', status: 'available' }
];

module.exports.find = (callback) => {
    callback(null, ListData);
};
module.exports.findById = (id, callback) => {
    callback(null, ListData.find(item => item.id == id)); // typeof id === "string"
};
module.exports.save = (pet, callback) => {
    let { name, status } = pet;
    if (!name || !status) {
        callback({ message: "Animal is invalid!" });
        return;
    }
    pet = {
        id: Date.now(),
        name,
        status
    };
    ListData.push(pet);
    callback(null, pet);
};
module.exports.delete = (id, callback) => {
    let roweffected = ListData.length;
    ListData = ListData.filter(item => item.id != id);
    roweffected = roweffected - ListData.length;
    callback(null, { roweffected })
};
module.exports.update = (id, pet, callback) => {
    let oldPet = ListData.find(item => item.id == id);
    if (!oldPet) {
        callback("Animal not found!");
        return;
    }
    let index = ListData.indexOf(oldPet);
    Object.assign(oldPet, pet);
    ListData.fill(oldPet, index, ++index);
    callback(null, oldPet);
};