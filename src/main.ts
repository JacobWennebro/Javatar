import fs from 'fs';
import Jimp from 'jimp';
import path from 'path';
import { CharacterItem } from './types';

function getRandomItem(type: "skin" | "hair" | "shirts", variant?: number | number[]) {
    let res: any[] = fs.readdirSync(path.join(__dirname, `../assets/${type}`));
    let source;

    if(Array.isArray(variant)) variant = variant[Math.floor(Math.random() * variant.length)];

    if(variant != null && res[0].includes(".png")) {
        console.log("REE");
    }

    /* Determines if asset includes variants */
    if(!res[0].includes(".png")) {
        if(variant == null) variant = Number(res[Math.floor(Math.random() * res.length)]);

        res = fs.readdirSync(path.join(__dirname, `../assets/${type}/${variant}`));
        source = path.join(__dirname, `../assets/${type}/${variant}/${res[Math.floor(Math.random() * res.length)]}`);
            
    } else {
        const item = res[Math.floor(Math.random() * res.length)] as string;
        variant = Number(item.replace(".png", ""));
        source = path.join(__dirname, `../assets/${type}/${item}`);
    }

    return {
        path: source,
        type,
        variant: variant
    } as CharacterItem;
}

/*
    # Skin
    0 = Asian
    1 = White
    2 = Light skin
    3 = Black

    # Hair
    0 = Black
    1 = Blonde
    2 = Brown
    3 = Ginger
    4 = Gray

*/

async function CharacterCompositor(data: { hair: CharacterItem, skin: CharacterItem, shirt: CharacterItem }) {

    const skin = await Jimp.read(data.skin.path);
    const hair = await Jimp.read(data.hair.path);
    const shirt = await Jimp.read(data.shirt.path);

    /* Programatically set the color of the shirt */
    shirt.color([
        { apply: 'hue', params: [(Math.random() * 360) - 360] },
    ]);

    skin.composite(shirt, 0, 0);
    skin.composite(hair, 0, 0);

    return await skin;
}

export default async function GenerateAvatar() {

    const skinData = getRandomItem("skin");
    let hairVariant;

    switch(skinData.variant) {
        case 0:
            hairVariant = [0, 1];
        break;
        case 2: 
            hairVariant = 0;
        break;
        case 3:
            hairVariant = 0;
        break;
    }

    const hairData = getRandomItem("hair", hairVariant);
    const shirtData = getRandomItem("shirts");

    return await CharacterCompositor({
        hair: hairData,
        skin: skinData,
        shirt: shirtData
    });

}
