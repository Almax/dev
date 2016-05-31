import Storage from 'react-native-storage';
session = new Storage({
    size: 1000,    
    defaultExpires: 1000 * 3600 * 24 * 30,
    enableCache: true,
    sync : {
    	
    }
});

export async function isFirstTime() {
	try {
		var result = await session.load({ key: 'splashCounter' });
		return false;
	}catch(err) {
		await session.save({ key: 'splashCounter', rowData: 1 });
		return true;
	}
}