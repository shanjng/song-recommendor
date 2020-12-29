export const generateRandomString = (length) => {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

// returns hash parameters as json
export const getHashParams = (url) => {
  return url
    .slice(1)
    .split('&')
    .reduce((prev, curr) => {
      const [title, value] = curr.split('=');
      prev[title] = value;
      return prev;
    }, {});

  /*
  looks something like this: 
    {
    access_token: "BQA0pkL-LfNot7lb6d4evN4mYDgnlobcrLwS3LZNoZ8CwuiHlpjwLFEJnqclbCxs1AIDwx8T3I4oYhWlxhbajYGQdlYqouKjj7iugN3tpCx90doJTsMfpq4roSffnZ6j9Y0DEgiD96SSjTJ5YtlzD20yH7n8fHtciJfK",
    expires_in: "3600",
    state: "WzaO7990tckXSs9z",
    token_type: "Bearer"
    }
  */
};

export const isValidSession = () => {
  const currentTime = new Date().getTime(); // in seconds
  try {
    var expiryTime = JSON.parse(localStorage.getItem('expiry_time'));;
  }
  catch (e) {
    console.log('couldnt get localstorage');
    return false;
  }
  const isSessionValid = currentTime < expiryTime;

  // console.log("Left time: ", expiryTime - currentTime, "ms");

  return isSessionValid;
}

export const rgbToHex = (r, g, b) => {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

const componentToHex = c => {
  var hex = c.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}

