import axios from "axios";
const Cookie = require("js-cookie");

export function issueToken(onSuccess: any, onError: any) {
    axios.post(`http://127.0.0.1:3013/api/auth/jwtToken`, {}, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': Cookie.get('token') ?? undefined,
        }
    })
    .then((res: any) => {
        onSuccess(res);
    })
    .catch((err: any) => {
        onError(err);
    })
}