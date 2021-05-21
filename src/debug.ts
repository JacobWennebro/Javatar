import CreateAvatar from './main'

(async () => {

    const a = await CreateAvatar();
    console.log(await a.getBase64Async("image/png"));
    
})()