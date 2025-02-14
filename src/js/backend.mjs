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
        console.log('Une erreur est survenue en lisant la liste des surfaces', error);
        return [];
    }
}

export async function getOffreByPrice(prix) {
    try{
        let dataPrice = await pb.collection('Maison').getFullList({
            filter: `prix < ${prix}`,
            sort: 'prix',
        });
        dataPrice = dataPrice.map((dataByPrice) => {
            dataByPrice.img = pb.files.getURL(dataByPrice, dataByPrice.images);
            return dataByPrice;
        });	
        return dataPrice;
    } catch(error){
        console.log('Une erreur est survenue en lisant la liste des prix', error);
        return [];
    }
}

export async function getOffreByPriceRange(minPrix, maxPrix) {
    try {
        let dataPriceRange = await pb.collection('Maison').getFullList({
            filter: `prix > ${minPrix} && prix < ${maxPrix}`,
            sort: 'prix',
        });
        dataPriceRange = dataPriceRange.map((dataByPriceRange) => {
            dataByPriceRange.img = pb.files.getURL(dataByPriceRange, dataByPriceRange.images);
            return dataByPriceRange;
        });
        return dataPriceRange;
    }
catch (error) {
    console.log('Une erreur est survenue en lisant la liste des prix', error);
    return [];
}
}

export async function addOffre(offre) {
    try {
        let createOffre = await pb.collection('Maison').create(offre);
        return {
            success : true,
            message : 'Offre ajoutée avec succès',
        };
        }
    catch (error) {
        console.log('Une erreur est survenue en ajoutant la maison', error);
        return {
            success :false,
            message : 'Une erreur est survenue en ajoutant la maison',
        }
    }
}