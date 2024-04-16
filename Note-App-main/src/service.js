export async function request (url, methode = null, data = null) {
    try {
        let response = await fetch(url, methode, data).then(res => {return res.json()}) 
        return response
    } catch (error) {
        console.log(error)
    }
}

