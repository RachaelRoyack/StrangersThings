const baseURL = 'https://strangers-things.herokuapp.com/api/2206-FTB-ET-WEB-PT'

export const getPosts = async (token) => {
    try {
        const response = await fetch(`${baseURL}/posts`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
            }})
        const results = await response.json()

        return results


    } catch (error) {
        console.log ('error getting all posts')
    }
    

}

export const registerUser = async (username,password) => {
    try {
        const response = await fetch (`${baseURL}/users/register`, {
            method: "POST",
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            user: {
                username: username,
                password: password
            }
            })
        }) 
        const result = await response.json();

        return result

    } catch (error) {
        console.log("error registering user")
    }
}

export const loginUser = async (username,password) => {
    try {
        const response = await fetch (`${baseURL}/users/login`, {
            method: "POST",
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            user: {
                username: username,
                password: password
            }
            })
        }) 
        const result = await response.json();

        return result

    } catch (error) {
        console.log("error user is not registered")
    }
}

export const getUserProfile = async (token) => {
    try {
        const response = await fetch(`${baseURL}/users/me`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
        }) 
        const result = await response.json();

        return result

    } catch (error) {
        console.log("error, could not get user profile")
    }
}

export const createPost = async (token, title, description, price, location, deliverOption) => {
    try {
        const response = await fetch(`${baseURL}/posts`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              post: {
                title,
                description,
                price: `$${price}`,
                location,
                willDeliver: deliverOption,
              }
            })
        })
        const result = await response.json();

        return result

    } catch (error) {
        console.log('error, unable to create new post')
    }
}

export const deletePost = async (postID, token) => {
    try {
        const response = await fetch(`${baseURL}/posts/${postID}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token} `
        }
        })
        const result = await response.json();

        return result

    } catch (error) {
        console.log('error deleting post')
    }
}

export const sendMessage = async (postID, messageString, token) => {
    try {
        const response = await fetch(`${baseURL}/posts/${postID}/messages`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token} `
            },
            body: JSON.stringify({
              message: {
                content: messageString
              }
            })
        })
            const result = await response.json();

            return result

    } catch (error) {
        console.log('error, unable to send message')
    }
}

export const updatePost = async (token, title, description, price, location, deliverOption, _id) => {
    try {
        const response = await fetch(`${baseURL}/posts/${_id}`, {
            method: "PATCH",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              post: {
                title,
                description,
                price: `$${price}`,
                location,
                willDeliver: deliverOption,
              }
            })
        })
        const result = await response.json();

        return result

    } catch (error) {
        console.log('error, unable to update post')
    }
}