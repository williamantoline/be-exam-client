const logo  = require("../../../../assets/logo.png");

interface Props {}

export default function Login(props: Props) {
    return (
        <>
            <main className="form-signin w-100 m-auto">
                <form>
                    <img className="mb-4" src={logo} alt="" width="72" height="57" />
                    <h1 className="h3 mb-4 fw-normal">Please sign in</h1>

                    <div className="form-floating form-floating-up">
                        <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                        <label htmlFor="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                    <div className="form-floating form-floating-down">
                        <select id="floatingType" className="form-select form-select-sm" aria-label=".form-select-sm example">
                            <option selected value="0">User</option>
                            <option value="1">Admin</option>
                        </select>
                        <label htmlFor="floatingType">Type</label>
                    </div>

                    <div className="checkbox mt-3 mb-5">
                    <label>
                        <input id="rememberMe" type="checkbox" /> Remember me
                    </label>
                    </div>
                    <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
                    <p className="mt-5 mb-3 text-muted">&copy; Perpustakaan 2023</p>
                </form>
            </main>
        </>
    )
}