import fetch from "node-fetch";

const fetchEnvs = async() => {
	let apiEndPt = "https://api.vercel.com/v1/env/pull/prj_9Poa9Db5T12K1MjEPlFYWHq8e6wF?target=development&source=vercel-cli:pull&teamId=team_AecZQIv18pidHdUcIlNuvd8g";
	
	let result = await fetch(apiEndPt, {
		method: 'GET',
		headers: {
			Authorization: 'Bearer dQvXk18VqKFRwTLgweM38QY6'
		}
	})
	return await result.json();
	
}

const updateEnvs = async() => {
	let data = await fetchEnvs();
	let envContent = '';
	for(const key in data.env){
		envContent += `${key}="${data.env[key]}"\n`
	}
	console.log(envContent)
}

updateEnvs()
