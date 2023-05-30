import fetch from "node-fetch";
import { outputFile } from 'fs-extra'

const fetchEnvs = async () => {
	let apiEndPt = "https://tools.holdex.io/api/env/pull?project=holdex-venture-studio&target=development&source=vercel-cli:pull&teamId=team_AecZQIv18pidHdUcIlNuvd8g";

	let result = await fetch(apiEndPt, {
		method: 'GET',
		headers: {
			'x-holdex-authorization': 'Bearer XtKojAp1'
		}
	})

	return await result.json();

}

const updateEnvs = async () => {
	let data = await fetchEnvs();
	let envVaraibles = data.data.env
	let envContent = '';
	for (const key in envVaraibles) {
		envContent += `${key}='${envVaraibles[key]}'\n`
	}
	const filename = '.env'
	
	try {
		await outputFile(filename, envContent, 'utf8');
		console.log(`${filename} file updated successfully.`);
	} catch (error) {
		console.error('Error updating .env file:', error);
	}
}

updateEnvs()
