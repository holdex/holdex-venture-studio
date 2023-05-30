import fetch from "node-fetch";

const fetchEnvs = async(event) => {
	let apiEndPt = "https://api.vercel.com/v9/projects/prj_9Poa9Db5T12K1MjEPlFYWHq8e6wF/env?teamId=team_AecZQIv18pidHdUcIlNuvd8g";
	let vercel_token ='dQvXk18VqKFRwTLgweM38QY6';
	let result;
	 await fetch(apiEndPt, {
		method: 'GET',
		headers: {
			Authorization: 'Bearer dQvXk18VqKFRwTLgweM38QY6'
		}

	}).then(async(res) => result = await res.json()).catch(async(err )=> console.log(await err))
		return result;
}

const updateEnvs = async() => {
	let data = await fetchEnvs();
	let envContent = '';

	data.envs.filter((val) => {
		if(val.target.includes('development')){
			envContent += `${val.key}="${val.value}"\n`
		}

	})
	console.log(envContent)
}

updateEnvs()