import PocketBase from 'pocketbase';

const pb = new PocketBase("http://127.0.0.1:8090");

export async function getOffres() {
    try {
        let data = await pb.collection('Maison').getFullList({
            sort: '-created',
        });
        data = data.map((datas) => {
            datas.img = pb.files.getURL(datas, datas.images);
            return datas;
        });
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la liste des maisons', error);
        return [];
    }
}

export async function getOffreID(id) {
    try {
        let dataID = await pb.collection('Maison').getOne(id);
        dataID.img = pb.files.getURL(dataID, dataID.images);
        return dataID;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la maison', error);
        return null;
    }
}

export async function getOffreBySurface(surface) {
    try {
        let dataSurface = await pb.collection('Maison').getFullList({
            filter: `surface > ${surface}`,
        });
        dataSurface = dataSurface.map((dataBySurface) => {
            dataBySurface.img = pb.files.getURL(dataBySurface, dataBySurface.images);
            return dataBySurface;
        });
        return dataSurface;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la liste des maisons', error);
        return [];
    }
}
